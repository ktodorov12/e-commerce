'use client';

import { createActorContext } from '@xstate/react';

import { menuMachine } from '@/machines/menuMachine';

export const MenuMachineContext = createActorContext(menuMachine);
