'use client';

import { useCallback } from 'react';

import { MenuMachineContext } from '@/machines/menuMachineContext';
import { MenuEventType, MenuState } from '@/types/machines';

export const useMenuOpen = (): boolean =>
  MenuMachineContext.useSelector((snapshot) => snapshot.matches(MenuState.Open));

export const useMenuActions = () => {
  const actorRef = MenuMachineContext.useActorRef();
  const open = useCallback(() => actorRef.send({ type: MenuEventType.Open }), [actorRef]);
  const close = useCallback(() => actorRef.send({ type: MenuEventType.Close }), [actorRef]);
  const toggle = useCallback(() => actorRef.send({ type: MenuEventType.Toggle }), [actorRef]);
  return { open, close, toggle };
};
