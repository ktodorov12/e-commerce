'use client';

import { createActorContext } from '@xstate/react';

import { listingOverlayMachine } from '@/machines/listingOverlayMachine';

export const ListingOverlayMachineContext = createActorContext(listingOverlayMachine);
