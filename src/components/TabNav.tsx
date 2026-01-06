import "./TabNav.css";

interface TabNavProps {
  active: string;
  onChange: (tab: string) => void;
}

const tabs: { id: string; label: string }[] = [
  { id: "evento", label: "Evento" },
  { id: "jogadores", label: "Jogadores" },
  { id: "lista", label: "Lista" }
];

export function TabNav({ active, onChange }: TabNavProps) {
  return (
    <nav className="tab-nav">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`tab-btn ${active === tab.id ? "active" : ""}`}
          onClick={() => onChange(tab.id)}
          type="button"
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
