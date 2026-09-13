import { useEffect, useMemo, useRef } from "react";
import type { ExplorationFolderData, ExplorationImage } from "../../data/exploration";

type ExplorationGalleryOverlayProps = {
  folder: ExplorationFolderData;
  onClose: () => void;
};

type GalleryColumn = {
  images: ExplorationImage[];
  speed: number;
  offset: number;
};

function shouldRenderImage(src: string) {
  return src && !src.startsWith("/placeholder/");
}

function GalleryCard({ image }: { image: ExplorationImage }) {
  return (
    <figure className={`waterfall-photo-card tone-${image.tone}`} style={{ aspectRatio: image.ratio }}>
      {shouldRenderImage(image.src) ? <img src={image.src} alt={image.alt} /> : <span aria-hidden="true" />}
    </figure>
  );
}

function buildColumnImages(images: ExplorationImage[], columnIndex: number) {
  if (images.length === 0) {
    return [];
  }

  const columnRanges = [
    [0, 4],
    [4, 8],
    [8, 12],
    [12, 16],
    [16, 21],
    [21, 26],
    [26, 32],
  ];
  const columnPatterns = [
    [111, 231, 207, 207],
    [231, 231, 96, 207],
    [111, 207, 231, 207],
    [207, 231, 270, 111],
    [111, 207, 123, 231, 111],
    [207, 111, 207, 231, 207],
    [111, 231, 207, 231, 111],
  ];
  const [start, end] = columnRanges[columnIndex] ?? [0, images.length];
  const columnImages = images.slice(start, end);
  const sourceImages = columnImages.length > 0 ? columnImages : images;
  const minimumCards = 8;
  const pattern = columnPatterns[columnIndex] ?? columnPatterns[0];

  return Array.from(
    { length: Math.max(minimumCards, sourceImages.length) },
    (_, index) => ({
      ...sourceImages[index % sourceImages.length],
      id: `${sourceImages[index % sourceImages.length].id}-c${columnIndex + 1}-${index}`,
      ratio: `159 / ${pattern[index % pattern.length]}`,
    }),
  );
}

