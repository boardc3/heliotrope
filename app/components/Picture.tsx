type PictureProps = {
  bucket: string;
  slug: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  width?: 640 | 1280 | 1920 | 2560;
  widths?: number[];
};

export function Picture({
  bucket,
  slug,
  alt,
  className,
  imgClassName,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority,
  width = 1920,
  widths = [640, 1280, 1920, 2560],
}: PictureProps) {
  const src = `/img/${bucket}/${slug}`;
  return (
    <picture className={className}>
      <source
        type="image/avif"
        srcSet={widths.map((w) => `${src}-${w}.avif ${w}w`).join(", ")}
        sizes={sizes}
      />
      <source
        type="image/webp"
        srcSet={widths.map((w) => `${src}-${w}.webp ${w}w`).join(", ")}
        sizes={sizes}
      />
      <img
        src={`${src}-${width}.jpg`}
        alt={alt}
        className={imgClassName}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
      />
    </picture>
  );
}
