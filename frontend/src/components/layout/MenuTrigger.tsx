'use client';

import { siteContent } from '@/content/site';
import { useMenuActions } from '@/hooks/useMenuMachine';
import { Button } from '@/lib/shared/Button';
import { MenuIcon } from '@/lib/shared/icons';
import { ButtonSize, ButtonVariant } from '@/types/ui';

export const MenuTrigger = () => {
  const { open } = useMenuActions();
  return (
    <Button
      variant={ButtonVariant.Ghost}
      size={ButtonSize.Icon}
      aria-label={siteContent.a11y.openMenu}
      onClick={open}
      className="text-ink"
    >
      <MenuIcon size={20} />
    </Button>
  );
};
