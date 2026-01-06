import type { Config, Player, RateioType } from "../types";
import "./PlayerCard.css";

interface PlayerCardProps {
  player: Player;
  config: Config;
  onUpdate: (id: string, updates: Partial<Player>) => void;
  onRemove: (id: string) => void;
}

const rateioColors: Record<RateioType, string> = {
  Regular: "#10b981",
  Patrocinado: "#8b5cf6",
  Staff: "#f59e0b",
  Ausente: "#ef4444"
};

export function PlayerCard({ player, config, onUpdate, onRemove }: PlayerCardProps) {
  const handleEntradaChange = (value: string) => {
    const entrada = Number(value) || 0;
    if (entrada >= 0) {
      onUpdate(player.id, { entrada });
    }
  };

  const handleRebuy = (delta: number) => {
    const next = Math.max(0, player.recompras + delta);
    onUpdate(player.id, { recompras: next });
  };

  const toggleAddon = () => {
    onUpdate(player.id, { addon: !player.addon });
  };

  const handleRateioChange = (value: RateioType) => {
    onUpdate(player.id, { rateio: value });
  };

  return (
    <div className="player-card">
      <div className="card-header">
        <div>
          <p className="name">{player.name}</p>
          <span className="badge" style={{ backgroundColor: rateioColors[player.rateio] }}>
            {player.rateio}
          </span>
        </div>
        <button className="remove" onClick={() => onRemove(player.id)} type="button">
          Remover
        </button>
      </div>

      <div className="card-grid">
        <label className="stack">
          <span>Rateio</span>
          <select
            value={player.rateio}
            onChange={(e) => handleRateioChange(e.target.value as RateioType)}
          >
            {Object.keys(rateioColors).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="stack">
          <span>Entrada</span>
          <input
            type="number"
            min={0}
            step={5}
            value={player.entrada}
            onChange={(e) => handleEntradaChange(e.target.value)}
          />
        </label>
      </div>

      <div className="card-actions">
        <div className="stack">
          <span>Recompras</span>
          <div className="counter">
            <button type="button" onClick={() => handleRebuy(-1)}>
              −
            </button>
            <span>{player.recompras}</span>
            <button type="button" onClick={() => handleRebuy(1)}>
              +
            </button>
          </div>
          <small>R$ {config.rebuyValue.toFixed(2)} cada</small>
        </div>

        <div className="stack addon">
          <span>Add-on</span>
          <button
            className={`toggle ${player.addon ? "on" : ""}`}
            type="button"
            onClick={toggleAddon}
          >
            {player.addon ? "Sim" : "Não"}
          </button>
          <small>R$ {config.addonValue.toFixed(2)}</small>
        </div>
      </div>
    </div>
  );
}
