import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";

import { store } from "./store";
import EventList from "./components/EventList";
import SettingsForm from "./components/FormSettings";

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div
            style={{
              width: "100vw",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 16,
              boxSizing: "border-box",
            }}
          >
            <nav style={{ marginBottom: 16 }}>
              <Link to="/" style={{ marginRight: 16 }}>
                Event List
              </Link>
              <Link to="/settings">Settings</Link>
            </nav>
            <h1 style={{ marginBottom: 16 }}>See Tickets</h1>
            <Routes>
              <Route path="/settings" element={<Navigate to="/settings/1" />} />
              <Route path="/" element={<EventList />} />
              <Route path="/settings/:id" element={<SettingsForm />} />
            </Routes>
          </div>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
