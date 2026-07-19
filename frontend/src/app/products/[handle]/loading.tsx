import { LoadingOverlay } from '@/lib/shared/LoadingOverlay';

/** Card → PDP navigation can hit a slow Storefront fetch — show the wave. */
export default function ProductLoading() {
  return <LoadingOverlay />;
}
