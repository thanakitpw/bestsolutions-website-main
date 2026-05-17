"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

type Props = {
  images: string[];
  alt: string;
};

export function PortfolioGallery({ images, alt }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.children[index] as HTMLElement | undefined;
    if (slide) {
      track.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
    }
  }, []);

  const next = useCallback(() => {
    scrollTo((activeIndex + 1) % images.length);
  }, [activeIndex, images.length, scrollTo]);

  const prev = useCallback(() => {
    scrollTo((activeIndex - 1 + images.length) % images.length);
  }, [activeIndex, images.length, scrollTo]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleScroll = () => {
      const slideWidth = track.clientWidth;
      const index = Math.round(track.scrollLeft / slideWidth);
      setActiveIndex(index);
    };

    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => track.removeEventListener("scroll", handleScroll);
  }, []);

  if (images.length === 0) return null;

  return (
    <div className="gallery">
      <div
        className="gallery-track"
        ref={trackRef}
        role="region"
        aria-label="แกลเลอรีรูปผลงาน"
        aria-roledescription="carousel"
      >
        {images.map((src, i) => (
          <div
            key={src}
            className="gallery-slide"
            role="group"
            aria-roledescription="slide"
            aria-label={`รูปที่ ${i + 1} จาก ${images.length}`}
          >
            <Image
              src={src}
              alt={`${alt} — รูปที่ ${i + 1}`}
              fill
              sizes="(min-width: 1280px) 1200px, 100vw"
              priority={i === 0}
              className="gallery-img"
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            className="gallery-btn gallery-btn-prev"
            onClick={prev}
            aria-label="รูปก่อนหน้า"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            className="gallery-btn gallery-btn-next"
            onClick={next}
            aria-label="รูปถัดไป"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div className="gallery-dots" role="tablist" aria-label="เลือกรูป">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={`ไปรูปที่ ${i + 1}`}
                className={`gallery-dot ${i === activeIndex ? "is-active" : ""}`}
                onClick={() => scrollTo(i)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
