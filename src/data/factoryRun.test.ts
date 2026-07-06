import { calculateGatePassRate, countTasksByState, factoryRun, filterTasksByState, findTaskById } from "./factoryRun";

describe("factory run fixture", () => {
  it("counts task state for the operations console", () => {
    expect(countTasksByState(factoryRun, "passed")).toBe(2);
    expect(countTasksByState(factoryRun, "running")).toBe(1);
    expect(countTasksByState(factoryRun, "blocked")).toBe(1);
  });

  it("calculates the gate pass rate from deterministic fixture data", () => {
    expect(calculateGatePassRate(factoryRun)).toBe(96);
  });

  it("filters tasks deterministically for the task board", () => {
    expect(filterTasksByState(factoryRun, "running").map((task) => task.id)).toEqual(["WEB-103"]);
    expect(filterTasksByState(factoryRun, "all")).toHaveLength(factoryRun.tasks.length);
  });

  it("finds the selected task detail by id", () => {
    expect(findTaskById(factoryRun, "WEB-103")?.gates).toEqual(["test", "playwright"]);
    expect(findTaskById(factoryRun, "missing")).toBeUndefined();
  });
});
