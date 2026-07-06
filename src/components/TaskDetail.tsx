import type { ReactElement } from "react";
import type { FactoryRun, TaskRecord } from "../data/factoryRun";

type TaskDetailProps = {
  readonly run: FactoryRun;
  readonly task: TaskRecord;
};

export function TaskDetail({ run, task }: TaskDetailProps): ReactElement {
  const dependencies: readonly TaskRecord[] = task.dependencies
    .map((dependencyId: string): TaskRecord | undefined => run.tasks.find((candidate: TaskRecord): boolean => candidate.id === dependencyId))
    .filter((dependency): dependency is TaskRecord => dependency !== undefined);

  return (
    <section className="panel task-detail" aria-label="Selected task detail">
      <div className="panel-header">
        <div>
          <p className="panel-kicker">Task detail</p>
          <h2>{task.id}</h2>
        </div>
        <span className="status-chip">State: {task.state}</span>
      </div>

      <h3>{task.title}</h3>
      <dl className="detail-grid">
        <div>
          <dt>Owner</dt>
          <dd>{task.owner}</dd>
        </div>
        <div>
          <dt>Dependency count</dt>
          <dd>{task.dependencies.length}</dd>
        </div>
      </dl>

      <div className="detail-stack">
        <div>
          <strong>Dependencies</strong>
          {dependencies.length === 0 ? (
            <p>No upstream dependencies.</p>
          ) : (
            <ul>
              {dependencies.map((dependency: TaskRecord) => (
                <li key={dependency.id}>
                  {dependency.id}: {dependency.title} ({dependency.state})
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <strong>Gates</strong>
          <ul>
            {task.gates.map((gate: string) => (
              <li key={gate}>{gate}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
