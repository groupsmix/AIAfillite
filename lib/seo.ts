import type { Metadata } from 'next';
import { siteUrl } from './env';

export function makeMetadata({
  title,
  description,
  path = '/',
  image
}: {
  title: string;
  description: string;
  path?: string;
  image?: string | null;
}): Metadata {
  const url = `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
  const fullTitle = title.includes('CompareAI') ? title : `${title} | CompareAI`;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: 'CompareAI',
      type: 'website',
      images: image ? [{ url: image }] : undefined
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: image ? [image] : undefined
    }
  };
}
