import type { ReactElement } from "react";
import type { InterventionRecord } from "../data/factoryRun";

type InterventionQueueProps = {
  readonly interventions: readonly InterventionRecord[];
  readonly selectedInterventionId: string;
  readonly onSelectIntervention: (interventionId: string) => void;
};

export function InterventionQueue({
  interventions,
  selectedInterventionId,
  onSelectIntervention
}: InterventionQueueProps): ReactElement {
  const selectedIntervention: InterventionRecord | undefined = interventions.find(
    (intervention: InterventionRecord): boolean => intervention.id === selectedInterventionId
  );

  return (
    <section className="panel intervention-panel" aria-label="Intervention queue">
      <div className="panel-header">
        <div>
          <p className="panel-kicker">Intervention queue</p>
          <h2>Operator actions</h2>
        </div>
        <span className="badge">{interventions.length} open</span>
      </div>
      {interventions.map((intervention: InterventionRecord) => {
        const isSelected: boolean = intervention.id === selectedInterventionId;

        return (
          <button
            aria-controls="intervention-recommendation"
            aria-expanded={isSelected}
            aria-pressed={isSelected}
            className={`intervention severity-${intervention.severity}`}
            key={intervention.id}
            onClick={() => onSelectIntervention(intervention.id)}
            type="button"
          >
            <strong>
              {intervention.id}: {intervention.summary}
            </strong>
            <span className="status-chip">Severity: {intervention.severity}</span>
          </button>
        );
      })}

      {selectedIntervention ? (
        <article className="intervention-detail" id="intervention-recommendation" aria-label="Intervention recommendation">
          <strong>{selectedIntervention.summary}</strong>
          <p>{selectedIntervention.nextAction}</p>
        </article>
      ) : null}
    </section>
  );
}
