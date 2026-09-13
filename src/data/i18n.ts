export type Locale = "zh" | "en";

export const i18n = {
  zh: {
    brand: "YUYIMIAO",
    nav: {
      home: "首页",
      about: "关于我",
      ai: "AI/运营",
      uxui: "UX/UI项目",
      exploration: "个人探索",
      contact: "联系我",
      language: "中/EN",
    },
    hero: {
      eyebrow: "welcome",
      title: "My Channel",
      primaryButton: "下载简历",
      secondaryButton: "联系我",
    },
    sections: {
      about: {
        title: "关于我",
        intro: "你好，我是 YUYIMIAO。我关注 AI 产品、UX/UI 设计、创意工具和个人探索。",
      },
      ai: {
        title: "AI/运营",
        intro: "这里会放置 AI 产品、创意工具与智能体验项目。",
      },
      uxui: {
        title: "UX/UI项目",
        intro: "这里会展示设计稿、研究过程与手绘标注式项目记录。",
      },
      exploration: {
        title: "个人探索",
        intro: "这里会收集灵感笔记、实验、文章与兴趣探索。",
      },
      contact: {
        title: "联系我",
        intro: "欢迎通过邮箱或社交媒体联系我，一起聊聊项目、设计和创意工具。",
        email: "hello@yuyimiao.com",
      },
    },
  },
  en: {
    brand: "YUYIMIAO",
    nav: {
      home: "Home",
      about: "About",
      ai: "AI/Ops",
      uxui: "UX/UI",
      exploration: "Exploration",
      contact: "Contact",
      language: "中/EN",
    },
    hero: {
      eyebrow: "welcome",
      title: "My Channel",
      primaryButton: "Download CV",
      secondaryButton: "Contact Me",
    },
    sections: {
      about: {
        title: "About Me",
        intro: "Hi, I am YUYIMIAO. I focus on AI products, UX/UI design, creative tools, and personal exploration.",
      },
      ai: {
        title: "AI/Ops",
        intro: "AI products, creative tools, and intelligent experiences will live here.",
      },
      uxui: {
        title: "UX/UI Projects",
        intro: "Design cases, research process, and hand-drawn notes will be collected here.",
      },
      exploration: {
        title: "Personal Exploration",
        intro: "A notebook for ideas, experiments, writing, and personal interests.",
      },
      contact: {
        title: "Contact",
        intro: "Reach out for projects, design conversations, and creative tools.",
        email: "hello@yuyimiao.com",
      },
    },
  },
} as const;

export type I18nCopy = (typeof i18n)[Locale];
