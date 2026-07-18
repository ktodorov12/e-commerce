import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { siteContent } from '@/content/site';
import { EmptyState } from '@/lib/shared/EmptyState';
import { AppRoute, InfoTopic } from '@/types/routes';

/**
 * Informational pages behind the footer links. The segment is user
 * input — it must map onto {@link InfoTopic} or the request 404s
 * (fail closed; see CLAUDE.md → Guard every boundary).
 */
const parseInfoTopic = (rawTopic: string): InfoTopic | null =>
  (Object.values(InfoTopic) as string[]).includes(rawTopic) ? (rawTopic as InfoTopic) : null;

interface InfoPageProps {
  readonly params: Promise<{ readonly topic: string }>;
}

export async function generateMetadata({ params }: InfoPageProps): Promise<Metadata> {
  const topic = parseInfoTopic((await params).topic);
  return topic === null ? {} : { title: siteContent.info.topics[topic].title };
}

export default async function InfoPage({ params }: InfoPageProps) {
  const topic = parseInfoTopic((await params).topic);
  if (topic === null) notFound();

  const topicContent = siteContent.info.topics[topic];

  return (
    <EmptyState
      kicker={siteContent.info.kicker}
      title={topicContent.title}
      body={topicContent.body}
      ctaLabel={siteContent.info.cta}
      ctaRoute={AppRoute.Products}
    />
  );
}
