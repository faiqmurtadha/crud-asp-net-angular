import { Player } from "./player";

export interface Position {
  id: number;
  name: string;
  displayOrder?: number;
  players?: Player;
}
