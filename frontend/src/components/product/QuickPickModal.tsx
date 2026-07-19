'use client';

import { useState } from 'react';
import type { ProductListItem } from '@exclusive-wear/shopify';

import { siteContent } from '@/content/site';
import { useAddToCart, useCartMutating } from '@/hooks/useCartMachine';
import {
  useListingOverlayActions,
  useQuickPickOpen,
  useQuickPickProduct,
} from '@/hooks/useListingOverlayMachine';
import { useVariantSelection } from '@/hooks/useVariantSelection';
import { Button } from '@/lib/shared/Button';
import { Drawer } from '@/lib/shared/Drawer';
import { CloseIcon, MinusIcon, PlusIcon } from '@/lib/shared/icons';
import { Price } from '@/lib/shared/Price';
import { ProductImage } from '@/lib/shared/ProductImage';
import { SegmentedControl } from '@/lib/shared/SegmentedControl';
import { ButtonSize, ButtonVariant, DrawerSide } from '@/types/ui';
import { formatMoney, multiplyMoney } from '@/utils/money';

/**
 * Fast-pick bottom sheet from the grid's bag button: colour/size options,
 * quantity, one CTA. On add the sheet hands off to the cart flow (the cart
 * machine opens the bag drawer once the line is committed).
 */

const QUANTITY_MIN = 1;
const QUANTITY_MAX = 9;

export const QuickPickModal = () => {
  const open = useQuickPickOpen();
  const product = useQuickPickProduct();
  const { closeQuickPick } = useListingOverlayActions();

  return (
    <Drawer
      open={open}
      onClose={closeQuickPick}
      side={DrawerSide.Bottom}
      label={siteContent.listing.quickPick.title}
    >
      {product !== null ? (
        // Keyed by product so selection and quantity reset per piece.
        <QuickPickContent key={product.id} product={product} onClose={closeQuickPick} />
      ) : null}
    </Drawer>
  );
};

const QuickPickContent = ({
  product,
  onClose,
}: {
  readonly product: ProductListItem;
  readonly onClose: () => void;
}) => {
  const { selection, selectOption, selectedVariant, isValueAvailable, meaningfulOptions } =
    useVariantSelection(product);
  const [quantity, setQuantity] = useState(QUANTITY_MIN);
  const addToCart = useAddToCart();
  const mutating = useCartMutating();

  const purchasable = selectedVariant !== null && selectedVariant.available;
  const displayPrice = selectedVariant?.price ?? product.price;

  const submit = () => {
    if (selectedVariant === null) return;
    addToCart(selectedVariant.id, quantity);
    // Fast pick: close right away — the bag drawer opens once the add lands.
    onClose();
  };

  const ctaLabel = !purchasable
    ? siteContent.pdp.unavailable
    : `${siteContent.pdp.addToBag} · ${formatMoney(multiplyMoney(displayPrice, quantity))}`;

  return (
    <>
      <div className="flex items-center gap-4 border-b border-divider px-6 py-4">
        <ProductImage
          image={selectedVariant?.image ?? product.image}
          alt={product.title}
          sizes="64px"
          className="w-16 shrink-0 rounded-sm aspect-[3/4]"
          placeholderLabel={product.title}
        />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="truncate text-xs text-ink-muted italic">{product.title}</span>
          <Price
            price={displayPrice}
            compareAtPrice={selectedVariant?.compareAtPrice ?? product.compareAtPrice}
            className="text-sm font-medium text-ink"
          />
        </div>
        <Button
          variant={ButtonVariant.Ghost}
          size={ButtonSize.Icon}
          aria-label={siteContent.a11y.closeQuickAdd}
          onClick={onClose}
          className="self-start text-ink"
        >
          <CloseIcon size={20} />
        </Button>
      </div>

      <div className="flex flex-col gap-6 overflow-y-auto px-6 py-6">
        {meaningfulOptions.map((option) => (
          <div key={option.name} className="flex flex-col gap-2">
            <span className="kicker">
              {option.name}
              {selection[option.name] ? `: ${selection[option.name]}` : ''}
            </span>
            <SegmentedControl
              label={option.name}
              options={option.values.map((value) => ({
                value,
                label: value,
                disabled: !isValueAvailable(option.name, value),
              }))}
              value={selection[option.name] ?? null}
              onChange={(value) => selectOption(option.name, value)}
            />
          </div>
        ))}

        <div className="flex items-center justify-between">
          <span className="kicker">{siteContent.listing.quickPick.quantity}</span>
          <div className="flex items-center concentric-shell-0 border border-divider">
            <Button
              aria-label={siteContent.a11y.decreaseQuantity}
              disabled={quantity <= QUANTITY_MIN}
              onClick={() => setQuantity((current) => current - 1)}
              className="rounded-concentric! border-0 px-3 py-1 text-ink"
            >
              <MinusIcon size={12} />
            </Button>
            <span className="min-w-8 text-center text-sm">{quantity}</span>
            <Button
              aria-label={siteContent.a11y.increaseQuantity}
              disabled={quantity >= QUANTITY_MAX}
              onClick={() => setQuantity((current) => current + 1)}
              className="rounded-concentric! border-0 px-3 py-1 text-ink"
            >
              <PlusIcon size={12} />
            </Button>
          </div>
        </div>

        {selectedVariant !== null && !selectedVariant.available ? (
          <p className="text-xs text-ink-muted">
            {selectedVariant.title}, {siteContent.pdp.soldOut}
          </p>
        ) : null}
      </div>

      <div className="border-t border-divider px-6 py-4">
        <Button
          variant={ButtonVariant.Cta}
          size={ButtonSize.Lg}
          disabled={!purchasable || mutating}
          onClick={submit}
          data-testid="quick-pick-add"
        >
          {ctaLabel}
        </Button>
      </div>
    </>
  );
};
