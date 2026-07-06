export type TaskState = "ready" | "running" | "blocked" | "passed";

export type TaskRecord = {
  readonly id: string;
  readonly title: string;
  readonly state: TaskState;
  readonly dependencies: readonly string[];
  readonly gates: readonly string[];
  readonly owner: string;
};

export type GateRecord = {
  readonly name: string;
  readonly passed: number;
  readonly total: number;
  readonly status: "passed" | "running" | "blocked";
};

export type ArtifactRecord = {
  readonly name: string;
  readonly status: "ready" | "pending" | "verified";
  readonly detail: string;
};

export type InterventionRecord = {
  readonly id: string;
  readonly severity: "low" | "medium" | "high";
  readonly summary: string;
  readonly nextAction: string;
};

export type FactoryRun = {
  readonly runId: string;
  readonly stage: string;
  readonly elapsed: string;
  readonly publicUrl: string;
  readonly tasks: readonly TaskRecord[];
  readonly gates: readonly GateRecord[];
  readonly artifacts: readonly ArtifactRecord[];
  readonly interventions: readonly InterventionRecord[];
};

export const factoryRun: FactoryRun = {
  runId: "web-parity-pilot-live-001",
  stage: "Browser smoke and publish proof",
  elapsed: "42m",
  publicUrl: "https://meridian-learn.duckdns.org/codex-artifacts/web-parity-pilot-live-001/",
  tasks: [
    {
      id: "WEB-101",
      title: "Scaffold React Vite app",
      state: "passed",
      dependencies: [],
      gates: ["install", "test", "build"],
      owner: "bootstrap"
    },
    {
      id: "WEB-102",
      title: "Build operations dashboard",
      state: "passed",
      dependencies: ["WEB-101"],
      gates: ["typecheck", "build"],
      owner: "ui"
    },
    {
      id: "WEB-103",
      title: "Add task and artifact interactions",
      state: "running",
      dependencies: ["WEB-102"],
      gates: ["test", "playwright"],
      owner: "interaction"
    },
    {
      id: "WEB-104",
      title: "Polish responsive visual smoke",
      state: "ready",
      dependencies: ["WEB-103"],
      gates: ["playwright", "web-smoke"],
      owner: "quality"
    },
    {
      id: "OPS-201",
      title: "Verify public index URL",
      state: "blocked",
      dependencies: ["WEB-104"],
      gates: ["publish"],
      owner: "release"
    }
  ],
  gates: [
    { name: "Unit tests", passed: 18, total: 18, status: "passed" },
    { name: "Build", passed: 1, total: 1, status: "passed" },
    { name: "Playwright", passed: 2, total: 2, status: "running" },
    { name: "Web smoke", passed: 1, total: 2, status: "blocked" }
  ],
  artifacts: [
    {
      name: "dist bundle",
      status: "ready",
      detail: "Static Vite build ready for publication"
    },
    {
      name: "desktop screenshot",
      status: "verified",
      detail: "artifacts/web-smoke/first-screen.png"
    },
    {
      name: "mobile screenshot",
      status: "verified",
      detail: "artifacts/web-smoke/mobile-first-screen.png"
    },
    {
      name: "factory report",
      status: "pending",
      detail: "Waiting for live run completion"
    }
  ],
  interventions: [
    {
      id: "INT-1",
      severity: "medium",
      summary: "Optional GitHub MCP not authenticated",
      nextAction: "Continue with gh for PR checks; authenticate MCP before nested agents need it."
    },
    {
      id: "INT-2",
      severity: "high",
      summary: "Public artifact URL must be verified",
      nextAction: "Publish through the Codex-owned Caddy route and run URL verification."
    },
    {
      id: "INT-3",
      severity: "low",
      summary: "Mobile density should remain above the fold",
      nextAction: "Keep run state, tasks, artifacts, and intervention summary visible at 390px."
    }
  ]
};

export function countTasksByState(run: FactoryRun, state: TaskState): number {
  return run.tasks.filter((task: TaskRecord): boolean => task.state === state).length;
}

export function filterTasksByState(run: FactoryRun, state: TaskState | "all"): readonly TaskRecord[] {
  return state === "all" ? run.tasks : run.tasks.filter((task: TaskRecord): boolean => task.state === state);
}

export function selectTaskIdForFilter(run: FactoryRun, state: TaskState | "all", fallbackTaskId: string): string {
  const firstMatchingTask: TaskRecord | undefined = filterTasksByState(run, state)[0];
  return firstMatchingTask?.id ?? fallbackTaskId;
}

export function findTaskById(run: FactoryRun, taskId: string): TaskRecord | undefined {
  return run.tasks.find((task: TaskRecord): boolean => task.id === taskId);
}

export function toggleExpandedArtifact(currentArtifacts: readonly string[], artifactName: string): readonly string[] {
  return currentArtifacts.includes(artifactName)
    ? currentArtifacts.filter((currentArtifact: string): boolean => currentArtifact !== artifactName)
    : [...currentArtifacts, artifactName];
}

export function findInterventionById(run: FactoryRun, interventionId: string): InterventionRecord | undefined {
  return run.interventions.find((intervention: InterventionRecord): boolean => intervention.id === interventionId);
}

export function calculateGatePassRate(run: FactoryRun): number {
  const totals = run.gates.reduce(
    (accumulator: { passed: number; total: number }, gate: GateRecord) => ({
      passed: accumulator.passed + gate.passed,
      total: accumulator.total + gate.total
    }),
    { passed: 0, total: 0 }
  );
  return Math.round((totals.passed / totals.total) * 100);
}
