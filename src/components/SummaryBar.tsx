import type { Config, Player, RateioType } from "../types";
import "./SummaryBar.css";

interface SummaryBarProps {
  players: Player[];
  config: Config;
}

export function SummaryBar({ players, config }: SummaryBarProps) {
  const totalEntradas = players.reduce((sum, player) => sum + player.entrada, 0);
  const totalRecompras = players.reduce((sum, player) => sum + player.recompras, 0);
  const totalAddons = players.filter((player) => player.addon).length;

  const totalArrecadado = players.reduce((sum, player) => {
    const rebuyAmount = player.recompras * config.rebuyValue;
    const addonAmount = player.addon ? config.addonValue : 0;
    return sum + player.entrada + rebuyAmount + addonAmount;
  }, 0);

  const rateioCount = players.reduce<Record<RateioType, number>>(
    (acc, player) => {
      acc[player.rateio] = (acc[player.rateio] ?? 0) + 1;
      return acc;
    },
    { Regular: 0, Patrocinado: 0, Staff: 0, Ausente: 0 }
  );

  return (
    <section className="summary-bar">
      <div className="summary-scroll">
        <div className="summary-chip">
          Entradas: <strong>R$ {totalEntradas.toFixed(2)}</strong>
        </div>
        <div className="summary-chip">
          Recompras: <strong>{totalRecompras}</strong>
        </div>
        <div className="summary-chip">
          Add-ons: <strong>{totalAddons}</strong>
        </div>
        <div className="summary-chip total">
          Arrecadado: <strong>R$ {totalArrecadado.toFixed(2)}</strong>
        </div>
        {Object.entries(rateioCount).map(([type, count]) => (
          <div key={type} className="summary-chip subtle">
            {type}: <strong>{count}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
