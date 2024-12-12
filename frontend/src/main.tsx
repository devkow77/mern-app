import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { Header, Footer, ThemeProvider } from "./components/index";
import { UserContextProvider } from "./context/user-context.tsx";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <UserContextProvider>
      <BrowserRouter>
        <Header />
        <App />
        <Footer />
      </BrowserRouter>
    </UserContextProvider>
  </ThemeProvider>,
);
