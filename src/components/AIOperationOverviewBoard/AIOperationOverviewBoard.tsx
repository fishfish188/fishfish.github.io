import { useRef, useState, type PointerEvent } from "react";

const operAsset = (name: string) => `/assets/figwright-ai-oper-2-1/${name}`;
const vibeAsset = (name: string) => `/assets/figwright-vibe-coding/${name}?v=20260908`;
const SWIPE_SENSITIVITY = 100;

type CardPlacement = {
  x: number;
  y: number;
  rotation: number;
};

type CardBase = {
  key: string;
  figmaNode: string;
  number: "1" | "2" | "3";
  paper: string;
  title: string;
  step: string;
  placement: CardPlacement;
};

type PainBlock = {
  title?: string;
  body: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

type Card =
  | (CardBase & {
      kind: "pain";
      blocks: PainBlock[];
    })
  | (CardBase & {
      kind: "mapping";
    })
  | (CardBase & {
      kind: "image";
      image: string;
      imageClass?: string;
    });

const frontPlacement: CardPlacement = { x: 543, y: 160, rotation: 0 };
const stackedPlacement: CardPlacement = { x: 538.17, y: 146, rotation: 3 };

const initialCards: Card[] = [
  {
    key: "pain-1",
    figmaNode: "2337:787",
    number: "1",
    paper: "2337-788.png",
    title: "产品分析",
    step: "STEP 1   用户痛点",
    kind: "pain",
    placement: frontPlacement,
    blocks: [
      {
        title: "痛点一：不知道有什么可尝试的兴趣",
        body: "用户原话：“我想培养个爱好，但除了刷手机想不出还能做什么。”\n场景还原：\n•  周末躺在床上，意识到这周除了工作和吃饭什么都没做\n•  打开小红书搜索“适合女生的爱好”，结果全是烘焙、插花、瑜伽\n•  感觉这些都不适合自己，但也不知道还有什么别的选项\n•  最终放弃思考，继续刷短视频",
        x: 24,
        y: 95,
        width: 470,
        height: 163,
      },
      {
        title: "痛点二：担心投入过高，三分钟热度浪费钱",
        body: "用户原话：“我怕买了装备后坚持不下来，最后东西吃灰，钱也花了，还觉得自己很失败。”",
        x: 24,
        y: 270,
        width: 470,
        height: 79,
      },
    ],
  },
  {
    key: "pain-2",
    figmaNode: "2337:670",
    number: "1",
    paper: "2337-671.png",
    title: "产品分析",
    step: "STEP 1   用户痛点",
    kind: "pain",
    placement: stackedPlacement,
    blocks: [
      {
        body: "场景还原：\n•  被种草网球，搜了一下发现球拍、球鞋、场地卡零零散散加起来要3000+，开始犹豫\n•  想起之前买的吉他、Kindle、健身卡都闲置了，自我怀疑“可能又会重蹈覆辙”\n•  最终放弃，甚至产生\"我不配拥有爱好\"的消极心理",
        x: 36,
        y: 93,
        width: 458,
        height: 122,
      },
      {
        title: "痛点三：教程资源分散，存了很多都在收藏夹吃灰",
        body: "用户原话：“网上教程太多了，收藏了很多不知道该跟哪个。”\n场景还原：\n•  决定自学某项兴趣，打开B站/小红书搜索教程\n•  结果页出现几十甚至上百个视频\n•  花了大量时间筛选，还没开始学就已经疲惫",
        x: 24,
        y: 227,
        width: 470,
        height: 141,
      },
    ],
  },
  {
    key: "mapping",
    figmaNode: "2337:682",
    number: "1",
    paper: "2337-683.png",
    title: "产品分析",
    step: "STEP 2   功能映射",
    kind: "mapping",
    placement: stackedPlacement,
  },
  {
    key: "flow",
    figmaNode: "2337:708",
    number: "1",
    paper: "2337-709.png",
    title: "产品分析",
    step: "STEP 3   主要功能流程图",
    kind: "image",
    placement: stackedPlacement,
    image: "2337-713.png",
    imageClass: "oper21-card-image-flow",
  },
  {
    key: "architecture",
    figmaNode: "2337:716",
    number: "1",
    paper: "2337-717.png",
    title: "产品分析",
    step: "STEP 3   主要功能模块架构图",
    kind: "image",
    placement: stackedPlacement,
    image: "2337-721.png",
    imageClass: "oper21-card-image-architecture",
  },
  {
    key: "journey",
    figmaNode: "2337:724",
    number: "1",
    paper: "2337-725.png",
    title: "产品分析",
    step: "STEP 4   用户旅程图",
    kind: "image",
    placement: stackedPlacement,
    image: "2337-729.png",
    imageClass: "oper21-card-image-journey",
  },
  {
    key: "prd",
    figmaNode: "2337:732",
    number: "2",
    paper: "2337-733.png",
    title: "原型设计",
    step: "STEP 1   输出PRD文档",
    kind: "image",
    placement: stackedPlacement,
    image: "2337-737.png",
    imageClass: "oper21-card-image-prd",
  },
  {
    key: "wireframe",
    figmaNode: "2337:742",
    number: "2",
    paper: "2337-743.png",
    title: "原型设计",
    step: "STEP 2   ASCII线框图",
    kind: "image",
    placement: stackedPlacement,
    image: "2337-747.png",
    imageClass: "oper21-card-image-wireframe",
  },
  {
    key: "style",
    figmaNode: "2337:764",
    number: "3",
    paper: "2337-765.png",
    title: "高保真设计",
    step: "STEP 1   设计风格确定",
    kind: "image",
    placement: stackedPlacement,
    image: "2337-769.png",
    imageClass: "oper21-card-image-style",
  },
  {
    key: "demo",
    figmaNode: "2337:777",
    number: "3",
    paper: "2337-778.png",
    title: "高保真设计",
    step: "STEP 2  DEMO制作",
    kind: "image",
    placement: stackedPlacement,
    image: "2337-782.png",
    imageClass: "oper21-card-image-demo",
  },
];

function RightArrow() {
  return <span className="oper21-right-arrow" aria-hidden="true" />;
}

function CardHeader({ card }: { card: Card }) {
  return (
    <>
      <span className={`oper21-card-number oper21-card-number-${card.number}`}>{card.number}</span>
      <span className="oper21-card-title">{card.title}</span>
      <RightArrow />
      <span className="oper21-card-step">{card.step}</span>
    </>
  );
}

function PainContent({ blocks }: { blocks: PainBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => (
        <section
          className={`oper21-pain-block ${block.title ? "" : "oper21-pain-block-text-only"}`}
          key={`${block.title ?? "pain-copy"}-${index}`}
          style={{
            left: `${block.x}px`,
            top: `${block.y}px`,
            width: `${block.width}px`,
          }}
        >
          {block.title && (
            <div className="oper21-pain-heading">
              <span />
              <strong>{block.title}</strong>
            </div>
          )}
          <p>{block.body}</p>
        </section>
      ))}
    </>
  );
}

