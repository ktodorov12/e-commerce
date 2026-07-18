import type { ReactNode } from 'react';

import { PlusIcon } from '@/lib/shared/icons';

/** Native details/summary, styled — PDP information sections. */
export interface AccordionItemProps {
  readonly title: string;
  readonly children: ReactNode;
  readonly defaultOpen?: boolean;
}

export const AccordionItem = ({ title, children, defaultOpen = false }: AccordionItemProps) => (
  <details open={defaultOpen} className="group border-b border-divider py-4 last:border-b-0">
    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm text-ink [&::-webkit-details-marker]:hidden">
      {title}
      <PlusIcon size={14} className="text-ink-muted transition-transform duration-150 group-open:rotate-45" />
    </summary>
    <div className="pt-3 text-sm text-ink-muted">{children}</div>
  </details>
);
