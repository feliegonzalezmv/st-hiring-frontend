export const fetchSettings = async (id: string) => {
  const response = await fetch(`http://localhost:3000/api/settings/${id}`);
  if (!response.ok) {
    throw new Error("Error fetching settings");
  }
  return response.json();
};

export const updateSettings = async (id: string, settings: object) => {
  console.log("settings :>> ", settings, id);
  const response = await fetch(`http://localhost:3000/api/settings/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(settings),
  });
  if (!response.ok) {
    throw new Error("Error updating settings");
  }
  return response.json();
};
