'use client';

import type { ProductVariant } from '@exclusive-wear/shopify';

import { siteContent } from '@/content/site';
import { useAddToCart, useCartMutating } from '@/hooks/useCartMachine';
import { Button } from '@/lib/shared/Button';
import { ButtonSize, ButtonVariant } from '@/types/ui';
import { formatMoney } from '@/utils/money';

/**
 * The sticky commerce moment: "Add to Bag — €80". Click → cart machine
 * AddLines → server action → drawer opens with the committed cart.
 */
export const AddToCartBar = ({ variant }: { readonly variant: ProductVariant | null }) => {
  const addToCart = useAddToCart();
  const mutating = useCartMutating();

  const purchasable = variant !== null && variant.available;

  const label = !purchasable
    ? siteContent.pdp.unavailable
    : mutating
      ? siteContent.pdp.adding
      : `${siteContent.pdp.addToBag} · ${formatMoney(variant.price)}`;

  return (
    <div className="sticky bottom-0 -mx-6 border-t border-divider bg-[color-mix(in_srgb,var(--color-ground)_92%,transparent)] px-6 py-4 backdrop-blur-md md:static md:m-0 md:border-0 md:bg-[transparent] md:p-0 md:backdrop-blur-none">
      <Button
        variant={ButtonVariant.Cta}
        size={ButtonSize.Lg}
        disabled={!purchasable || mutating}
        onClick={() => {
          if (variant !== null) addToCart(variant.id);
        }}
        data-testid="add-to-cart"
      >
        {label}
      </Button>
    </div>
  );
};
