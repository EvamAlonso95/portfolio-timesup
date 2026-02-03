// utils/storage.ts
export const saveTeams = (teams: { name: string; points: number }[]) => {
  sessionStorage.setItem("teams", JSON.stringify(teams));
};

export const getTeams = (): { name: string; points: number }[] => {
  const teams = sessionStorage.getItem("teams");
  return teams ? JSON.parse(teams) : [];
};

export const removeTeams = () => {
  sessionStorage.removeItem("teams");
};

export const savePrevGameStatus = (prevGameStatus: string) => {
  sessionStorage.setItem("prevGameStatus", JSON.stringify(prevGameStatus));
};

export const getPrevGameStatus = () => {
  const prevGameStatus = sessionStorage.getItem("prevGameStatus");
  return prevGameStatus ? JSON.parse(prevGameStatus) : "";
};

export const removePrevGameStatus = () => {
  sessionStorage.removeItem("prevGameStatus");
};
