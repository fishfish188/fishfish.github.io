const sidebarItems = ["home", "file", "image", "play", "music", "folder", "screen"] as const;

function SidebarIcon({ type }: { type: (typeof sidebarItems)[number] }) {
  if (type === "home") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M5 15.5 16 5l11 10.5" />
        <path d="M8.5 14v13h15V14" />
        <path d="M13 27v-8h6v8" />
      </svg>
    );
  }

  if (type === "file") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M9 5h10l5 5v17H9z" />
        <path d="M19 5v6h6" />
      </svg>
    );
  }

  if (type === "image") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <rect x="6" y="7" width="20" height="18" rx="2" />
        <circle cx="20.5" cy="12.5" r="2" />
        <path d="m8 23 6-7 4 4 3-3 5 6" />
      </svg>
    );
  }

  if (type === "play") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M10 7v18l15-9z" />
      </svg>
    );
  }

  if (type === "music") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M12 22V8l13-3v14" />
        <circle cx="9" cy="23" r="3" />
        <circle cx="22" cy="20" r="3" />
      </svg>
    );
  }

  if (type === "folder") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M5 10h9l2 3h11v13H5z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect x="6" y="8" width="20" height="14" rx="2" />
      <path d="M13 26h6" />
      <path d="M16 22v4" />
    </svg>
  );
}

export function ExplorationSidebar() {
  return (
    <aside className="explorer-sidebar" aria-hidden="true">
      {sidebarItems.map((item, index) => (
        <div className={`explorer-sidebar-row ${index === 0 ? "is-selected" : ""}`} key={item}>
          <SidebarIcon type={item} />
          <span className="explorer-wave" />
        </div>
      ))}
    </aside>
  );
}
