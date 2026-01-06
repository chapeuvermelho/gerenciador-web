import { useMemo, useState } from "react";
import { EventConfig } from "./components/EventConfig";
import { PlayerCard } from "./components/PlayerCard";
import { PlayerForm } from "./components/PlayerForm";
import { SummaryBar } from "./components/SummaryBar";
import { TabNav } from "./components/TabNav";
import { usePersistentState } from "./store/usePersistentState";
import type { Config, Player } from "./types";
import "./App.css";

const STORAGE_KEY = "poker-event";

const mockPlayers: Player[] = [
  { id: "p1", name: "Ana", rateio: "Regular", entrada: 100, recompras: 1, addon: true },
  { id: "p2", name: "Bruno", rateio: "Patrocinado", entrada: 50, recompras: 0, addon: false },
  { id: "p3", name: "Carla", rateio: "Staff", entrada: 0, recompras: 2, addon: false }
];

const defaultConfig: Config = {
  rebuyValue: 100,
  addonValue: 100
};

interface EventState {
  players: Player[];
  config: Config;
}

function createInitialState(): EventState {
  return {
    players: mockPlayers,
    config: defaultConfig
  };
}

export default function App() {
  const [state, setState] = usePersistentState<EventState>(STORAGE_KEY, createInitialState());
  const [activeTab, setActiveTab] = useState<"evento" | "jogadores" | "lista">("jogadores");

  const handleAddPlayer = (player: Player) => {
    setState((prev) => ({ ...prev, players: [player, ...prev.players] }));
    setActiveTab("lista");
  };

  const handleUpdatePlayer = (id: string, updates: Partial<Player>) => {
    setState((prev) => ({
      ...prev,
      players: prev.players.map((player) => (player.id === id ? { ...player, ...updates } : player))
    }));
  };

  const handleRemovePlayer = (id: string) => {
    setState((prev) => ({ ...prev, players: prev.players.filter((player) => player.id !== id) }));
  };

  const handleConfigChange = (config: Config) => {
    setState((prev) => ({ ...prev, config }));
  };

  const handleReset = () => {
    const initial = createInitialState();
    setState(initial);
    window.localStorage.removeItem(STORAGE_KEY);
  };

  const sortedPlayers = useMemo(
    () => [...state.players].sort((a, b) => a.name.localeCompare(b.name)),
    [state.players]
  );

  return (
    <div className="app">
      <header className="topbar">
        <div>
          <p className="eyebrow">Poker Tracker</p>
          <h1>Controle do rateio</h1>
          <p className="muted">Mobile-first para registrar entradas, recompras e add-ons.</p>
        </div>
      </header>

      <TabNav active={activeTab} onChange={(tab) => setActiveTab(tab as typeof activeTab)} />

      {activeTab === "evento" && (
        <section className="section">
          <EventConfig config={state.config} onChange={handleConfigChange} onReset={handleReset} />
        </section>
      )}

      {activeTab === "jogadores" && (
        <section className="section">
          <PlayerForm onAdd={handleAddPlayer} />
        </section>
      )}

      {activeTab === "lista" && (
        <section className="section list">
          {sortedPlayers.length === 0 ? (
            <p className="muted">Adicione jogadores para começar.</p>
          ) : (
            <div className="list-grid">
              {sortedPlayers.map((player) => (
                <PlayerCard
                  key={player.id}
                  player={player}
                  config={state.config}
                  onUpdate={handleUpdatePlayer}
                  onRemove={handleRemovePlayer}
                />
              ))}
            </div>
          )}
        </section>
      )}

      <SummaryBar players={sortedPlayers} config={state.config} />
    </div>
  );
}
