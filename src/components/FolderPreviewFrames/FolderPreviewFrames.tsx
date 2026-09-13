import type { CSSProperties } from "react";
import type { ExplorationImage } from "../../data/exploration";

type FolderPreviewFramesProps = {
  images: ExplorationImage[];
  clickable?: boolean;
  onClick?: () => void;
};

function shouldRenderImage(src: string) {
  return src && !src.startsWith("/placeholder/");
}

export function FolderPreviewFrames({ images, clickable = false, onClick }: FolderPreviewFramesProps) {
  return (
    <div
      className={`folder-preview-frames ${clickable ? "is-clickable" : ""}`}
      onClick={(event) => {
        if (!clickable) {
          return;
        }

        event.stopPropagation();
        onClick?.();
      }}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={(event) => {
        if (!clickable || (event.key !== "Enter" && event.key !== " ")) {
          return;
        }

        event.preventDefault();
        onClick?.();
      }}
    >
      {images.slice(0, 3).map((image, index) => (
        <div
          className={`folder-preview-frame tone-${image.tone}`}
          key={image.id}
          style={{ "--frame-index": index } as CSSProperties}
        >
          {shouldRenderImage(image.src) ? <img src={image.src} alt={image.alt} /> : <span aria-hidden="true" />}
        </div>
      ))}
    </div>
  );
}
