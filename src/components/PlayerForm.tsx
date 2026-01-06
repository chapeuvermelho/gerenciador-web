import { FormEvent, useState } from "react";
import type { Player, RateioType } from "../types";
import "./PlayerForm.css";

const rateioOptions: RateioType[] = [
  "Regular",
  "Patrocinado",
  "Staff",
  "Ausente"
];

interface PlayerFormProps {
  onAdd: (player: Player) => void;
}

export function PlayerForm({ onAdd }: PlayerFormProps) {
  const [name, setName] = useState("");
  const [rateio, setRateio] = useState<RateioType>("Regular");
  const [entrada, setEntrada] = useState<number>(50);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim()) {
      alert("Nome é obrigatório");
      return;
    }
    if (entrada < 0) {
      alert("Valores não podem ser negativos");
      return;
    }

    const newPlayer: Player = {
      id: crypto.randomUUID(),
      name: name.trim(),
      rateio,
      entrada,
      recompras: 0,
      addon: false
    };

    onAdd(newPlayer);
    setName("");
    setRateio("Regular");
    setEntrada(50);
  };

  return (
    <form className="player-form" onSubmit={handleSubmit}>
      <div className="field">
        <label>Nome *</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jogador"
          required
        />
      </div>

      <div className="field">
        <label>Rateio</label>
        <div className="rateio-options">
          {rateioOptions.map((option) => (
            <button
              key={option}
              type="button"
              className={`chip ${rateio === option ? "selected" : ""}`}
              onClick={() => setRateio(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="field">
        <label>Entrada (R$)</label>
        <input
          type="number"
          inputMode="decimal"
          min={0}
          step={5}
          value={entrada}
          onChange={(e) => setEntrada(Number(e.target.value))}
        />
      </div>

      <button className="primary" type="submit">
        Adicionar jogador
      </button>
    </form>
  );
}
