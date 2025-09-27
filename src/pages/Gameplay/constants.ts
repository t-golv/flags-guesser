import type { Flag } from "./types";
import flags from "../../assets/flags.json";

export const FLAGS: Flag[] = flags;

export function randomFlag(): Flag {
  return FLAGS[Math.floor(Math.random() * FLAGS.length)];
}
