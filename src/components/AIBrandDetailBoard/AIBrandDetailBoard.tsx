const brandFullAsset = (name: string) => `/assets/figwright-ai-brand-full/${name}`;
const brandLayerAsset = (name: string) => `/assets/figwright-ai-brand-layers/${name}`;

const brandSections = [
  {
    figmaId: "2311:368",
    height: 1080,
    layerSummary: "sectionA: title/text/shape/path layers tracked; image fills remain rasterized",
    left: 80,
    name: "sectionA",
    src: "2311-368.png",
    top: 24,
    width: 1140,
  },
  {
    figmaId: "2311:405",
    height: 1039,
    layerSummary: "sectionB: title/text/shape/path layers tracked; image fills remain rasterized",
    left: 95,
    name: "sectionB",
    src: "2311-405.png",
    top: 1176,
    width: 1090,
  },
  {
    figmaId: "2311:423",
    height: 1206,
    layerSummary: "sectionC: title/text/shape/path layers tracked; image fills remain rasterized",
    left: 60,
    name: "sectionC",
    src: "2311-423.png",
    top: 2287,
    width: 1160,
  },
  {
    figmaId: "2311:468",
    height: 717,
    layerSummary: "sectionD: title/text/shape/path layers tracked; image fills remain rasterized",
    left: 0,
    name: "sectionD",
    src: "2311-468.png",
    top: 3565,
    width: 1280,
  },
  {
    figmaId: "2311:496",
    height: 1606,
    layerSummary: "secitonE: image group rasterized from Figma typo-named section",
    left: 0,
    name: "secitonE",
    src: "2311-496.png",
    top: 4282,
    width: 1280,
  },
  {
    figmaId: "2311:499",
    height: 1606,
    layerSummary: "sectionF: image group rasterized",
    left: 0,
    name: "sectionF",
    src: "2311-499.png",
    top: 5888,
    width: 1280,
  },
  {
    figmaId: "2311:502",
    height: 717,
    layerSummary: "sectionG: image group rasterized",
    left: 0,
    name: "sectionG",
    src: "2311-502.png",
    top: 7494,
    width: 1280,
  },
  {
    figmaId: "2311:506",
    height: 717,
    layerSummary: "sectionH: image group rasterized",
    left: 0,
    name: "sectionH",
    src: "2311-506.png",
    top: 8211,
    width: 1280,
  },
];

