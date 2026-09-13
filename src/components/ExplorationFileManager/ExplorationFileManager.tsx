import { ExplorationFolder } from "../ExplorationFolder/ExplorationFolder";
import { ExplorationSidebar } from "../ExplorationSidebar/ExplorationSidebar";
import type { ExplorationFolderData } from "../../data/exploration";

type ExplorationFileManagerProps = {
  folders: ExplorationFolderData[];
  onOpenGallery: (folder: ExplorationFolderData) => void;
  onCloseToContact?: () => void;
};

export function ExplorationFileManager({ folders, onOpenGallery, onCloseToContact }: ExplorationFileManagerProps) {
  return (
    <div className="explorer-window" aria-label="Personal exploration file manager">
      <div className="explorer-topbar">
        <div className="explorer-dots" aria-hidden="true">
          <span className="explorer-dot explorer-dot-red" />
          <span className="explorer-dot explorer-dot-yellow" />
          <span className="explorer-dot explorer-dot-green" />
        </div>
        <div className="explorer-controls">
          <span />
          <span />
          {onCloseToContact ? (
            <button type="button" aria-label="前往联系我" onClick={onCloseToContact} />
          ) : (
            <span />
          )}
        </div>
      </div>
      <div className="explorer-body">
        <ExplorationSidebar />
        <div className="explorer-content">
          <h2 className="explorer-title">个人探索</h2>
          <div className="explorer-spacer" aria-hidden="true" />
          <div className="explorer-folder-grid">
            {folders.map((folder, index) => (
              <div className={`explorer-folder-item explorer-folder-item-${index + 1}`} key={folder.id}>
                <ExplorationFolder
                  folder={folder}
                  index={index}
                  onOpenGallery={onOpenGallery}
                />
                <div className="explorer-folder-title">{index === 0 ? "账号笔记" : "摄影随拍"}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
