import type { Config } from "../types";
import "./EventConfig.css";

interface EventConfigProps {
  config: Config;
  onChange: (config: Config) => void;
  onReset: () => void;
}

export function EventConfig({ config, onChange, onReset }: EventConfigProps) {
  const handleChange = (field: keyof Config, value: string) => {
    const numeric = Number(value) || 0;
    if (numeric >= 0) {
      onChange({ ...config, [field]: numeric });
    }
  };

  const handleReset = () => {
    const confirmed = window.confirm("Tem certeza que deseja resetar o evento?");
    if (confirmed) onReset();
  };

  return (
    <div className="event-card">
      <header className="event-header">
        <div>
          <p className="title">Configurações do evento</p>
          <p className="subtitle">Valores opcionais usados no resumo</p>
        </div>
        <button className="ghost" type="button" onClick={handleReset}>
          Resetar evento
        </button>
      </header>

      <div className="event-grid">
        <label className="stack">
          <span>Valor da recompra</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step={5}
            value={config.rebuyValue}
            onChange={(e) => handleChange("rebuyValue", e.target.value)}
          />
        </label>

        <label className="stack">
          <span>Valor do add-on</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step={5}
            value={config.addonValue}
            onChange={(e) => handleChange("addonValue", e.target.value)}
          />
        </label>
      </div>
    </div>
  );
}
