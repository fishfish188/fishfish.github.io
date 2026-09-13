export type ExplorationImage = {
  id: string;
  src: string;
  alt: string;
  ratio: string;
  tone: string;
};

export type ExplorationFolderData = {
  id: string;
  zhTitle: string;
  enTitle: string;
  type: "preview-only" | "waterfall";
  previewImages: ExplorationImage[];
  galleryImages?: ExplorationImage[];
};

const previewSetA: ExplorationImage[] = [
  { id: "visual-01", src: "/placeholder/exploration/visual-01.jpg", alt: "exploration preview 01", ratio: "4 / 5", tone: "peach" },
  { id: "visual-02", src: "/placeholder/exploration/visual-02.jpg", alt: "exploration preview 02", ratio: "1 / 1", tone: "mist" },
  { id: "visual-03", src: "/placeholder/exploration/visual-03.jpg", alt: "exploration preview 03", ratio: "5 / 4", tone: "sage" },
  { id: "visual-04", src: "/placeholder/exploration/visual-04.jpg", alt: "exploration preview 04", ratio: "3 / 4", tone: "sky" },
];

const previewSetB: ExplorationImage[] = [
  { id: "photo-preview-01", src: "/assets/exploration-custom/photo1.png", alt: "photo archive preview 01", ratio: "164 / 220", tone: "linen" },
  { id: "photo-preview-02", src: "/assets/exploration-custom/photo2.png", alt: "photo archive preview 02", ratio: "164 / 220", tone: "sunset" },
  { id: "photo-preview-03", src: "/assets/exploration-custom/photo3.png", alt: "photo archive preview 03", ratio: "164 / 220", tone: "blue" },
];

export const galleryImages: ExplorationImage[] = [
  { id: "gallery-01", src: "/assets/waterfall/photo-01.jpg", alt: "exploration image 01", ratio: "1800 / 1200", tone: "linen" },
  { id: "gallery-02", src: "/assets/waterfall/photo-02.jpg", alt: "exploration image 02", ratio: "1800 / 1200", tone: "sunset" },
  { id: "gallery-03", src: "/assets/waterfall/photo-03.jpg", alt: "exploration image 03", ratio: "1350 / 1800", tone: "sage" },
  { id: "gallery-04", src: "/assets/waterfall/photo-04.jpg", alt: "exploration image 04", ratio: "1349 / 1800", tone: "sky" },
  { id: "gallery-05", src: "/assets/waterfall/photo-05.jpg", alt: "exploration image 05", ratio: "1800 / 1350", tone: "peach" },
  { id: "gallery-06", src: "/assets/waterfall/photo-06.jpg", alt: "exploration image 06", ratio: "1350 / 1800", tone: "mist" },
  { id: "gallery-07", src: "/assets/waterfall/photo-07.jpg", alt: "exploration image 07", ratio: "1350 / 1800", tone: "blue" },
  { id: "gallery-08", src: "/assets/waterfall/photo-08.jpg", alt: "exploration image 08", ratio: "1800 / 1200", tone: "film" },
  { id: "gallery-09", src: "/assets/waterfall/photo-09.jpg", alt: "exploration image 09", ratio: "1800 / 1200", tone: "linen" },
  { id: "gallery-10", src: "/assets/waterfall/photo-10.jpg", alt: "exploration image 10", ratio: "1199 / 1800", tone: "sunset" },
  { id: "gallery-11", src: "/assets/waterfall/photo-11.jpg", alt: "exploration image 11", ratio: "1350 / 1800", tone: "sage" },
  { id: "gallery-12", src: "/assets/waterfall/photo-12.jpg", alt: "exploration image 12", ratio: "1200 / 1800", tone: "mist" },
  { id: "gallery-13", src: "/assets/waterfall/photo-13.jpg", alt: "exploration image 13", ratio: "1800 / 1200", tone: "linen" },
  { id: "gallery-14", src: "/assets/waterfall/photo-14.jpg", alt: "exploration image 14", ratio: "1800 / 1200", tone: "sunset" },
  { id: "gallery-15", src: "/assets/waterfall/photo-15.jpg", alt: "exploration image 15", ratio: "1800 / 1012", tone: "sage" },
  { id: "gallery-16", src: "/assets/waterfall/photo-16.jpg", alt: "exploration image 16", ratio: "1012 / 1800", tone: "sky" },
  { id: "gallery-17", src: "/assets/waterfall/photo-17.jpg", alt: "exploration image 17", ratio: "1350 / 1800", tone: "peach" },
  { id: "gallery-18", src: "/assets/waterfall/photo-18.jpg", alt: "exploration image 18", ratio: "1350 / 1800", tone: "mist" },
  { id: "gallery-19", src: "/assets/waterfall/photo-19.jpg", alt: "exploration image 19", ratio: "1350 / 1800", tone: "blue" },
  { id: "gallery-20", src: "/assets/waterfall/photo-20.jpg", alt: "exploration image 20", ratio: "1349 / 1800", tone: "film" },
  { id: "gallery-21", src: "/assets/waterfall/photo-21.jpg", alt: "exploration image 21", ratio: "1800 / 1350", tone: "linen" },
  { id: "gallery-22", src: "/assets/waterfall/photo-22.jpg", alt: "exploration image 22", ratio: "1800 / 1200", tone: "sunset" },
  { id: "gallery-23", src: "/assets/waterfall/photo-23.jpg", alt: "exploration image 23", ratio: "1800 / 1200", tone: "sage" },
  { id: "gallery-24", src: "/assets/waterfall/photo-24.jpg", alt: "exploration image 24", ratio: "1800 / 1200", tone: "mist" },
  { id: "gallery-25", src: "/assets/waterfall/photo-25.jpg", alt: "exploration image 25", ratio: "1800 / 1200", tone: "linen" },
  { id: "gallery-26", src: "/assets/waterfall/photo-26.jpg", alt: "exploration image 26", ratio: "1800 / 1200", tone: "sunset" },
  { id: "gallery-27", src: "/assets/waterfall/photo-27.jpg", alt: "exploration image 27", ratio: "1200 / 1800", tone: "sage" },
  { id: "gallery-28", src: "/assets/waterfall/photo-28.jpg", alt: "exploration image 28", ratio: "1350 / 1800", tone: "sky" },
  { id: "gallery-29", src: "/assets/waterfall/photo-29.jpg", alt: "exploration image 29", ratio: "1800 / 1200", tone: "peach" },
  { id: "gallery-30", src: "/assets/waterfall/photo-30.jpg", alt: "exploration image 30", ratio: "1800 / 1200", tone: "mist" },
  { id: "gallery-31", src: "/assets/waterfall/photo-31.jpg", alt: "exploration image 31", ratio: "1800 / 1200", tone: "blue" },
  { id: "gallery-32", src: "/assets/waterfall/photo-32.jpg", alt: "exploration image 32", ratio: "1800 / 1200", tone: "film" },
];

export const explorationFolders: ExplorationFolderData[] = [
  {
    id: "xhs-link",
    zhTitle: "自媒体",
    enTitle: "XHS Link",
    type: "preview-only",
    previewImages: previewSetA,
  },
  {
    id: "photo-archive",
    zhTitle: "摄影收藏",
    enTitle: "Photo Archive",
    type: "waterfall",
    previewImages: previewSetB,
    galleryImages,
  },
];
