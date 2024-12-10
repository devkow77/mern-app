import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { Header, Footer, ThemeProvider } from "./components/index";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <BrowserRouter>
      <Header />
      <App />
      <Footer />
    </BrowserRouter>
  </ThemeProvider>,
);