function MappingContent() {
  return (
    <>
      <div className="oper21-mapping-chart" aria-label="主要产品功能映射">
        <div className="oper21-mapping-frame" />
        <span className="oper21-map-title">主要产品功能映射</span>
        <span className="oper21-map-pain-title">痛点</span>
        <span className="oper21-map-text oper21-map-text-a">“测一测”适合什么兴趣+兴趣推荐</span>
        <span className="oper21-map-text oper21-map-text-b">不知道有什么可尝试</span>
        <span className="oper21-map-text oper21-map-text-c">费用分级（入门档/进阶档）+ 分阶段装备推荐</span>
        <span className="oper21-map-text oper21-map-text-d">担心投入过高浪费钱</span>
        <span className="oper21-map-text oper21-map-text-e">精选教程链接（B站/小红书/抖音）+用户自主添加</span>
        <span className="oper21-map-text oper21-map-text-f">状态追踪（想尝试→进行中→已体验）+ 轻量打卡</span>
        <span className="oper21-map-text oper21-map-text-g">教程资源分散</span>
        <span className="oper21-map-text oper21-map-text-h">跟踪反馈</span>
        <i className="oper21-map-line oper21-map-line-1" />
        <i className="oper21-map-line oper21-map-line-2" />
        <i className="oper21-map-line oper21-map-line-3" />
        <i className="oper21-map-line oper21-map-line-4" />
      </div>
      <span className="oper21-icon-down" aria-hidden="true" />
    </>
  );
}