export function ExplorationGalleryOverlay({ folder, onClose }: ExplorationGalleryOverlayProps) {
  const images = folder.galleryImages ?? [];
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRefs = useRef<HTMLDivElement[]>([]);
  const cardRefs = useRef<HTMLElement[][]>([]);

  const columns = useMemo<GalleryColumn[]>(() => {
    const speeds = [0.96, 1, 0.92, 1.08, 0.98, 1.04, 0.94];
    const offsets = [32, 74, 52, 74, 74, 11, 74];

    return Array.from({ length: 7 }, (_, columnIndex) => ({
      images: buildColumnImages(images, columnIndex),
      speed: speeds[columnIndex],
      offset: offsets[columnIndex],
    }));
  }, [images]);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("portfolio:secondary-page", { detail: true }));

    return () => {
      window.dispatchEvent(new CustomEvent("portfolio:secondary-page", { detail: false }));
    };
  }, []);

  useEffect(() => {
    const stageElement = stageRef.current;
    const tracks = trackRefs.current;

    if (!stageElement || tracks.length === 0) {
      return;
    }

    const positions = columns.map((column) => column.offset);
    const groupHeights = columns.map((_, index) => {
      const track = tracks[index];
      return track ? Math.round(track.scrollHeight / 2) : 0;
    });
    const manualVelocity = { value: 0 };
    let touchStartY = 0;
    const lockedWindowScrollY = window.scrollY;

    const lerp = (from: number, to: number, progress: number) => from + (to - from) * progress;
    const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

    const updateCardEdges = () => {
      const stageBox = stageElement.getBoundingClientRect();
      const edgeZone = Math.max(160, stageBox.height * 0.22);

      cardRefs.current.forEach((cards) => {
        cards.forEach((card) => {
          const box = card.getBoundingClientRect();
          const centerY = box.top + box.height / 2 - stageBox.top;
          let progress = 1;
          let rotateX = 0;

          card.style.transformOrigin = "center center";

          if (centerY < edgeZone) {
            progress = clamp(centerY / edgeZone, 0, 1);
            rotateX = lerp(-6, 0, progress);
            card.style.transformOrigin = "center top";
          } else if (centerY > stageBox.height - edgeZone) {
            progress = clamp((stageBox.height - centerY) / edgeZone, 0, 1);
            rotateX = lerp(6, 0, progress);
            card.style.transformOrigin = "center bottom";
          }

          const scaleY = lerp(0.94, 1, progress);
          const opacity = lerp(0.58, 1, progress);
          const blur = lerp(2.5, 0, progress);

          card.style.opacity = opacity.toFixed(3);
          card.style.filter = `blur(${blur.toFixed(2)}px)`;
          card.style.transform = `perspective(700px) rotateX(${rotateX.toFixed(2)}deg) scaleY(${scaleY.toFixed(3)})`;
        });
      });
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();
      manualVelocity.value += event.deltaY * 0.045;
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? 0;
    };

    const handleTouchMove = (event: TouchEvent) => {
      event.preventDefault();
      event.stopPropagation();
      const currentY = event.touches[0]?.clientY ?? touchStartY;
      const deltaY = touchStartY - currentY;
      touchStartY = currentY;
      manualVelocity.value += deltaY * 0.1;
    };

    const handleWindowScroll = () => {
      if (window.scrollY !== lockedWindowScrollY) {
        window.scrollTo({ top: lockedWindowScrollY, behavior: "auto" });
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false, capture: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true, capture: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false, capture: true });
    window.addEventListener("scroll", handleWindowScroll, { passive: true });

    let animationFrame = 0;

    const animate = () => {
      tracks.forEach((track, index) => {
        const groupHeight = groupHeights[index];
        if (!groupHeight) {
          return;
        }

        const columnSpeed = columns[index].speed;
        const nextPosition = positions[index] + columnSpeed + manualVelocity.value * columnSpeed;
        positions[index] = ((nextPosition % groupHeight) + groupHeight) % groupHeight;

        track.style.transform = `translate3d(0, ${Math.round(-positions[index])}px, 0)`;
      });

      manualVelocity.value *= 0.9;

      if (Math.abs(manualVelocity.value) < 0.01) {
        manualVelocity.value = 0;
      }

      updateCardEdges();
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("wheel", handleWheel, { capture: true });
      window.removeEventListener("touchstart", handleTouchStart, { capture: true });
      window.removeEventListener("touchmove", handleTouchMove, { capture: true });
      window.removeEventListener("scroll", handleWindowScroll);
    };
  }, [columns]);

  return (
    <div
      className="gallery-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Photo gallery"
    >
      <button className="gallery-close" type="button" aria-label="Close gallery" onClick={onClose}>
        <span aria-hidden="true" />
      </button>
      <section className="waterfall-gallery-section" ref={stageRef}>
        <div className="waterfall-gallery-stage">
          {columns.map((column, columnIndex) => (
            <div className={`waterfall-gallery-column column-${columnIndex + 1}`} key={`column-${columnIndex}`}>
              <div
                className="waterfall-column-track"
                ref={(element) => {
                  if (element) {
                    trackRefs.current[columnIndex] = element;
                  }
                }}
              >
                {[...column.images, ...column.images].map((image, imageIndex) => (
                  <div
                    className="waterfall-card-shell"
                    key={`${image.id}-${columnIndex}-${imageIndex}`}
                    ref={(element) => {
                      if (!cardRefs.current[columnIndex]) {
                        cardRefs.current[columnIndex] = [];
                      }

                      if (element) {
                        cardRefs.current[columnIndex][imageIndex] = element;
                      }
                    }}
                  >
                    <GalleryCard image={image} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
