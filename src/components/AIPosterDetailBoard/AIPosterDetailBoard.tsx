import type { ReactNode } from "react";

const posterLayerAsset = (name: string) => `/assets/figwright-ai-poster-layers/${name}`;
const marketingAsset = (name: string) => `/assets/marketing-poster/${name}`;
const customPosterAsset = (name: string) => `/assets/marketing-poster-custom/${name}`;

function PosterArrow({ className = "", figmaId }: { className?: string; figmaId: string }) {
  return <span className={`poster-layer poster-arrow ${className}`} data-figma-node-id={figmaId} />;
}

function PosterDown({ className = "", figmaId }: { className?: string; figmaId: string }) {
  return <span className={`poster-layer poster-down ${className}`} data-figma-node-id={figmaId} />;
}

function PosterStepCard({
  children,
  className,
  figmaId,
  tab,
  tabFigmaId,
}: {
  children: ReactNode;
  className: string;
  figmaId: string;
  tab: string;
  tabFigmaId: string;
}) {
  return (
    <div className={`poster-layer poster-step-card ${className}`} data-figma-node-id={figmaId}>
      <div className="poster-step-tab" data-figma-node-id={tabFigmaId}>{tab}</div>
      {children}
    </div>
  );
}

export function AIPosterDetailBoard() {
  return (
    <article className="ai-poster-board" aria-label="AI/运营3-2">
      <img className="ai-poster-bg-pic" src="/assets/figwright-ai-poster-full/bg-pic.png" alt="" data-figma-node-id="2310:327" draggable={false} />
      <h1 className="ai-poster-hero-title" data-figma-node-id="2310:320">活动运营海报设计</h1>

      <section className="ai-poster-section poster-section-a" data-figma-node-id="2189:919" data-section-name="sectionA">
        <PosterArrow className="poster-section-title-arrow" figmaId="2149:671" />
        <p className="poster-layer poster-section-title" data-figma-node-id="2149:670">互动海报</p>

        <img className="poster-layer poster-watermelon-main" src={customPosterAsset("西瓜1-1.png")} alt="" data-figma-node-id="2149:606" draggable={false} />
        <img className="poster-layer poster-watermelon-mini-a" src={customPosterAsset("西瓜1-2.png")} alt="" data-figma-node-id="2149:615" draggable={false} />
        <img className="poster-layer poster-watermelon-mini-b" src={customPosterAsset("西瓜1-3.png")} alt="" data-figma-node-id="2149:619" draggable={false} />
        <img className="poster-layer poster-path-21" src={customPosterAsset("路径 21.svg")} alt="" data-figma-node-id="2149:640" draggable={false} />

        <div className="poster-layer poster-process-card poster-process-card-source" data-figma-node-id="2189:915">
          <p className="poster-card-title poster-card-title-source" data-figma-node-id="2149:622">素材生成</p>
          <PosterDown className="poster-card-down-source" figmaId="2149:623" />
          <img className="poster-card-image poster-prompt-one" src={posterLayerAsset("2149-639.png")} alt="" data-figma-node-id="2149:639" draggable={false} />
          <img className="poster-card-image poster-material-one" src={posterLayerAsset("2149-642.png")} alt="" data-figma-node-id="2149:642" draggable={false} />
        </div>

        <div className="poster-layer poster-process-card poster-process-card-scene" data-figma-node-id="2189:916">
          <p className="poster-card-title poster-card-title-scene" data-figma-node-id="2149:632">场景图处理</p>
          <PosterDown className="poster-card-down-scene" figmaId="2149:667" />
          <img className="poster-card-image poster-material-two" src={customPosterAsset("西瓜素材图2.png")} alt="" data-figma-node-id="2149:633" draggable={false} />
          <img className="poster-card-image poster-material-three" src={customPosterAsset("西瓜素材图3.png")} alt="" data-figma-node-id="2149:655" draggable={false} />
          <PosterArrow className="poster-card-arrow poster-card-arrow-scene-one" figmaId="2149:664" />
          <p className="poster-card-copy poster-card-copy-scene-one" data-figma-node-id="2149:663">移除场景图上原有物体</p>
          <PosterArrow className="poster-card-arrow poster-card-arrow-scene-two" figmaId="2149:666" />
          <p className="poster-card-copy poster-card-copy-scene-two" data-figma-node-id="2149:665">调整光影、色调</p>
        </div>

        <div className="poster-layer poster-process-card poster-process-card-link" data-figma-node-id="2189:917">
          <p className="poster-card-title poster-card-title-link" data-figma-node-id="2149:626">素材与场景图联结</p>
          <PosterDown className="poster-card-down-link" figmaId="2149:627" />
          <img className="poster-card-image poster-material-four" src={customPosterAsset("西瓜素材图4.png")} alt="" data-figma-node-id="2149:657" draggable={false} />
          <img className="poster-card-image poster-material-five" src={customPosterAsset("西瓜素材图5.png")} alt="" data-figma-node-id="2149:660" draggable={false} />
          <PosterArrow className="poster-card-arrow poster-card-arrow-link-one" figmaId="2149:636" />
          <p className="poster-card-copy poster-card-copy-link-one" data-figma-node-id="2149:635">将素材融入场景图</p>
          <PosterArrow className="poster-card-arrow poster-card-arrow-link-two" figmaId="2149:638" />
          <p className="poster-card-copy poster-card-copy-link-two" data-figma-node-id="2149:637">添加动效</p>
        </div>

        <p className="poster-layer poster-summer-copy" data-figma-node-id="2149:608">
          记忆中的老式夏天<br />是一口冰镇西瓜<br />是小卖部的一瓶冒泡汽水<br />是门口树荫下吱吱呀呀的旧摇椅<br />是一个安静的午后<br />风扇慢慢转动的嗡嗡声<br />和风穿过树叶的沙沙声<br />在燥热中传来一丝凉意<br /><strong>——“老式夏天”系列</strong>
        </p>
        <img className="poster-layer poster-gif poster-gif-watermelon" src={marketingAsset("西瓜.gif")} alt="" data-figma-node-id="2149:722" draggable={false} />
        <img className="poster-layer poster-gif poster-gif-shop" src={marketingAsset("小卖部.gif")} alt="" data-figma-node-id="2149:723" draggable={false} />
        <img className="poster-layer poster-gif poster-gif-chair" src={marketingAsset("摇椅.gif")} alt="" data-figma-node-id="2149:724" draggable={false} />
      </section>

      <section className="ai-poster-section poster-section-b" data-figma-node-id="2189:923" data-section-name="sectionB">
        <PosterArrow className="poster-section-title-arrow" figmaId="2149:673" />
        <p className="poster-layer poster-section-title poster-section-title-h5" data-figma-node-id="2149:672">互动H5—摇奖机</p>
        <p className="poster-layer poster-h5-copy" data-figma-node-id="2149:697"><strong>营销运用：</strong>以"即时奖励+游戏化体验"为核心的用户参与引擎，通过随机性与视觉刺激激发用户行动欲望，可用于品牌裂变拉新、留存促活、节点转化等场景。运用AI进一步分析行为数据自动优化活动策略，让"随机奖励"变成"精准触达"的高效转化工具。</p>
        <iframe
          className="poster-h5-embed"
          src="http://localhost:5188/"
          title="互动H5摇奖机"
          data-figma-node-id="2334:653"
        />

        <PosterStepCard className="poster-h5-card-source" figmaId="2189:920" tab="· STEP 1：灵感溯源" tabFigmaId="2149:684">
          <img className="poster-card-image poster-machine-one" src={posterLayerAsset("2149-704.png")} alt="" data-figma-node-id="2149:704" draggable={false} />
          <img className="poster-card-image poster-machine-two" src={posterLayerAsset("2149-705.png")} alt="" data-figma-node-id="2149:705" draggable={false} />
          <p className="poster-step-copy poster-h5-source-copy" data-figma-node-id="2149:686"><strong>处理内容：</strong>生成摇奖机造型图片，并处理多余占位图，为后续素材放置预留位置</p>
          <p className="poster-step-tool poster-h5-source-tool" data-figma-node-id="2149:688"><strong>应用工具：</strong>GEMINI+PHOTOSHOP</p>
        </PosterStepCard>

        <PosterStepCard className="poster-h5-card-material" figmaId="2189:921" tab="· STEP 2：素材处理" tabFigmaId="2149:693">
          <img className="poster-card-image poster-prompt-two-small" src={posterLayerAsset("2149-699.png")} alt="" data-figma-node-id="2149:699" draggable={false} />
          <p className="poster-step-copy poster-h5-material-copy" data-figma-node-id="2149:695"><strong>处理内容：</strong>创建素材处理skill，批量处理素材组</p>
          <p className="poster-step-tool poster-h5-material-tool" data-figma-node-id="2149:690"><strong>应用工具：</strong>CODEX+PHOTOSHOP</p>
        </PosterStepCard>

        <PosterStepCard className="poster-h5-card-motion" figmaId="2189:922" tab="· STEP3：交互动效分析" tabFigmaId="2149:701">
          <img className="poster-card-image poster-prompt-two-large" src={posterLayerAsset("2149-703.png")} alt="" data-figma-node-id="2149:703" draggable={false} />
          <p className="poster-step-copy poster-h5-motion-copy" data-figma-node-id="2149:706"><strong>处理内容：</strong>交互过程分析定义、优化互动动效</p>
          <p className="poster-step-tool poster-h5-motion-tool" data-figma-node-id="2149:708"><strong>应用工具：</strong>CHATGPT+CODEX</p>
        </PosterStepCard>
      </section>

      <section className="ai-poster-section poster-section-c" data-figma-node-id="2189:925" data-section-name="sectionC">
        <PosterArrow className="poster-section-title-arrow" figmaId="2149:675" />
        <p className="poster-layer poster-section-title" data-figma-node-id="2149:674">活动海报</p>
        <PosterStepCard className="poster-activity-card" figmaId="2189:924" tab="风格海报生成步骤拆解" tabFigmaId="2149:649">
          <p className="poster-step-copy poster-activity-step-one" data-figma-node-id="2149:648">· STEP1：选择与活动内容相关的照片</p>
          <p className="poster-step-copy poster-activity-step-two" data-figma-node-id="2149:652">· STEP2：将图片转化为稚拙手绘风格，并生成装饰元素和手写文字等</p>
          <p className="poster-step-copy poster-activity-step-three" data-figma-node-id="2149:653">· STEP3：海报整体布局与排版</p>
          <p className="poster-step-copy poster-activity-step-four" data-figma-node-id="2149:654">· STEP4：进一步做成动态海报，增加吸引力</p>
          <img className="poster-card-image poster-flower-one" src={marketingAsset("花1.png")} alt="" data-figma-node-id="2149:680" draggable={false} />
          <img className="poster-card-image poster-flower-two" src={marketingAsset("花2.png")} alt="" data-figma-node-id="2149:681" draggable={false} />
          <img className="poster-card-image poster-guide-line" src={customPosterAsset("指引线.svg")} alt="" data-figma-node-id="2149:682" draggable={false} />
        </PosterStepCard>
        <img className="poster-layer poster-gif poster-gif-flower" src={marketingAsset("插花沙龙.gif")} alt="" data-figma-node-id="2149:717" draggable={false} />
        <img className="poster-layer poster-gif poster-gif-food" src={marketingAsset("城市美食.gif")} alt="" data-figma-node-id="2149:713" draggable={false} />
      </section>

      <section className="ai-poster-section poster-section-d" data-figma-node-id="2189:926" data-section-name="sectionD">
        <PosterArrow className="poster-section-title-arrow" figmaId="2149:677" />
        <p className="poster-layer poster-section-title poster-section-title-other" data-figma-node-id="2149:676">其他主题衍生</p>
        <img className="poster-layer poster-topic poster-topic-book" src={marketingAsset("捐书日.png")} alt="" data-figma-node-id="2149:609" draggable={false} />
        <img className="poster-layer poster-topic poster-topic-fishing" src={marketingAsset("摸鱼大赛.png")} alt="" data-figma-node-id="2149:610" draggable={false} />
        <img className="poster-layer poster-topic poster-topic-music" src={marketingAsset("音乐会.png")} alt="" data-figma-node-id="2149:611" draggable={false} />
        <img className="poster-layer poster-topic poster-topic-new" src={marketingAsset("新品上市.png")} alt="" data-figma-node-id="2149:613" draggable={false} />
        <img className="poster-layer poster-topic poster-topic-city" src={marketingAsset("城市漫游计划.png")} alt="" data-figma-node-id="2149:605" draggable={false} />
        <img className="poster-layer poster-topic poster-topic-ice" src={marketingAsset("夏日吃冰.png")} alt="" data-figma-node-id="2149:612" draggable={false} />
      </section>
    </article>
  );
}
