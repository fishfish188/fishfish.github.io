import { useRef, useState } from "react";
import type { I18nCopy } from "../../data/i18n";

type ContactSectionProps = {
  copy: I18nCopy;
  isVisible: boolean;
};

export function ContactSection({ copy: _copy, isVisible }: ContactSectionProps) {
  const [copiedContact, setCopiedContact] = useState<"email" | "phone" | null>(null);
  const emailButtonRef = useRef<HTMLButtonElement | null>(null);

  const copyContact = async (type: "email" | "phone", value: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedContact(type);
    window.setTimeout(() => setCopiedContact(null), 1200);
  };

  return (
    <section className={`contact-section contact-final-section ${isVisible ? "is-visible" : ""}`} id="contact" aria-label="联系我" aria-hidden={!isVisible}>
      <div className="contact-final-frame">
        <img className="contact-window" src="/assets/figwright-contact/2229-2222.png" alt="" aria-hidden="true" />
        <div className="contact-final-folder-label contact-final-folder-notes">账号笔记</div>
        <div className="contact-final-folder-label contact-final-folder-photo">摄影随拍</div>
        <div className="contact-card" aria-label="联系我">
          <img className="contact-card-bg" src="/assets/figwright-contact/85bfdd0c50fc7df1fd0d6286e33abeb935f1684c.png" alt="" aria-hidden="true" />
          <h2>联系我</h2>
          <button
            className="contact-info-group contact-info-email"
            type="button"
            ref={emailButtonRef}
            onClick={() => copyContact("email", "monsters_y@163.com")}
          >
            <span className="contact-info-label">邮箱</span>
            <span className="contact-info-value">monsters_y@163.com</span>
            <span className={`contact-final-tip ${copiedContact === "email" ? "is-visible" : ""}`}>已复制</span>
          </button>
          <button className="contact-info-group contact-info-phone" type="button" onClick={() => copyContact("phone", "13506516670")}>
            <span className="contact-info-label">联系电话</span>
            <span className="contact-info-value">13506516670</span>
            <span className={`contact-final-tip ${copiedContact === "phone" ? "is-visible" : ""}`}>已复制</span>
          </button>
          <div className="contact-qr-code" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
