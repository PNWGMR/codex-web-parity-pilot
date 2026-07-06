import type { ReactElement } from "react";
import { QualityPanel } from "./components/QualityPanel";
import { RunOverview } from "./components/RunOverview";
import { TaskBoard } from "./components/TaskBoard";
import { factoryRun } from "./data/factoryRun";

export function App(): ReactElement {
  return (
    <main className="console-shell">
      <RunOverview run={factoryRun} />

      <section className="content-grid" aria-label="Operations dashboard">
        <TaskBoard run={factoryRun} />
        <QualityPanel run={factoryRun} />

        <section className="panel" aria-label="Artifact status">
          <div className="panel-header">
            <div>
              <p className="panel-kicker">Artifact status</p>
              <h2>Review evidence</h2>
            </div>
            <span className="badge">{factoryRun.artifacts.length} tracked</span>
          </div>
          <ul className="artifact-list">
            {factoryRun.artifacts.map((artifact) => (
              <li key={artifact.name}>
                <strong>{artifact.name}</strong>
                <span className="status-chip">Status: {artifact.status}</span>
                <p>{artifact.detail}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="panel intervention-panel" aria-label="Intervention queue">
          <div className="panel-header">
            <div>
              <p className="panel-kicker">Intervention queue</p>
              <h2>Operator actions</h2>
            </div>
            <span className="badge">{factoryRun.interventions.length} open</span>
          </div>
          {factoryRun.interventions.map((intervention) => (
            <article className={`intervention severity-${intervention.severity}`} key={intervention.id}>
              <strong>
                {intervention.id}: {intervention.summary}
              </strong>
              <span className="status-chip">Severity: {intervention.severity}</span>
              <p>{intervention.nextAction}</p>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}
