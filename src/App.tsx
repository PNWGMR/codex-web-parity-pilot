import { useState, type ReactElement } from "react";
import { ArtifactPanel } from "./components/ArtifactPanel";
import { InterventionQueue } from "./components/InterventionQueue";
import { QualityPanel } from "./components/QualityPanel";
import { RunOverview } from "./components/RunOverview";
import { TaskBoard } from "./components/TaskBoard";
import { TaskDetail } from "./components/TaskDetail";
import { factoryRun, findTaskById, type TaskRecord, type TaskState } from "./data/factoryRun";

export function App(): ReactElement {
  const [taskFilter, setTaskFilter] = useState<TaskState | "all">("all");
  const [selectedTaskId, setSelectedTaskId] = useState<string>("WEB-103");
  const [expandedArtifacts, setExpandedArtifacts] = useState<readonly string[]>([]);
  const [selectedInterventionId, setSelectedInterventionId] = useState<string>("INT-2");
  const selectedTask: TaskRecord = findTaskById(factoryRun, selectedTaskId) ?? factoryRun.tasks[0];

  function handleFilterChange(state: TaskState | "all"): void {
    setTaskFilter(state);
    const firstMatchingTask: TaskRecord | undefined = state === "all"
      ? factoryRun.tasks[0]
      : factoryRun.tasks.find((task: TaskRecord): boolean => task.state === state);

    if (firstMatchingTask !== undefined) {
      setSelectedTaskId(firstMatchingTask.id);
    }
  }

  function handleToggleArtifact(artifactName: string): void {
    setExpandedArtifacts((currentArtifacts: readonly string[]): readonly string[] =>
      currentArtifacts.includes(artifactName)
        ? currentArtifacts.filter((currentArtifact: string): boolean => currentArtifact !== artifactName)
        : [...currentArtifacts, artifactName]
    );
  }

  return (
    <main className="console-shell">
      <RunOverview run={factoryRun} />

      <section className="content-grid" aria-label="Operations dashboard">
        <TaskBoard
          onFilterChange={handleFilterChange}
          onSelectTask={setSelectedTaskId}
          run={factoryRun}
          selectedTaskId={selectedTask.id}
          taskFilter={taskFilter}
        />
        <TaskDetail run={factoryRun} task={selectedTask} />
        <QualityPanel run={factoryRun} />
        <ArtifactPanel artifacts={factoryRun.artifacts} expandedArtifacts={expandedArtifacts} onToggleArtifact={handleToggleArtifact} />
        <InterventionQueue
          interventions={factoryRun.interventions}
          onSelectIntervention={setSelectedInterventionId}
          selectedInterventionId={selectedInterventionId}
        />
      </section>
    </main>
  );
}
