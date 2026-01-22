export const saveTeams = (teams: string[]) => {
  sessionStorage.setItem("teams", JSON.stringify(teams));
};

export const getTeams = (): string[] => {
  const teams = sessionStorage.getItem("teams");
  return teams ? JSON.parse(teams) : [];
};
