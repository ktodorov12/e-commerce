'use client';

import { siteContent } from '@/content/site';
import { useCartDrawerActions } from '@/hooks/useCartMachine';
import { Button } from '@/lib/shared/Button';
import { BagIcon } from '@/lib/shared/icons';
import { selectTotalQuantity, useCartStore } from '@/stores/cartStore';
import { ButtonSize, ButtonVariant } from '@/types/ui';

/** Bag button with a live count — subscribes only to the quantity. */
export const CartTrigger = () => {
  const totalQuantity = useCartStore(selectTotalQuantity);
  const { open } = useCartDrawerActions();

  return (
    <Button
      variant={ButtonVariant.Ghost}
      size={ButtonSize.Icon}
      aria-label={siteContent.a11y.openCart}
      onClick={open}
      className="relative text-ink"
    >
      <BagIcon size={20} />
      {totalQuantity > 0 ? (
        <span className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-accent-tint text-2xs text-accent-ink">
          {totalQuantity}
        </span>
      ) : null}
    </Button>
  );
};
