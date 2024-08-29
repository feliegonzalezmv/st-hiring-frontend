import { useQuery } from "react-query";
import { fetchSettings } from "../services/settingsServices";

export const useSettings = (id: string) => {
  return useQuery(["settings", id], () => fetchSettings(id));
};
