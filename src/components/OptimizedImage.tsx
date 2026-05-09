import { ImgHTMLAttributes } from 'react';
import { shopifyImage, shopifySrcSet, PRESETS } from '@/lib/imageOptimization';

type Preset = keyof typeof PRESETS;

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'> {
  src: string;
  preset?: Preset;
  sizes?: string;
  priority?: boolean;
}

const DEFAULT_SIZES: Record<Preset, string> = {
  thumb: '80px',
  card: '(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 320px',
  hero: '100vw',
  detail: '(max-width: 1024px) 100vw, 60vw',
};

const OptimizedImage = ({
  src,
  preset = 'card',
  sizes,
  priority = false,
  alt = '',
  ...rest
}: OptimizedImageProps) => {
  const widths = PRESETS[preset];
  const fallbackWidth = widths[Math.floor(widths.length / 2)];
  return (
    <img
      src={shopifyImage(src, fallbackWidth)}
      srcSet={shopifySrcSet(src, widths) || undefined}
      sizes={sizes || DEFAULT_SIZES[preset]}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      alt={alt}
      {...rest}
    />
  );
};

export default OptimizedImage;
