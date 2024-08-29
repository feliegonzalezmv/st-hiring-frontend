import React from "react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";

import { store } from "./store";
import EventList from "./components/EventList";
const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <div
          style={{
            width: "100vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
            boxSizing: "border-box", // Ensure padding does not affect layout
          }}
        >
          <h1 style={{ marginBottom: 16 }}>See Tickets</h1>
          <EventList />
        </div>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
