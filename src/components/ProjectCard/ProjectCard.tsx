type ProjectCardProps = {
  title: string;
  intro: string;
  tag: string;
};

export function ProjectCard({ title, intro, tag }: ProjectCardProps) {
  return (
    <article className="project-card handdrawn-card section-enter">
      <span>{tag}</span>
      <h3>{title}</h3>
      <p>{intro}</p>
    </article>
  );
}
