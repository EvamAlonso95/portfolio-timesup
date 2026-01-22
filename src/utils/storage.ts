export const saveTeams = (teams: string[]) => {
  sessionStorage.setItem("teams", JSON.stringify(teams));
};

export const getTeams = (): string[] => {
  const teams = sessionStorage.getItem("teams");
  return teams ? JSON.parse(teams) : [];
};

export const savePoints = (points: number[]) => {
  sessionStorage.setItem("teams", JSON.stringify(points));
};

export const getPoints = (): number[] => {
  const points = sessionStorage.getItem("points");
  return points ? JSON.parse(points) : [];
};
