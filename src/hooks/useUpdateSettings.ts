import { useMutation, useQueryClient } from "react-query";
import { updateSettings } from "../services/settingsServices";

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (data: { id: string; settings: object }) =>
      updateSettings(data.id, data.settings),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["settings"]);
      },
    }
  );
};
