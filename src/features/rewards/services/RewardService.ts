import axios from "axios";
import type { Reward } from "../types/Reward";

const API_URL = "http://localhost:3000";

export async function getAllRewards(): Promise<Reward[]> {
  try {
    const response = await axios.get<Reward[]>(`${API_URL}/rewards`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar recompensas:", error);
    return [];
  }
}

// Filtra localmente com base no nome ou descrição
export function filterRewards(rewards: Reward[], term: string): Reward[] {
  const lowerTerm = term.toLowerCase();
  return rewards.filter(
    (r) =>
      r.name.toLowerCase().includes(lowerTerm) ||
      r.description.toLowerCase().includes(lowerTerm)
  );
}

// Ordena localmente por qualquer campo do tipo Reward
export function sortRewards(
  rewards: Reward[],
  field: keyof Reward,
  direction: "asc" | "desc" = "asc"
): Reward[] {
  const sorted = [...rewards].sort((a, b) => {
    const valA = a[field];
    const valB = b[field];

    if (typeof valA === "string" && typeof valB === "string") {
      return direction === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }

    if (typeof valA === "number" && typeof valB === "number") {
      return direction === "asc" ? valA - valB : valB - valA;
    }

    return 0;
  });

  return sorted;
}
