export const fetchSettings = async () => {
  const response = await fetch("http://localhost:3000/api/settings");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const updateSettings = async (settings: unknown) => {
  console.log("settings :>> ", settings);
  const clientId = settings.clientId;
  const response = await fetch(
    `http://localhost:3000/api/settings/${clientId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(settings),
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
