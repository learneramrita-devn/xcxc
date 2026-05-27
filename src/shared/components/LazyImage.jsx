import { useState, useEffect, useRef } from 'react';

const LazyImage = ({
  src,
  webp,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3C/svg%3E',
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (!imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.01,
      }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, []);

  const handleLoad = (e) => {
    setIsLoaded(true);
    onLoad?.(e);
  };

  const handleError = (e) => {
    setHasError(true);
    onError?.(e);
  };

  return (
    <picture ref={imgRef}>
      {webp && isInView && (
        <source srcSet={webp} type="image/webp" />
      )}
      <img
        src={isInView ? src : placeholder}
        alt={alt}
        className={`${className} ${isLoaded ? 'loaded' : 'loading'}`}
        width={width}
        height={height}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          opacity: isLoaded ? 1 : 0.5,
          transition: 'opacity 0.3s ease-in-out',
          ...props.style,
        }}
        {...props}
      />
      {hasError && (
        <div
          style={{
            width: width || '100%',
            height: height || 'auto',
            background: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#999',
          }}
        >
          Image not available
        </div>
      )}
    </picture>
  );
};

export default LazyImage;
