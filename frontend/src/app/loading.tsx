import { LoadingOverlay } from '@/lib/shared/LoadingOverlay';

/**
 * Root-level loading boundary: navigating home (or to any segment without
 * its own loading file) streams behind the wave instead of a frozen page.
 */
export default function RootLoading() {
  return <LoadingOverlay />;
}
