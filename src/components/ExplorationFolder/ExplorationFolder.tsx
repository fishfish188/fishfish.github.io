import { useRef, useState } from "react";
import { FolderPreviewFrames } from "../FolderPreviewFrames/FolderPreviewFrames";
import type { ExplorationFolderData } from "../../data/exploration";

type ExplorationFolderProps = {
  folder: ExplorationFolderData;
  index: number;
  onOpenGallery: (folder: ExplorationFolderData) => void;
};

export function ExplorationFolder({ folder, index, onOpenGallery }: ExplorationFolderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const closingTimerRef = useRef<number | null>(null);
  const isWaterfall = folder.type === "waterfall";

  const openGallery = () => {
    if (isWaterfall) {
      onOpenGallery(folder);
    }
  };

  const clearClosingTimer = () => {
    if (closingTimerRef.current === null) {
      return;
    }

    window.clearTimeout(closingTimerRef.current);
    closingTimerRef.current = null;
  };

  const openFolder = () => {
    clearClosingTimer();
    setIsClosing(false);
    setIsOpen(true);
  };

  const closeFolder = () => {
    clearClosingTimer();
    setIsOpen(false);
    setIsClosing(true);
    closingTimerRef.current = window.setTimeout(() => {
      setIsClosing(false);
      closingTimerRef.current = null;
    }, 420);
  };

  return (
    <button
      className={`explorer-folder explorer-folder-${index + 1} ${isOpen ? "is-open" : ""} ${isClosing ? "is-closing" : ""}`}
      type="button"
      aria-label={isWaterfall ? "Open gallery" : "Preview folder"}
      onClick={openGallery}
      onBlur={closeFolder}
      onFocus={openFolder}
      onMouseEnter={openFolder}
      onMouseLeave={closeFolder}
      onPointerEnter={openFolder}
      onPointerLeave={closeFolder}
    >
      <FolderPreviewFrames
        clickable={isWaterfall}
        images={folder.previewImages}
        onClick={openGallery}
      />
      <svg className="folder-back" viewBox="0 0 155 126" aria-hidden="true">
        <path d="M0 8C0 3.58172 3.58172 0 8 0H38.5C42.9183 0 46.5 3.58172 46.5 8V12.4505H139C147.837 12.4505 155 19.614 155 28.4505V110C155 118.837 147.837 126 139 126H16C7.16345 126 0 118.837 0 110V8Z" />
      </svg>
      <span className="folder-pocket" aria-hidden="true" />
      <svg className="folder-front" viewBox="0 0 155 114" aria-hidden="true">
        <path d="M0 8C0 3.58172 3.58172 0 8 0H139C147.837 0 155 7.16344 155 16V98C155 106.837 147.837 114 139 114H16C7.16345 114 0 106.837 0 98V8Z" />
      </svg>
      <svg className="folder-front-hover" viewBox="0 0 188 86" aria-hidden="true">
        <path d="M0.298975 10.1504C-1.1242 5.05068 2.70998 0 8.00455 0H171.39C181.979 0 189.647 10.1014 186.801 20.3008L171.731 74.3008C169.801 81.2167 163.5 86 156.32 86H33.6125C26.4323 86 20.1314 81.2167 18.2014 74.3008L0.298975 10.1504Z" />
      </svg>
      <span className="folder-dot" aria-hidden="true" />
    </button>
  );
}
