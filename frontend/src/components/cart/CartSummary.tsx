'use client';

import { siteContent } from '@/content/site';
import { useBeginCheckout, useCartRedirecting } from '@/hooks/useCartMachine';
import { Button } from '@/lib/shared/Button';
import { Price } from '@/lib/shared/Price';
import { selectCheckoutUrl, selectSubtotal, useCartStore } from '@/stores/cartStore';
import { ButtonSize, ButtonVariant } from '@/types/ui';

/**
 * Subtotal + checkout handoff. We never build payment UI: checkout is
 * the Shopify-hosted checkoutUrl, reached through the cart machine so
 * a double-tap can't fire twice.
 */
export const CartSummary = () => {
  const { subtotal, checkoutUrl } = useCartStore((state) => ({
    subtotal: selectSubtotal(state),
    checkoutUrl: selectCheckoutUrl(state),
  }));
  const beginCheckout = useBeginCheckout();
  const redirecting = useCartRedirecting();

  if (subtotal === null || checkoutUrl === null) return null;

  return (
    <div className="border-t border-divider px-6 py-6">
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="text-ink-muted">{siteContent.cart.subtotal}</span>
        <Price price={subtotal} />
      </div>
      <p className="mb-4 text-xs text-ink-muted">{siteContent.cart.shippingNote}</p>
      <Button
        variant={ButtonVariant.Cta}
        size={ButtonSize.Lg}
        disabled={redirecting}
        onClick={() => beginCheckout(checkoutUrl)}
      >
        {redirecting ? siteContent.cart.redirecting : siteContent.cart.checkout}
      </Button>
    </div>
  );
};