function CardContent({ card }: { card: Card }) {
  if (card.kind === "pain") {
    return <PainContent blocks={card.blocks} />;
  }

  if (card.kind === "mapping") {
    return <MappingContent />;
  }

  return <img className={`oper21-card-image ${card.imageClass ?? ""}`} src={vibeAsset(card.image)} alt="" draggable={false} />;
}

export function AIOperationOverviewBoard() {
  const [orderedCards, setOrderedCards] = useState(initialCards);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartXRef = useRef(0);
  const activePointerIdRef = useRef<number | null>(null);

  const moveTopCardToBack = () => {
    setOrderedCards(([first, ...rest]) => [...rest, first]);
  };

  const moveBackCardToTop = () => {
    setOrderedCards((current) => {
      const last = current[current.length - 1];
      return [last, ...current.slice(0, -1)];
    });
  };

  const handlePointerDown = (event: PointerEvent<HTMLElement>, isTopCard: boolean) => {
    if (!isTopCard) return;

    activePointerIdRef.current = event.pointerId;
    dragStartXRef.current = event.clientX;
    setIsDragging(true);
    setDragX(0);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (activePointerIdRef.current !== event.pointerId) return;

    const nextDragX = event.clientX - dragStartXRef.current;
    const isAtStart = orderedCards[0]?.key === "pain-1";
    setDragX(isAtStart ? Math.min(0, nextDragX) : nextDragX);
  };

  const handlePointerEnd = (event: PointerEvent<HTMLElement>) => {
    if (activePointerIdRef.current !== event.pointerId) return;

    const isAtStart = orderedCards[0]?.key === "pain-1";
    const rawFinalDragX = event.clientX - dragStartXRef.current;
    const finalDragX = isAtStart ? Math.min(0, rawFinalDragX) : rawFinalDragX;

    activePointerIdRef.current = null;
    setIsDragging(false);

    if (finalDragX <= -SWIPE_SENSITIVITY) {
      moveTopCardToBack();
      setDragX(0);
      return;
    }

    if (!isAtStart && finalDragX >= SWIPE_SENSITIVITY) {
      moveBackCardToTop();
      setDragX(0);
      return;
    }

    setDragX(0);
  };

  return (
    <article className="ai-oper21-board" aria-label="AI/运营2-1">
      <img className="oper21-bg-laptop" src={operAsset("2199-2154.png")} alt="" draggable={false} />
      <img className="oper21-bg-notebook" src={operAsset("2199-2155.png")} alt="" draggable={false} />
      <img className="oper21-phone" src={operAsset("2199-2159.png")} alt="" draggable={false} />

      {orderedCards.map((card, index) => {
        const isTopCard = index === 0;
        const placement = isTopCard ? frontPlacement : stackedPlacement;
        const dragRotation = dragX / 42;
        const transform = isTopCard
          ? `translate3d(${dragX}px, 0, 0) rotate(${dragRotation}deg)`
          : `rotate(${placement.rotation}deg)`;

        return (
          <section
            className={`oper21-paper-card oper21-paper-card-${card.key} ${isTopCard ? "is-top-card" : ""} ${isTopCard && isDragging ? "is-dragging" : ""}`}
            data-figma-node-id={card.figmaNode}
            key={card.key}
            onPointerCancel={handlePointerEnd}
            onPointerDown={(event) => handlePointerDown(event, isTopCard)}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            style={{
              left: `${placement.x}px`,
              top: `${placement.y}px`,
              transform,
              zIndex: orderedCards.length - index,
            }}
          >
            <img className="oper21-paper-bg" src={vibeAsset(card.paper)} alt="" draggable={false} />
            <CardHeader card={card} />
            <CardContent card={card} />
          </section>
        );
      })}
    </article>
  );
}
