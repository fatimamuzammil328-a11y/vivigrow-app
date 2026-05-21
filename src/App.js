import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import GlobalStyles from "./components/GlobalStyles";
import Router from "./components/Router";

export default function ViviGrow() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <GlobalStyles />
        <Router />
      </ThemeProvider>
    </AuthProvider>
  );
}
