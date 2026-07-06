import type { ReactElement } from "react";
import type { ArtifactRecord } from "../data/factoryRun";

type ArtifactPanelProps = {
  readonly artifacts: readonly ArtifactRecord[];
  readonly expandedArtifacts: readonly string[];
  readonly onToggleArtifact: (artifactName: string) => void;
};

export function ArtifactPanel({ artifacts, expandedArtifacts, onToggleArtifact }: ArtifactPanelProps): ReactElement {
  return (
    <section className="panel" aria-label="Artifact status">
      <div className="panel-header">
        <div>
          <p className="panel-kicker">Artifact status</p>
          <h2>Review evidence</h2>
        </div>
        <span className="badge">{artifacts.length} tracked</span>
      </div>
      <ul className="artifact-list">
        {artifacts.map((artifact: ArtifactRecord) => {
          const isExpanded: boolean = expandedArtifacts.includes(artifact.name);
          const detailId: string = `artifact-${artifact.name.replace(/\s+/g, "-")}-detail`;

          return (
            <li key={artifact.name}>
              <button
                aria-controls={detailId}
                aria-expanded={isExpanded}
                className="artifact-toggle"
                onClick={() => onToggleArtifact(artifact.name)}
                type="button"
              >
                <strong>{artifact.name}</strong>
              </button>
              <span className="status-chip">Status: {artifact.status}</span>
              {isExpanded ? (
                <p id={detailId}>
                  <strong>Metadata:</strong> {artifact.detail}
                </p>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