function BrandSection({
  height,
  layerSummary,
  left,
  name,
  src,
  figmaId,
  top,
  width,
}: {
  figmaId: string;
  height: number;
  layerSummary: string;
  left: number;
  name: string;
  src: string;
  top: number;
  width: number;
}) {
  if (name === "sectionA") {
    return (
      <section
        className="ai-brand-section ai-brand-section-a"
        data-figma-node-id={figmaId}
        data-layer-summary={layerSummary}
        data-section-name={name}
        style={{ height, left, top, width }}
      >
        <p className="brand-layer brand-title-num" data-figma-node-id="2311:370">1</p>
        <p className="brand-layer brand-title-main" data-figma-node-id="2311:371">策略和洞察</p>
        <span className="brand-layer brand-icon-right brand-title-icon" data-figma-node-id="2311:373" />
        <p className="brand-layer brand-title-step" data-figma-node-id="2311:372">STEP 1&nbsp;&nbsp;&nbsp;用户洞察</p>

        <p className="brand-layer brand-section-label brand-analysis-label" data-figma-node-id="2311:389">现有品牌分析</p>
        <img className="brand-layer brand-chart" src={brandLayerAsset("2311-390.png")} alt="" data-figma-node-id="2311:390" draggable={false} />
        <span className="brand-layer brand-icon-down" data-figma-node-id="2311:391" />

        <p className="brand-layer brand-section-label brand-position-label" data-figma-node-id="2311:395">品牌定位</p>
        <p className="brand-layer brand-position-copy" data-figma-node-id="2311:396">
          "非社交型"打工人情绪缓冲咖啡空间。区别于星巴克的"第三空间"（社交导向）和Manner的"快取效率”，OK Coffee 明确定位于"反社交"的独处 sanctuary。
          {"\n\n"}核心主张：用一杯不催促、不打扰的温柔，承接住所有"好的""ok"背后，那个想发呆、想放空、想暂时"已读不回"的你。
          {"\n\n"}• 不卖空间社交，卖情绪隔离
          {"\n"}• 不追求翻台率，追求停留的正当性
          {"\n"}• 不是"来聊聊"，是"来缓缓"
        </p>

        <p className="brand-layer brand-section-label brand-intro-label" data-figma-node-id="2311:400">品牌简介</p>
        <div className="brand-layer brand-intro-bg" data-figma-node-id="2311:398" />
        <div className="brand-layer brand-intro-line" data-figma-node-id="2311:399" />
        <p className="brand-layer brand-intro-copy" data-figma-node-id="2311:401">“OK”Coffee，是打工人在无数句"收到"之后，给自己按下的一枚暂停键——不用社交、不用营业，让没说出口的累，在一杯咖啡的时间稍得缓冲。</p>

        <p className="brand-layer brand-section-label brand-slogan-label" data-figma-node-id="2311:403">品牌Slogan</p>
        <p className="brand-layer brand-slogan-copy" data-figma-node-id="2311:404">累了，丧了，不想干了，都OK</p>

        <p className="brand-layer brand-section-label brand-keyword-label" data-figma-node-id="2311:375">品牌关键词</p>
        <div className="brand-layer brand-keyword brand-keyword-1" data-figma-node-id="2311:376"><span>情绪</span></div>
        <div className="brand-layer brand-keyword brand-keyword-2" data-figma-node-id="2311:379"><span>共鸣</span></div>
        <div className="brand-layer brand-keyword brand-keyword-3" data-figma-node-id="2311:382"><span>松弛</span></div>
        <p className="brand-layer brand-keyword-copy brand-keyword-copy-1" data-figma-node-id="2311:386">用一杯不催促、不打扰的温柔，承接住"好的""ok"背后，那个想发呆、暂时"已读不回"的你</p>
        <p className="brand-layer brand-keyword-copy brand-keyword-copy-2" data-figma-node-id="2311:385">品牌元素延展源自打工人最熟悉的职场场景，结合热梗，引发消费者的共鸣</p>
        <p className="brand-layer brand-keyword-copy brand-keyword-copy-3" data-figma-node-id="2311:387">品牌像一条未发送的微信——所有人都懂，但不必说出口，传递一种"随便吧，先活着"的松弛</p>
      </section>
    );
  }

  if (name === "sectionB") {
    return (
      <section
        className="ai-brand-section ai-brand-section-b"
        data-figma-node-id={figmaId}
        data-layer-summary={layerSummary}
        data-section-name={name}
        style={{ height, left, top, width }}
      >
        <span className="brand-layer brand-icon-right brand-visual-title-icon" data-figma-node-id="2311:422" />
        <p className="brand-layer brand-visual-step" data-figma-node-id="2311:421">STEP 2&nbsp;&nbsp;&nbsp;确定视觉体系</p>

        <div className="brand-layer brand-color-block brand-color-blue" data-figma-node-id="2311:407"><span>#BBD7EC</span></div>
        <div className="brand-layer brand-color-block brand-color-brown" data-figma-node-id="2311:410"><span>#4C2B08</span></div>
        <div className="brand-layer brand-color-block brand-color-cream" data-figma-node-id="2311:413"><span>#F4F3C3</span></div>

        <p className="brand-layer brand-section-label brand-color-label" data-figma-node-id="2311:415">品牌主题色</p>
        <p className="brand-layer brand-color-copy" data-figma-node-id="2311:420">
          品牌色彩搭配融合了雾霾蓝、温柔的奶油黄和丰富的咖啡豆原色，雾霾蓝像周一早上窗外的天，灰蒙蒙的，但还能看，呼应打工人疲惫、略丧的心情。奶油黄是咖啡注入的充能能量，温柔接住打工人的情绪缓冲。
          {"\n"}品牌灵感源自打工人最熟悉的职场日常——“好的”“ok”“收到”。这不是敷衍，而是当代职场人每天重复数十次的生存暗号。品牌本身即是一种情绪共鸣符号：当你走进OK Coffee，意味着你终于可以对工作群说一次"ok，但先让我喝完这杯”，在忙碌之余获得片刻缓冲。正如品牌色在冷静距离感与柔和的宁静之间取得平衡。
        </p>

        <img className="brand-layer brand-real-cup" src={brandLayerAsset("2311-416.png")} alt="" data-figma-node-id="2311:416" draggable={false} />
      </section>
    );
  }

  if (name === "sectionC") {
    return (
      <section
        className="ai-brand-section ai-brand-section-c"
        data-figma-node-id={figmaId}
        data-layer-summary={layerSummary}
        data-section-name={name}
        style={{ height, left, top, width }}
      >
        <p className="brand-layer brand-exec-num" data-figma-node-id="2311:425">2</p>
        <p className="brand-layer brand-exec-title" data-figma-node-id="2311:426">执行与创意</p>
        <span className="brand-layer brand-icon-right brand-exec-icon" data-figma-node-id="2311:428" />
        <p className="brand-layer brand-exec-step-title" data-figma-node-id="2311:427">主产品设计</p>

        <div className="brand-layer brand-step-card brand-step-card-1" data-figma-node-id="2311:430">
          <div className="brand-step-tab brand-step-tab-1" data-figma-node-id="2311:432">· STEP 1：灵感溯源</div>
          <p className="brand-prompt-copy brand-prompt-copy-1" data-figma-node-id="2311:439">生成一个拿着咖啡杯的卡通人物上半身形象，人物手势呈现“ok”的姿势，表情特色体现出一种平淡的感觉，扁平插画风格，不需要添加过多细节…</p>
          <img className="brand-step-image brand-step-image-1" src={brandLayerAsset("2311-434.png")} alt="" data-figma-node-id="2311:434" draggable={false} />
          <p className="brand-step-desc brand-step-desc-1" data-figma-node-id="2311:440"><strong>处理内容：</strong>生成符合品牌调性的LOGO基础形态，导入ILLUSTRATOR中进行细化调整。</p>
          <p className="brand-step-tool brand-step-tool-1" data-figma-node-id="2311:441"><strong>应用工具：</strong>CHATGPT+ILLUSTRATOR</p>
        </div>

        <div className="brand-layer brand-step-card brand-step-card-2" data-figma-node-id="2311:442">
          <div className="brand-step-tab brand-step-tab-2" data-figma-node-id="2311:445">· STEP 2：形象延展</div>
          <img className="brand-step-image brand-step-image-2" src={brandLayerAsset("2311-450.png")} alt="" data-figma-node-id="2311:450" draggable={false} />
          <div className="brand-step-prompt-bg" data-figma-node-id="2311:448" />
          <p className="brand-prompt-copy brand-prompt-copy-2" data-figma-node-id="2311:452">整体采用手绘蜡笔质感，带有颗粒纹理和不均匀填色叠加印刷噪点，模拟risograph印刷，轻微错位效果，边缘略微抖动，线条圆润均匀，具有童趣粗糙手绘感和稚拙风格…</p>
          <img className="brand-step-image brand-step-image-3" src={brandLayerAsset("2311-449.png")} alt="" data-figma-node-id="2311:449" draggable={false} />
          <img className="brand-step-image brand-step-image-4" src={brandLayerAsset("2311-451.png")} alt="" data-figma-node-id="2311:451" draggable={false} />
          <p className="brand-step-desc brand-step-desc-2" data-figma-node-id="2311:447"><strong>处理内容：</strong>生成品牌LOGO形象延展，导入AI中进行细化调整，统一图片质感和尺寸。</p>
          <p className="brand-step-tool brand-step-tool-2" data-figma-node-id="2311:443"><strong>应用工具：</strong>CHATGPT+ILLUSTRATOR</p>
        </div>

        <div className="brand-layer brand-step-card brand-step-card-3" data-figma-node-id="2311:453">
          <div className="brand-step-tab brand-step-tab-3" data-figma-node-id="2311:456">· STEP3：平面转真实产品图</div>
          <img className="brand-step-image brand-step-image-5" src={brandLayerAsset("2311-460.png")} alt="" data-figma-node-id="2311:460" draggable={false} />
          <img className="brand-step-image brand-step-image-6" src={brandLayerAsset("2311-459.png")} alt="" data-figma-node-id="2311:459" draggable={false} />
          <p className="brand-step-desc brand-step-desc-3" data-figma-node-id="2311:458"><strong>处理内容：</strong>提示词生成真实商业产品摄影图，PHOTOSHOP处理细节</p>
          <p className="brand-step-tool brand-step-tool-3" data-figma-node-id="2311:455"><strong>应用工具：</strong>CHATGPT+即梦+PHOTOSHOP</p>
        </div>

        <img className="brand-layer brand-logo-image" src={brandLayerAsset("2311-461.png")} alt="" data-figma-node-id="2311:461" draggable={false} />
        <span className="brand-layer brand-icon-down brand-step-down" data-figma-node-id="2311:462" />
        <img className="brand-layer brand-product-cup" src={brandLayerAsset("2311-465.png")} alt="" data-figma-node-id="2311:465" draggable={false} />
        <img className="brand-layer brand-product-paper" src={brandLayerAsset("2311-466.png")} alt="" data-figma-node-id="2311:466" draggable={false} />
        <img className="brand-layer brand-product-bag" src={brandLayerAsset("2311-467.png")} alt="" data-figma-node-id="2311:467" draggable={false} />
      </section>
    );
  }

  if (name === "sectionD") {
    return (
      <section
        className="ai-brand-section ai-brand-section-d"
        data-figma-node-id={figmaId}
        data-layer-summary={layerSummary}
        data-section-name={name}
        style={{ height, left, top, width }}
      >
        <img className="brand-layer brand-scene-cups" src={brandLayerAsset("2311-469.png")} alt="" data-figma-node-id="2311:469" draggable={false} />
        <img className="brand-layer brand-scene-run" src={brandLayerAsset("2311-472.png")} alt="" data-figma-node-id="2311:472" draggable={false} />
        <span className="brand-layer brand-icon-right brand-scene-icon" data-figma-node-id="2311:495" />
        <p className="brand-layer brand-scene-label" data-figma-node-id="2311:494">场景应用</p>
      </section>
    );
  }

  return (
    <section
      className="ai-brand-section"
      data-figma-node-id={figmaId}
      data-layer-summary={layerSummary}
      data-section-name={name}
      style={{ height, left, top, width }}
    >
      <img className="ai-brand-section-image" src={brandFullAsset(src)} alt="" draggable={false} loading="lazy" />
    </section>
  );
}

export function AIBrandDetailBoard() {
  return (
    <article className="ai-brand-board" aria-label="AI/运营3-3">
      <section className="ai-brand-hero" aria-label="AI/运营3-3">
        <img className="ai-brand-hero-bg" src="/assets/bg-pic.gif" alt="" draggable={false} />
      </section>

      <section className="ai-brand-long-page" aria-label="AI/运营3-3">
        {brandSections.map((section) => (
          <BrandSection key={section.figmaId} {...section} />
        ))}
      </section>
    </article>
  );
}
