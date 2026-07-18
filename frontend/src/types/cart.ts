import { CartMutationKind } from '@/types/machines';

/**
 * The single write contract between the cart machine (client) and the
 * cart server action. Discriminated on {@link CartMutationKind}.
 */
export type CartMutationInput =
  | {
      readonly kind: CartMutationKind.AddLines;
      readonly merchandiseId: string;
      readonly quantity: number;
    }
  | {
      readonly kind: CartMutationKind.UpdateLine;
      readonly lineId: string;
      readonly quantity: number;
    }
  | {
      readonly kind: CartMutationKind.RemoveLine;
      readonly lineId: string;
    };
