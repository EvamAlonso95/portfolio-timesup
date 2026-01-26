// utils/storage.ts
export const saveTeams = (teams: { name: string; points: number }[]) => {
  sessionStorage.setItem("teams", JSON.stringify(teams));
};

export const getTeams = (): { name: string; points: number }[] => {
  const teams = sessionStorage.getItem("teams");
  return teams ? JSON.parse(teams) : [];
};
