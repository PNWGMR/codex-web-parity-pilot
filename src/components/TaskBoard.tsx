import type { ReactElement } from "react";
import { filterTasksByState, type FactoryRun, type TaskRecord, type TaskState } from "../data/factoryRun";

type TaskBoardProps = {
  readonly run: FactoryRun;
  readonly selectedTaskId: string;
  readonly taskFilter: TaskState | "all";
  readonly onFilterChange: (state: TaskState | "all") => void;
  readonly onSelectTask: (taskId: string) => void;
};

const taskStates = ["all", "ready", "running", "blocked", "passed"] as const;

export function TaskBoard({ run, selectedTaskId, taskFilter, onFilterChange, onSelectTask }: TaskBoardProps): ReactElement {
  const visibleTasks: readonly TaskRecord[] = filterTasksByState(run, taskFilter);

  return (
    <section className="panel task-board" aria-label="Task dependency board">
      <div className="panel-header">
        <div>
          <p className="panel-kicker">Task board</p>
          <h2>Dependency sequence</h2>
        </div>
        <span className="badge">{visibleTasks.length} shown</span>
      </div>
      <div className="filter-bar" aria-label="Task state filters">
        {taskStates.map((state) => (
          <button
            aria-pressed={taskFilter === state}
            className="filter-button"
            key={state}
            onClick={() => onFilterChange(state)}
            type="button"
          >
            {state}
          </button>
        ))}
      </div>
      <div className="task-list">
        {visibleTasks.map((task: TaskRecord) => (
          <button
            aria-pressed={selectedTaskId === task.id}
            className={`task-card state-${task.state}`}
            key={task.id}
            onClick={() => onSelectTask(task.id)}
            type="button"
            aria-label={`${task.id} ${task.title}. State: ${task.state}. Dependencies: ${
              task.dependencies.length === 0 ? "none" : task.dependencies.join(", ")
            }. Owner: ${task.owner}. Gates: ${task.gates.join(", ")}`}
          >
            <div>
              <strong>{task.id}</strong>
              <h3>{task.title}</h3>
            </div>
            <span className="status-chip">State: {task.state}</span>
            <p>{task.dependencies.length === 0 ? "Dependencies: none" : `Dependencies: ${task.dependencies.join(", ")}`}</p>
            <p>Owner: {task.owner}</p>
            <p>Gates: {task.gates.join(", ")}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
