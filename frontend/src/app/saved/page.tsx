import type { Metadata } from 'next';

import { SavedProductGrid } from '@/components/saved/SavedProductGrid';
import { siteContent } from '@/content/site';

export const metadata: Metadata = { title: siteContent.savedPage.title };

export default function SavedPage() {
  return <SavedProductGrid />;
}
