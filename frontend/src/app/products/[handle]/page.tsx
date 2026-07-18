import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductByHandle, isShopifyHandle } from '@exclusive-wear/shopify';

import { ProductGallery } from '@/components/product/ProductGallery';
import { VariantPicker } from '@/components/product/VariantPicker';
import { siteContent } from '@/content/site';
import { AccordionItem } from '@/lib/shared/Accordion';
import { Price } from '@/lib/shared/Price';

interface ProductPageProps {
  readonly params: Promise<{ readonly handle: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  // Guard the route param before it reaches Shopify: a malformed handle is a
  // miss, not a query.
  if (!isShopifyHandle(handle)) return { title: siteContent.pdp.notFound };
  const product = await getProductByHandle(handle);
  return product === null
    ? { title: siteContent.pdp.notFound }
    : { title: product.title, description: product.description };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  if (!isShopifyHandle(handle)) notFound();
  const product = await getProductByHandle(handle);
  if (product === null) notFound();

  return (
    <div className="mx-auto w-full max-w-[1200px] px-6 pt-6 md:grid md:grid-cols-2 md:gap-12 md:pt-10">
      <div className="-mx-6 md:mx-0">
        <ProductGallery images={product.images} title={product.title} />
      </div>

      <div className="flex flex-col gap-6 py-8 md:max-w-[480px] md:py-0">
        <div className="animate-rise">
          {product.productType ? <p className="kicker mb-2">{product.productType}</p> : null}
          <div className="flex items-baseline justify-between gap-6">
            <h1 className="text-h3">{product.title}</h1>
            <Price
              price={product.price}
              compareAtPrice={product.compareAtPrice}
              className="shrink-0 text-h5"
            />
          </div>
        </div>

        {product.description ? (
          <p className="text-sm text-ink-muted">{product.description}</p>
        ) : null}

        <VariantPicker product={product} />

        <div className="mt-2">
          {/*
            "Details & composition" previously rendered Shopify's descriptionHtml
            via dangerouslySetInnerHTML — a raw-HTML XSS surface. Removed: backend
            HTML must be sanitized before it can be rendered. To restore rich
            details, add a vetted sanitizer (e.g. isomorphic-dompurify) and render
            the sanitized output here. The plain-text description above is unaffected.
          */}
          <AccordionItem title={siteContent.pdp.shippingTitle}>
            {siteContent.pdp.shippingBody}
          </AccordionItem>
          <AccordionItem title={siteContent.pdp.careTitle}>
            {siteContent.pdp.careBody}
          </AccordionItem>
        </div>
      </div>
    </div>
  );
}
