import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { JobsiteProvider } from "./context/JobsiteContext";

function App() {
  return (
    <BrowserRouter>
      <JobsiteProvider>
        <AppRoutes />
      </JobsiteProvider>
    </BrowserRouter>
  );
}

export default App;
