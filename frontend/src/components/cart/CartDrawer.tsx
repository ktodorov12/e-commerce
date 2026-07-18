'use client';

import { siteContent } from '@/content/site';
import { CartLineItem } from '@/components/cart/CartLineItem';
import { CartSummary } from '@/components/cart/CartSummary';
import { useCartDrawerActions, useCartDrawerOpen, useCartError } from '@/hooks/useCartMachine';
import { Button } from '@/lib/shared/Button';
import { CloseIcon } from '@/lib/shared/icons';
import { Drawer } from '@/lib/shared/Drawer';
import { selectLines, useCartStore } from '@/stores/cartStore';
import { AppRoute } from '@/types/routes';
import { Link } from '@/lib/shared/Link';
import { ButtonSize, ButtonVariant, DrawerSide } from '@/types/ui';

/** The bag: line items → subtotal → Shopify-hosted checkout redirect. */
export const CartDrawer = () => {
  const open = useCartDrawerOpen();
  const { close } = useCartDrawerActions();
  const errorMessage = useCartError();
  const lines = useCartStore(selectLines);

  return (
    <Drawer open={open} onClose={close} side={DrawerSide.Right} label={siteContent.cart.title}>
      <div className="flex items-center justify-between border-b border-divider px-6 py-4">
        <h2 className="text-h4">{siteContent.cart.title}</h2>
        <Button
          variant={ButtonVariant.Ghost}
          size={ButtonSize.Icon}
          aria-label={siteContent.a11y.closeCart}
          onClick={close}
          className="text-ink"
        >
          <CloseIcon size={18} />
        </Button>
      </div>

      {errorMessage !== null ? (
        <p role="alert" className="border-b border-divider px-6 py-3 text-xs text-accent-ink">
          {siteContent.cart.lineError}
        </p>
      ) : null}

      {lines.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6">
          <p className="text-sm text-ink-muted">{siteContent.cart.empty}</p>
          <Link href={AppRoute.Products} onClick={close} className="text-sm text-accent-ink underline underline-offset-4">
            {siteContent.cart.emptyCta}
          </Link>
        </div>
      ) : (
        <>
          <div className="flex-1 divide-y divide-divider overflow-y-auto px-6">
            {lines.map((line) => (
              <CartLineItem key={line.id} line={line} />
            ))}
          </div>
          <CartSummary />
        </>
      )}
    </Drawer>
  );
};
