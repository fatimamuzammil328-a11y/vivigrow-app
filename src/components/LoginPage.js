import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function LoginPage({ onGoSignup, onGoBack }) {
    const { login } = useAuth();
    const [form, setForm] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [loading, setLoading] = useState(false);

    const set = (k, v) => { setForm((f) => ({ ...f, [k]: v })); setErrors((e) => ({ ...e, [k]: "" })); setApiError(""); };

    const validate = () => {
        const errs = {};
        if (!form.email.trim()) errs.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Enter a valid email address";
        if (!form.password) errs.password = "Password is required";
        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }
        setLoading(true);
        try {
            await new Promise((r) => setTimeout(r, 700));
            const result = await login(form);
            if (!result.ok) setApiError(result.error);
        } catch (err) {
            console.error('Login error:', err);
            setApiError('An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-right">
                <div className="auth-form-wrap">
                    <button onClick={onGoBack} className="back-home-btn">
                        <span className="bh-icon">🏠</span>
                        <span className="bh-text">Back to Home</span>
                    </button>

                    <div className="auth-header-centered">
                        <div className="auth-logo-ic-small">🌿</div>
                        <h2 className="auth-form-title">Login</h2>
                        <p className="auth-form-sub">
                            Don't have an account?{" "}
                            <a href="#signup" onClick={(e) => { e.preventDefault(); onGoSignup(); }}>Create one free →</a>
                        </p>
                    </div>

                    {apiError && (
                        <div className="auth-alert">⚠ {apiError}</div>
                    )}

                    <form onSubmit={handleSubmit} noValidate>
                        <div className="af-group">
                            <label>Email Address</label>
                            <div className="af-input-wrap">
                                <span className="af-icon">✉</span>
                                <input
                                    type="email" placeholder="you@example.com"
                                    className={errors.email ? "err" : ""}
                                    value={form.email}
                                    onChange={(e) => set("email", e.target.value)}
                                    autoComplete="email"
                                />
                            </div>
                            {errors.email && <div className="af-err">⚠ {errors.email}</div>}
                        </div>

                        <div className="af-group">
                            <label>Password</label>
                            <div className="af-input-wrap">
                                <span className="af-icon">🔒</span>
                                <input
                                    type={showPw ? "text" : "password"}
                                    placeholder="Your password"
                                    className={errors.password ? "err" : ""}
                                    value={form.password}
                                    onChange={(e) => set("password", e.target.value)}
                                    autoComplete="current-password"
                                />
                                <button type="button" className="af-toggle" onClick={() => setShowPw((v) => !v)}>
                                    {showPw ? "🙈" : "👁"}
                                </button>
                            </div>
                            {errors.password && <div className="af-err">⚠ {errors.password}</div>}
                        </div>


                        <button type="submit" className="auth-submit" disabled={loading}>
                            {loading ? <span className="auth-spinner" /> : null}
                            {loading ? "Logging in…" : "Login →"}
                        </button>
                    </form>
                 

                    <div className="auth-terms">
                        By logging in you agree to our{" "}
                        <a href="#terms" onClick={(e) => e.preventDefault()}>Terms of Service</a> and <a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a>.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
