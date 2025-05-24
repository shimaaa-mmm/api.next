'use client';

import React, { useState, useEffect } from 'react';

export default function ArticleImageClient({ src, alt = "تصویر", className, useMap }) {
  // const defaultImage = "http://cdn.adlara.ir/upload/adl-articles/262e1e3ea9984f83ac8fddbd11d2ffc9490056984.jpeg";

  const getValidImageSrc = (src) => {
    if (!src || src.trim() === "" || src.trim() === "-") return defaultImage;
    if (src.startsWith("http")) return src;
    if (src.startsWith("/upload")) {
      return `https://cdn.adlara.ir${src}`;
    }
    return `https://cdn.adlara.ir/upload/adl-articles/${src}`;
  };

  const [imgSrc, setImgSrc] = useState(getValidImageSrc(src));

  useEffect(() => {
    setImgSrc(getValidImageSrc(src));
  }, [src]);

  const handleError = () => {
    setImgSrc(defaultImage);
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      useMap={useMap}
    />
  );
}
