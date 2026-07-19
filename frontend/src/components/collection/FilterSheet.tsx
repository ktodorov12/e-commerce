'use client';

import { useState, useTransition } from 'react';
import type { ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import type { ProductSort } from '@exclusive-wear/shopify';

import { siteContent } from '@/content/site';
import { useFiltersOpen, useListingOverlayActions } from '@/hooks/useListingOverlayMachine';
import { Button } from '@/lib/shared/Button';
import { Drawer } from '@/lib/shared/Drawer';
import { CloseIcon } from '@/lib/shared/icons';
import { Input } from '@/lib/shared/Input';
import { LoadingOverlay } from '@/lib/shared/LoadingOverlay';
import {
  AvailabilityFilter,
  BrandFilter,
  EMPTY_LISTING_FILTER_SELECTION,
  GenderFilter,
  PRICE_FILTER_MAX,
  TypeFilter,
} from '@/types/catalog';
import type { ListingFilterSelection } from '@/types/catalog';
import { ButtonSize, ButtonVariant, DrawerSide } from '@/types/ui';
import { cx } from '@/utils/cx';
import { buildListingSearchParams } from '@/utils/listingUrl';
import { displayCurrencySymbol } from '@/utils/money';

/**
 * Bottom-sheet filter menu (design 1d, elyx-style): multi-select chips per
 * facet, price as two direct from/to inputs with the currency sign inside,
 * and a Remove all / Apply footer. Edits are a local draft — the URL (and
 * with it the server-fetched listing) changes only on Apply / Remove all.
 */

/** The draft keeps prices as raw digit strings while the shopper types. */
interface FilterDraft {
  readonly types: readonly TypeFilter[];
  readonly genders: readonly GenderFilter[];
  readonly brands: readonly BrandFilter[];
  readonly availability: AvailabilityFilter;
  readonly minPriceInput: string;
  readonly maxPriceInput: string;
}

const toDraft = (selection: ListingFilterSelection): FilterDraft => ({
  types: selection.types,
  genders: selection.genders,
  brands: selection.brands,
  availability: selection.availability,
  minPriceInput: selection.minPrice === null ? '' : String(selection.minPrice),
  maxPriceInput: selection.maxPrice === null ? '' : String(selection.maxPrice),
});

const parseDraftPrice = (input: string): number | null =>
  input === '' ? null : Math.min(Number.parseInt(input, 10), PRICE_FILTER_MAX);

const fromDraft = (draft: FilterDraft): ListingFilterSelection => ({
  types: draft.types,
  genders: draft.genders,
  brands: draft.brands,
  availability: draft.availability,
  minPrice: parseDraftPrice(draft.minPriceInput),
  maxPrice: parseDraftPrice(draft.maxPriceInput),
});

/** Toggle a facet value, keeping canonical (enum declaration) order. */
const toggleFacetValue = <TValue extends string>(
  allowed: readonly TValue[],
  current: readonly TValue[],
  value: TValue,
): readonly TValue[] =>
  current.includes(value)
    ? current.filter((member) => member !== value)
    : allowed.filter((member) => current.includes(member) || member === value);

const NON_DIGITS_PATTERN = /\D/g;
const PRICE_INPUT_MAX_LENGTH = 6;

const FacetChip = ({
  label,
  selected,
  onToggle,
}: {
  readonly label: string;
  readonly selected: boolean;
  readonly onToggle: () => void;
}) => (
  <Button
    aria-pressed={selected}
    onClick={onToggle}
    className={cx(
      'px-4 py-1 text-xs tracking-wide',
      selected ? 'border-accent bg-accent-tint text-accent-ink' : 'text-ink-muted',
    )}
  >
    {label}
  </Button>
);

const FacetGroup = ({
  label,
  children,
}: {
  readonly label: string;
  readonly children: ReactNode;
}) => (
  <fieldset className="flex flex-col gap-3 border-0 p-0">
    <legend className="kicker mb-3 p-0">{label}</legend>
    <div className="flex flex-wrap gap-2">{children}</div>
  </fieldset>
);

export interface FilterSheetProps {
  readonly sort: ProductSort;
  readonly selection: ListingFilterSelection;
}

export const FilterSheet = ({ sort, selection }: FilterSheetProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const open = useFiltersOpen();
  const { closeFilters } = useListingOverlayActions();
  // The refetch can be slow — the transition's pending state drives the
  // loading overlay while the filtered listing streams in.
  const [isNavigationPending, startNavigationTransition] = useTransition();

  const [draft, setDraft] = useState<FilterDraft>(() => toDraft(selection));

  // Re-snapshot the committed selection on each open so abandoned edits never
  // linger (render-time adjustment, not an effect — see react.dev "You might
  // not need an Effect").
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) setDraft(toDraft(selection));
  }

  const draftMinPrice = parseDraftPrice(draft.minPriceInput);
  const draftMaxPrice = parseDraftPrice(draft.maxPriceInput);
  const priceRangeInverted =
    draftMinPrice !== null && draftMaxPrice !== null && draftMinPrice > draftMaxPrice;

  const navigateTo = (nextSelection: ListingFilterSelection) => {
    const query = buildListingSearchParams(nextSelection, sort).toString();
    startNavigationTransition(() => {
      router.replace(query.length > 0 ? `${pathname}?${query}` : pathname, { scroll: false });
    });
  };

  const applyDraft = () => {
    navigateTo(fromDraft(draft));
    closeFilters();
  };

  const removeAll = () => {
    setDraft(toDraft(EMPTY_LISTING_FILTER_SELECTION));
    navigateTo(EMPTY_LISTING_FILTER_SELECTION);
  };

  const setPriceInput = (key: 'minPriceInput' | 'maxPriceInput') => (value: string) => {
    const digits = value.replace(NON_DIGITS_PATTERN, '').slice(0, PRICE_INPUT_MAX_LENGTH);
    setDraft((current) => ({ ...current, [key]: digits }));
  };

  const currencySign = displayCurrencySymbol();
  const inStock = draft.availability === AvailabilityFilter.InStock;

  return (
    <>
      <LoadingOverlay active={isNavigationPending} />
      <Drawer
        open={open}
        onClose={closeFilters}
        side={DrawerSide.Bottom}
        label={siteContent.listing.filters.title}
      >
        <div className="flex items-center justify-between border-b border-divider px-6 py-4">
          <span className="text-h5 text-ink">{siteContent.listing.filters.title}</span>
          <Button
            variant={ButtonVariant.Ghost}
            size={ButtonSize.Icon}
            aria-label={siteContent.a11y.closeFilters}
            onClick={closeFilters}
            className="text-ink"
          >
            <CloseIcon size={20} />
          </Button>
        </div>

        <div className="flex flex-col gap-8 overflow-y-auto px-6 py-6">
          <FacetGroup label={siteContent.listing.filters.typeGroup}>
            {Object.values(TypeFilter).map((type) => (
              <FacetChip
                key={type}
                label={siteContent.listing.filters.typeLabels[type]}
                selected={draft.types.includes(type)}
                onToggle={() =>
                  setDraft((current) => ({
                    ...current,
                    types: toggleFacetValue(Object.values(TypeFilter), current.types, type),
                  }))
                }
              />
            ))}
          </FacetGroup>

          <FacetGroup label={siteContent.listing.filters.genderGroup}>
            {Object.values(GenderFilter).map((gender) => (
              <FacetChip
                key={gender}
                label={siteContent.listing.filters.genderLabels[gender]}
                selected={draft.genders.includes(gender)}
                onToggle={() =>
                  setDraft((current) => ({
                    ...current,
                    genders: toggleFacetValue(Object.values(GenderFilter), current.genders, gender),
                  }))
                }
              />
            ))}
          </FacetGroup>

          <FacetGroup label={siteContent.listing.filters.brandGroup}>
            {Object.values(BrandFilter).map((brand) => (
              <FacetChip
                key={brand}
                label={siteContent.listing.filters.brandLabels[brand]}
                selected={draft.brands.includes(brand)}
                onToggle={() =>
                  setDraft((current) => ({
                    ...current,
                    brands: toggleFacetValue(Object.values(BrandFilter), current.brands, brand),
                  }))
                }
              />
            ))}
          </FacetGroup>

          <FacetGroup label={siteContent.listing.filters.availabilityGroup}>
            <FacetChip
              label={siteContent.listing.availabilityInStock}
              selected={inStock}
              onToggle={() =>
                setDraft((current) => ({
                  ...current,
                  availability: inStock ? AvailabilityFilter.All : AvailabilityFilter.InStock,
                }))
              }
            />
          </FacetGroup>

          <div className="flex flex-col gap-3">
            <span className="kicker">{siteContent.listing.filters.priceGroup}</span>
            <div className="grid grid-cols-2 gap-3">
              <Input
                label={siteContent.listing.filters.priceFrom}
                suffix={currencySign}
                inputMode="numeric"
                autoComplete="off"
                value={draft.minPriceInput}
                onChange={(changeEvent) => setPriceInput('minPriceInput')(changeEvent.target.value)}
              />
              <Input
                label={siteContent.listing.filters.priceTo}
                suffix={currencySign}
                inputMode="numeric"
                autoComplete="off"
                value={draft.maxPriceInput}
                onChange={(changeEvent) => setPriceInput('maxPriceInput')(changeEvent.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 border-t border-divider px-6 py-4">
          <Button onClick={removeAll} className="flex-1 text-ink-muted">
            {siteContent.listing.filters.removeAll}
          </Button>
          <Button
            variant={ButtonVariant.Cta}
            onClick={applyDraft}
            disabled={priceRangeInverted}
            className="flex-1"
            data-testid="apply-filters"
          >
            {siteContent.listing.filters.apply}
          </Button>
        </div>
      </Drawer>
    </>
  );
};
