import {
  AtSign,
  Heart,
  House,
  Menu,
  Minus,
  Plus,
  Search,
  Send,
  ShoppingBag,
  SlidersHorizontal,
  Store,
  X,
} from 'lucide-react';
import type { LucideIcon, LucideProps } from 'lucide-react';

/**
 * lucide-react, wrapped once: this file is the ONLY lucide import point
 * in the app. The wrapper pins the house style (18px, 1.5 stroke,
 * hidden from the accessibility tree) so call sites never restate it.
 */

export type IconProps = Omit<LucideProps, 'ref'>;

const DEFAULT_ICON_SIZE = 18;
const ICON_STROKE_WIDTH = 1.5;

const withHouseStyle = (Glyph: LucideIcon) => {
  const StyledIcon = ({ size = DEFAULT_ICON_SIZE, ...props }: IconProps) => (
    <Glyph size={size} strokeWidth={ICON_STROKE_WIDTH} aria-hidden {...props} />
  );
  return StyledIcon;
};

export const BagIcon = withHouseStyle(ShoppingBag);
export const MenuIcon = withHouseStyle(Menu);
export const CloseIcon = withHouseStyle(X);
export const PlusIcon = withHouseStyle(Plus);
export const MinusIcon = withHouseStyle(Minus);
export const HomeIcon = withHouseStyle(House);
export const ShopIcon = withHouseStyle(Store);
export const SearchIcon = withHouseStyle(Search);
export const HeartIcon = withHouseStyle(Heart);
export const FilterIcon = withHouseStyle(SlidersHorizontal);
/* lucide ships no brand icons — AtSign stands in for the Instagram handle. */
export const InstagramIcon = withHouseStyle(AtSign);
export const TelegramIcon = withHouseStyle(Send);
