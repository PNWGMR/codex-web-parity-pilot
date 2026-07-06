import type { ReactElement } from "react";
import type { FactoryRun } from "../data/factoryRun";

type TaskBoardProps = {
  readonly run: FactoryRun;
};

export function TaskBoard({ run }: TaskBoardProps): ReactElement {
  return (
    <section className="panel task-board" aria-label="Task dependency board">
      <div className="panel-header">
        <div>
          <p className="panel-kicker">Task board</p>
          <h2>Dependency sequence</h2>
        </div>
        <span className="badge">{run.tasks.length} tracked</span>
      </div>
      <div className="task-list">
        {run.tasks.map((task) => (
          <article className={`task-card state-${task.state}`} key={task.id} aria-label={`${task.id} ${task.state}`}>
            <div>
              <strong>{task.id}</strong>
              <h3>{task.title}</h3>
            </div>
            <span className="status-chip">State: {task.state}</span>
            <p>{task.dependencies.length === 0 ? "Dependencies: none" : `Dependencies: ${task.dependencies.join(", ")}`}</p>
            <p>Owner: {task.owner}</p>
            <p>Gates: {task.gates.join(", ")}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
