import type { ReactElement } from "react";
import { calculateGatePassRate, countTasksByState, type FactoryRun, type GateRecord } from "../data/factoryRun";

type QualityPanelProps = {
  readonly run: FactoryRun;
};

function formatGateStatus(gate: GateRecord): string {
  return `${gate.passed}/${gate.total} checks ${gate.status}`;
}

export function QualityPanel({ run }: QualityPanelProps): ReactElement {
  const passRate: number = calculateGatePassRate(run);
  const readyTasks: number = countTasksByState(run, "ready");
  const runningTasks: number = countTasksByState(run, "running");
  const blockedTasks: number = countTasksByState(run, "blocked");

  return (
    <section className="panel quality-panel" aria-label="Quality scoreboard">
      <div className="panel-header">
        <div>
          <p className="panel-kicker">Quality gates</p>
          <h2>Scoreboard</h2>
        </div>
        <span className="badge">CI aligned</span>
      </div>

      <div className="score-grid">
        <article aria-label={`Gate pass rate ${passRate} percent`}>
          <span className="metric">{passRate}%</span>
          <span>gate pass rate</span>
        </article>
        <article aria-label={`${readyTasks} ready task`}>
          <span className="metric">{readyTasks}</span>
          <span>ready task</span>
        </article>
        <article aria-label={`${runningTasks} running task`}>
          <span className="metric">{runningTasks}</span>
          <span>running task</span>
        </article>
        <article aria-label={`${blockedTasks} blocked item`}>
          <span className="metric">{blockedTasks}</span>
          <span>blocked item</span>
        </article>
      </div>

      <div className="gate-list" aria-label="Gate evidence">
        {run.gates.map((gate) => (
          <div
            aria-label={`${gate.name}: ${formatGateStatus(gate)}`}
            className={`gate-row gate-${gate.status}`}
            key={gate.name}
            role="group"
          >
            <span>{gate.name}</span>
            <strong>{formatGateStatus(gate)}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
