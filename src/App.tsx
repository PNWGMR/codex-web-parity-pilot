import type { ReactElement } from "react";
import { calculateGatePassRate, countTasksByState, factoryRun, type GateRecord } from "./data/factoryRun";

function formatGateStatus(gate: GateRecord): string {
  return `${gate.passed}/${gate.total} ${gate.status}`;
}

export function App(): ReactElement {
  const passRate: number = calculateGatePassRate(factoryRun);
  const readyTasks: number = countTasksByState(factoryRun, "ready");
  const runningTasks: number = countTasksByState(factoryRun, "running");
  const blockedTasks: number = countTasksByState(factoryRun, "blocked");

  return (
    <main className="console-shell">
      <section className="run-rail" aria-label="Run command rail">
        <div>
          <p className="eyebrow">SprintPulse Web Console</p>
          <h1>Factory run monitor</h1>
          <p className="run-id">{factoryRun.runId}</p>
        </div>
        <dl className="run-stats">
          <div>
            <dt>Stage</dt>
            <dd>{factoryRun.stage}</dd>
          </div>
          <div>
            <dt>Elapsed</dt>
            <dd>{factoryRun.elapsed}</dd>
          </div>
          <div>
            <dt>Public route</dt>
            <dd>HTTPS pending verification</dd>
          </div>
        </dl>
      </section>

      <section className="score-grid" aria-label="Quality scoreboard">
        <article>
          <span className="metric">{passRate}%</span>
          <span>gate pass rate</span>
        </article>
        <article>
          <span className="metric">{readyTasks}</span>
          <span>ready task</span>
        </article>
        <article>
          <span className="metric">{runningTasks}</span>
          <span>running task</span>
        </article>
        <article>
          <span className="metric">{blockedTasks}</span>
          <span>blocked item</span>
        </article>
      </section>

      <section className="content-grid">
        <section className="panel task-board" aria-label="Task dependency board">
          <div className="panel-header">
            <h2>Task dependency board</h2>
            <span className="badge">5 tracked</span>
          </div>
          <div className="task-list">
            {factoryRun.tasks.map((task) => (
              <article className={`task-card state-${task.state}`} key={task.id}>
                <div>
                  <strong>{task.id}</strong>
                  <h3>{task.title}</h3>
                </div>
                <p>{task.dependencies.length === 0 ? "No dependencies" : `Depends on ${task.dependencies.join(", ")}`}</p>
                <p>Gates: {task.gates.join(", ")}</p>
                <span className="status-chip">{task.state}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="panel" aria-label="Gate evidence">
          <div className="panel-header">
            <h2>Gate evidence</h2>
            <span className="badge">CI aligned</span>
          </div>
          <div className="gate-list">
            {factoryRun.gates.map((gate) => (
              <div className="gate-row" key={gate.name}>
                <span>{gate.name}</span>
                <strong>{formatGateStatus(gate)}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="panel" aria-label="Artifact review panel">
          <div className="panel-header">
            <h2>Artifact review</h2>
            <span className="badge">Codex route</span>
          </div>
          <ul className="artifact-list">
            {factoryRun.artifacts.map((artifact) => (
              <li key={artifact.name}>
                <strong>{artifact.name}</strong>
                <span>{artifact.status}</span>
                <p>{artifact.detail}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="panel intervention-panel" aria-label="Intervention queue">
          <div className="panel-header">
            <h2>Intervention queue</h2>
            <span className="badge">3 open</span>
          </div>
          {factoryRun.interventions.map((intervention) => (
            <article className={`intervention severity-${intervention.severity}`} key={intervention.id}>
              <strong>{intervention.id}: {intervention.summary}</strong>
              <p>{intervention.nextAction}</p>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}
