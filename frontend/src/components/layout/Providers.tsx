'use client';

import type { ReactNode } from 'react';

import { CartMachineContext } from '@/machines/cartMachineContext';
import { MenuMachineContext } from '@/machines/menuMachineContext';

export const Providers = ({ children }: { readonly children: ReactNode }) => (
  <CartMachineContext.Provider>
    <MenuMachineContext.Provider>{children}</MenuMachineContext.Provider>
  </CartMachineContext.Provider>
);
