export type RateioType = "Regular" | "Patrocinado" | "Staff" | "Ausente";

export interface Player {
  id: string;
  name: string;
  rateio: RateioType;
  entrada: number;
  recompras: number;
  addon: boolean;
}

export interface Config {
  rebuyValue: number;
  addonValue: number;
}
