'use client';

import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

import { DrawerSide } from '@/types/ui';
import { cx } from '@/utils/cx';

/**
 * Sliding overlay panel — right sheet (bag) or full-screen wipe (menu).
 * Stays mounted so open/close can animate; when closed the panel is
 * inert, invisible and untabbable. Owns the a11y contract: dialog role,
 * Escape to close, focus hand-off and restore, body scroll lock.
 */
export interface DrawerProps {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly side?: DrawerSide;
  readonly label: string;
  readonly children: ReactNode;
}

const PANEL_CLASSES: Readonly<Record<DrawerSide, { readonly base: string; readonly closed: string }>> = {
  [DrawerSide.Right]: {
    base: 'inset-y-0 right-0 w-full max-w-[420px] border-l border-divider',
    closed: 'translate-x-full',
  },
  [DrawerSide.Full]: {
    base: 'inset-0',
    closed: '-translate-y-full',
  },
};

export const Drawer = ({ open, onClose, side = DrawerSide.Right, label, children }: DrawerProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return undefined;

    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();

    const onKeyDown = (keyboardEvent: KeyboardEvent) => {
      if (keyboardEvent.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      restoreFocusRef.current?.focus();
    };
  }, [open, onClose]);

  const sideClasses = PANEL_CLASSES[side];

  return (
    <div aria-hidden={!open} inert={!open} className={cx('fixed inset-0 z-50', !open && 'pointer-events-none')}>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={cx(
          'absolute inset-0 bg-[color-mix(in_srgb,var(--color-ink)_40%,transparent)]',
          'transition-opacity duration-[var(--motion-drawer)]',
          open ? 'opacity-100' : 'opacity-0',
        )}
      />
      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        className={cx(
          'absolute flex flex-col bg-ground shadow-lg outline-none',
          'transition-transform duration-[var(--motion-drawer)] ease-[var(--ease-soft)]',
          sideClasses.base,
          !open && sideClasses.closed,
        )}
      >
        {children}
      </div>
    </div>
  );
};
