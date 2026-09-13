const asset = (name: string) => `/assets/sketch-product/source-assets/${name}`;

const strategyOneRows = [
  ["视觉风格", "实验室美学 + 微距细节图"],
  ["主色调", "以米白/浅灰为底（实验室纯净感），辅以成分原料色作为高亮色（呼应自然+科学的融合）"],
  ["构图逻辑", "\"分子式+产品\"双轴构图，形成\"产品即科学\"的视觉等式"],
  [
    "信息层级",
    "第一视觉锚点：产品名称 + 核心成分浓度（如 \"5% Squalane\" 用大字号无衬线体突出）；第二层级：成分功能 icon；第三层级：INCI 精简列表",
  ],
  ["图形元素", "成分分子简图（如原料切片图、微距摄影图）\n特写产品质感细节"],
  ["产品呈现", "产品瓶身以45°倾斜拍摄，光线为柔和的漫射光"],
  ["关键词", "透明、理性、可验证、分子美学"],
];

const strategyTwoRows = [
  ["视觉风格", "北欧极简主义 + 侘寂美学"],
  ["主色调", "单色系渐变（如从浅米灰到白的过渡），场景不喧宾夺主，产品成为唯一视觉焦点"],
  [
    "场景构建",
    "产品基础布景搭建：\n产品按四步使用顺序排列（清洁→爽肤→精华→面霜），间距均匀，形成视觉韵律\n基础置物底座，保持背景的干净、清爽\n背景为素色渐变，可能有一道自然光斜射入，形成柔和的阴影",
  ],
  ["构图逻辑", "“一字型水平构图”或“黄金分割点构图”：产品不满屏，适当留白，传递“空间感=呼吸感=精简感”"],
  ["光影处理", "自然光为主，侧逆光勾勒产品轮廓，强调简单但不廉价的哑光包装质感；避免闪光灯的硬光，追求“清晨第一缕光”的温柔感"],
  ["道具选择", "天然材质：亚克力、银色金属、玻璃\n拒绝：塑料感道具、过多装饰、鲜艳花卉"],
  ["产品呈现", "产品标签尽可能面朝镜头，但不刻意摆正，略带一点自然的倾斜，呼应“Come As You Are”的不完美哲学"],
  ["关键词", "留白、呼吸感、仪式、自然材质、不完美的完美"],
];

const strategyThreeRows = [
  ["视觉风格", "德式精密×自然纯净，以材质层次的细腻对比与纯净光影，在嘈杂的社媒环境中形成“视觉降噪区”"],
  ["主色调", "燕麦白/石灰白为基底，搭配原木色（橡木/桦木）与亚麻灰，营造“未经修饰的纯净”"],
  ["构图逻辑", "“中心对称 + 非对称介质环绕”：产品直立居中，占画面高度约55%-60%，形成稳定的视觉锚点，周围环绕装饰要素，呈非对称分布"],
  ["质感表达", "“透明 × 哑光”的材质对话：构成“纯净的可视化证据”\n辅助材质：微水泥/洞石台面、白色花瓣，与产品形成触觉通感"],
  ["光影处理", "柔和侧逆光 + 漫射光为主"],
  ["焦点策略", "“标签可读性优先 + 质地可视化”双焦点，形成“产品→内容物→肌肤体验”的直接关联叙事。"],
  ["关键词", "哑光精密、暖白呼吸、材质对话、侧逆光晕、流动质地"],
];

function InfoTable({ rows }: { rows: string[][] }) {
  return (
    <div className="ai-board-table">
      {rows.map(([label, value]) => (
        <div className="ai-board-table-row" key={label}>
          <strong>{label}</strong>
          <p>{value}</p>
        </div>
      ))}
    </div>
  );
}

function StrategyCallout({ title, children }: { title: string; children: string }) {
  return (
    <section className="ai-board-callout">
      <div className="ai-board-callout-line" />
      <div>
        <h4>{title}</h4>
        <p>{children}</p>
      </div>
    </section>
  );
}

