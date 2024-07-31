import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { getImageUrl } from '@/lib/utils';
import { ImageVm } from '@/types';

type ImageProps = Omit<NextImageProps, 'alt' | 'src' | 'placeholder' | 'blurDataURL'> & {
  image: ImageVm;
  blur?: boolean;
};

export default function Image({ image, blur = false, fill, onClick, ...rest }: ImageProps) {
  const blurProps = blur
    ? ({
        placeholder: 'blur',
        blurDataURL: image.blurUrl,
      } as const)
    : undefined;

  const widthProps = !fill
    ? {
        height: image.height,
        width: image.width,
      }
    : undefined;

  return (
    <NextImage
      alt={image.altText}
      src={getImageUrl(image.name)}
      fill={fill}
      {...widthProps}
      {...blurProps}
      {...rest}
    />
  );
}
