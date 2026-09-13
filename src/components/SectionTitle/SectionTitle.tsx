type SectionTitleProps = {
  title: string;
  intro: string;
};

export function SectionTitle({ title, intro }: SectionTitleProps) {
  return (
    <div className="section-title section-enter">
      <p className="section-kicker">YUYIMIAO</p>
      <h2>{title}</h2>
      <p>{intro}</p>
    </div>
  );
}