export function AIProductDetailBoard() {
  return (
    <article className="ai-product-board" aria-label="coa:ya 运营视觉策略重构">
      <header className="ai-product-board-hero">
        <img src={asset("top-bg.png")} alt="" aria-hidden="true" />
        <p className="ai-board-logo">coa:ya</p>
        <h1>运营视觉策略重构</h1>
      </header>

      <main className="ai-product-board-content">
        <section className="ai-board-section ai-board-section-one">
          <div className="ai-board-section-title">
            <span>1</span>
            <h2>洞察和分析</h2>
          </div>

          <h3>品牌定位</h3>
          <div className="ai-board-highlight">
            <p>
              柏林高端极简护肤品牌 —— 将德国实验室的临床级研发与极简护肤仪式结合，主打“少即是多，但绝不更简单”（Keep it simple, but not simpler）的护肤哲学。区别于传统奢侈护肤的“神秘感营销”与平价护肤的“堆砌成分”，Co:aya 以透明浓度标注+短INCI配方+多功能叠加建立差异化壁垒。
            </p>
          </div>

          <h3>品牌Slogan</h3>
          <p>“Come As You Are”，旨在传递“每一寸肌肤都独一无二，值得量身定制护理”的理念。在中国市场的延伸表达聚焦为：“精简，但有效”或“成分说真话”。</p>

          <h3>品牌理念</h3>
          <p className="ai-board-bullet-copy">
            • 剔除冗余，重塑肌理，升华本质：四步仪式（清洁→爽肤→精华→面霜）替代12步繁琐流程<br />
            • 透明即信任：明确标注活性成分浓度，打破奢侈品牌“不透明”惯例<br />
            • 科学不喧哗：以临床数据为支撑，不追逐成分潮流，只选用经证实的有效配方<br />
            • 可持续责任：纯素配方、无微塑料/硅油、可回收纸质包装、气候中性生产
          </p>

          <h3>营销策略分析</h3>
          <p className="ai-board-bullet-copy">
            • 内容策略：从“感觉和审美”转向“效果和科学”，强调成分、浓度、配方逻辑、解决什么问题<br />
            • 信息流优化：CTR从4%提升至8%，通过智能创意-标题优选功能提升点击<br />
            • KOL/KOC布局：以“成分专研”“德系小众”为标签，吸引护肤成分党博主测评
          </p>
        </section>

        <section className="ai-board-section">
          <div className="ai-board-section-title">
            <span>2</span>
            <h2>设计与重构</h2>
          </div>

          <h3>社媒传播设计策略</h3>
          <StrategyCallout title="策略（一）“成分”产品海报">
            传播目标：建立“成分党信任状”，用视觉语言翻译复杂的科学配方，让消费者一眼读懂“这瓶里有什么、有多少、能干什么”
          </StrategyCallout>
          <InfoTable rows={strategyOneRows} />

          <div className="ai-board-ingredient-layout">
            <img className="ai-board-down-icon" src={asset("icon-down.svg")} alt="" aria-hidden="true" />
            <div className="ai-board-ingredient-grid">
              <img src={asset("成分1.png")} alt="成分图1" />
              <img src={asset("成分2.png")} alt="成分图2" />
              <img src={asset("成分3.png")} alt="成分图3" />
              <img src={asset("成分4.png")} alt="成分图4" />
            </div>
            <img className="ai-board-note-icon" src={asset("icon-right.svg")} alt="" aria-hidden="true" />
            <p className="ai-board-side-note">
              借助AI对品牌定位与设计策略的拆解，确定“分子美学+质地特写表现”的设计方向。运用 CHATGPT+豆包完成“成分”产品海报风格优化，快速实现设计重点的转向。
            </p>
            <img className="ai-board-citrus ai-board-citrus-1" src={asset("成分5.png")} alt="成分图5" />
            <img className="ai-board-citrus ai-board-citrus-2" src={asset("成分6.png")} alt="成分图6" />
          </div>

          <StrategyCallout title="策略（二）“精简、纯净”产品场景图">
            传播目标：传递“少即是多”的生活方式美学，将四步护肤仪式转化为一种视觉上的呼吸感，让消费者感受到“精简不是将就，是更高级的选择”。
          </StrategyCallout>
          <InfoTable rows={strategyTwoRows} />

          <div className="ai-board-scene-layout">
            <img className="ai-board-scene-copy-icon" src={asset("icon-right.svg")} alt="" aria-hidden="true" />
            <p className="ai-board-scene-copy">
              场景图侧重氛围感与生活化共鸣，需突出产品类别与使用场景，据此搭建包含“场景构建、产品呈现、构图逻辑…”的AI生成参数框架，运用CHATGPT+LOVART实现场景图的批量高效替换、生成。
            </p>
            <img className="scene scene-1" src={asset("场景1-1.png")} alt="场景图1" />
            <img className="scene scene-2" src={asset("场景1-2.png")} alt="场景图2" />
            <img className="scene scene-3" src={asset("场景2-1.png")} alt="场景图3" />
            <img className="scene scene-4" src={asset("场景2-2.png")} alt="场景图4" />
            <img className="scene scene-5" src={asset("场景3-1.png")} alt="场景图5" />
            <img className="scene scene-6" src={asset("场景3-2.png")} alt="场景图6" />
            <img className="scene scene-7" src={asset("场景图4-1.png")} alt="场景图7" />
            <img className="scene scene-8" src={asset("场景图4-2.png")} alt="场景图8" />
            <img className="ai-board-product" src={asset("产品.png")} alt="产品图" />
            <span className="prompt prompt-left">+<br />提示词<br />=</span>
            <span className="prompt prompt-right">+提示词=</span>
            <span className="prompt prompt-bottom">+提示词=</span>
          </div>

          <StrategyCallout title="策略（三）“质感、视觉焦点”产品主图">
            传播目标：在信息流中0.3秒抓住注意力，用强烈的质感对比与视觉焦点，传递“高端无负担”的产品价值，驱动点击与转化。
          </StrategyCallout>
          <InfoTable rows={strategyThreeRows} />

          <div className="ai-board-main-visuals">
            <img src={asset("主图1.png")} alt="主图1" />
            <img src={asset("主图2.png")} alt="主图2" />
            <img src={asset("主图3.png")} alt="主图3" />
            <img src={asset("主图4.png")} alt="主图4" />
            <img src={asset("主图5.png")} alt="主图5" />
            <img src={asset("主图6.png")} alt="主图6" />
            <img src={asset("主图7.png")} alt="主图7" />
          </div>
        </section>
      </main>
    </article>
  );
}
