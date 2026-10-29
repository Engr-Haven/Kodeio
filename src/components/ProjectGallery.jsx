import ProjectImage from './ProjectImage';

/**
 * Renders one project image, or a two-up pair for projects that need to show
 * more than one screen in the same tile (for example a desktop and mobile view).
 */
export default function ProjectGallery({
  images,
  alt,
  fit = 'cover',
  className = '',
  imageClassName = '',
  loading = 'lazy',
  ...props
}) {
  const list = (Array.isArray(images) ? images : [images]).filter(Boolean);

  if (list.length > 1) {
    return (
      <div className={`grid grid-cols-2 gap-3 ${className}`}>
        {list.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className="relative min-h-0 overflow-hidden rounded-xl border border-line bg-surface-2"
          >
            <ProjectImage
              src={src}
              alt={`${alt} — view ${index + 1}`}
              fit={fit}
              loading={loading}
              className="absolute inset-0 h-full w-full object-top"
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <ProjectImage
      src={list[0]}
      alt={alt}
      fit={fit}
      loading={loading}
      className={imageClassName}
      {...props}
    />
  );
}
