import { calculateGatePassRate, countTasksByState, factoryRun } from "./factoryRun";

describe("factory run fixture", () => {
  it("counts task state for the operations console", () => {
    expect(countTasksByState(factoryRun, "passed")).toBe(2);
    expect(countTasksByState(factoryRun, "running")).toBe(1);
    expect(countTasksByState(factoryRun, "blocked")).toBe(1);
  });

  it("calculates the gate pass rate from deterministic fixture data", () => {
    expect(calculateGatePassRate(factoryRun)).toBe(96);
  });
});
