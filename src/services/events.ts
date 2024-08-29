export const fetchEvents = async () => {
  const response = await fetch("http://localhost:3000/events");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
