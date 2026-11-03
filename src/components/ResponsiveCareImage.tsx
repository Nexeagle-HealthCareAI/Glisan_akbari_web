import React from 'react';
import type { CareImage } from '../data/serviceImages';

export function ResponsiveCareImage({ image, hero = false, sizes }: {
  image: CareImage;
  hero?: boolean;
  sizes?: string;
}) {
  const embedded = image.src.startsWith('data:')
    ? image.src
    : typeof window !== 'undefined' && (window as any).__SITE_ASSETS__?.[image.src];
  return <img
    src={embedded || image.src}
    srcSet={embedded ? undefined : image.srcSet}
    sizes={embedded || !image.srcSet ? undefined : sizes || '(max-width: 760px) calc(100vw - 40px), (max-width: 1200px) 42vw, 560px'}
    alt={image.alt}
    width={image.width || 800}
    height={image.height || 600}
    loading={hero ? 'eager' : 'lazy'}
    fetchPriority={hero ? 'high' : 'auto'}
    decoding="async"
  />;
}
