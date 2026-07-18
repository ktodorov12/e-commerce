import { setup } from 'xstate';

import { MachineId, MenuEventType, MenuState } from '@/types/machines';

/** Full-screen burger menu lifecycle (design: 400ms vertical wipe). */

export type MenuMachineEvent =
  | { readonly type: MenuEventType.Open }
  | { readonly type: MenuEventType.Close }
  | { readonly type: MenuEventType.Toggle };

export const menuMachine = setup({
  types: {
    events: {} as MenuMachineEvent,
  },
}).createMachine({
  id: MachineId.Menu,
  initial: MenuState.Closed,
  states: {
    [MenuState.Closed]: {
      on: {
        [MenuEventType.Open]: { target: MenuState.Open },
        [MenuEventType.Toggle]: { target: MenuState.Open },
      },
    },
    [MenuState.Open]: {
      on: {
        [MenuEventType.Close]: { target: MenuState.Closed },
        [MenuEventType.Toggle]: { target: MenuState.Closed },
      },
    },
  },
});
