import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import LandingPage from "./LandingPage";
import MainApp from "./MainApp";

function Router() {
    const { user, loading } = useAuth();
    const [view, setView] = useState("landing"); 

    if (loading) {
        return (
            <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
                <div style={{ width: 42, height: 42, border: "3px solid var(--sky)", borderTopColor: "var(--blue)", borderRadius: "50%", animation: "spin .7s linear infinite" }} />
                <div style={{ fontSize: ".85rem", color: "var(--muted)", fontWeight: 600 }}>Loading ViviGrow…</div>
            </div>
        );
    }

    if (!user) {
        if (view === "login") return <LoginPage onGoSignup={() => setView("signup")} onGoBack={() => setView("landing")} />;
        if (view === "signup") return <SignupPage onGoLogin={() => setView("login")} onGoBack={() => setView("landing")} />;
        return <LandingPage onGoLogin={() => setView("login")} onGoSignup={() => setView("signup")} />;
    }

    return <MainApp />;
}

export default Router;
