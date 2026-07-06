import type { ReactElement } from "react";
import type { FactoryRun, TaskRecord } from "../data/factoryRun";

type RunOverviewProps = {
  readonly run: FactoryRun;
};

const orderedStages = ["Scaffold", "Dashboard", "Interactions", "Smoke", "Publish"] as const;

function completedStageCount(tasks: readonly TaskRecord[]): number {
  return tasks.filter((task: TaskRecord): boolean => task.state === "passed").length;
}

export function RunOverview({ run }: RunOverviewProps): ReactElement {
  const completedStages: number = completedStageCount(run.tasks);
  const progressValue: number = Math.round((completedStages / orderedStages.length) * 100);

  return (
    <section className="run-rail" aria-label="Active run metadata">
      <div className="run-title-block">
        <p className="eyebrow">SprintPulse Web Console</p>
        <h1>Factory run monitor</h1>
        <p className="run-id">{run.runId}</p>
      </div>

      <dl className="run-stats">
        <div>
          <dt>Active stage</dt>
          <dd>{run.stage}</dd>
        </div>
        <div>
          <dt>Elapsed</dt>
          <dd>{run.elapsed}</dd>
        </div>
        <div>
          <dt>Public route</dt>
          <dd>
            <a href={run.publicUrl}>Pending verification</a>
          </dd>
        </div>
      </dl>

      <div className="stage-progress" aria-label="Stage progress">
        <div className="stage-progress-header">
          <strong>Stage progress</strong>
          <span>{completedStages} of {orderedStages.length} complete; current stage: {run.stage}</span>
        </div>
        <div
          className="progress-meter"
          role="progressbar"
          aria-label="Run stage completion"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progressValue}
        >
          <span style={{ width: `${progressValue}%` }} />
        </div>
        <ol className="stage-list" aria-label="Run stages">
          {orderedStages.map((stage: string, index: number) => {
            const status: string = index < completedStages ? "complete" : index === completedStages ? "active" : "waiting";
            return (
              <li className={`stage-item stage-${status}`} key={stage}>
                <span>{stage}</span>
                <strong>Status: {status}</strong>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
