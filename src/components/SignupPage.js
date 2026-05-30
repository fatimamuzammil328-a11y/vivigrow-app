import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getPasswordStrength } from "../utils/passwordUtils";

function SignupPage({ onGoLogin, onGoBack }) {
    const { register } = useAuth();
    const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", confirm: "", role: "Farmer" });
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState("");
    const [loading, setLoading] = useState(false);
    const strength = getPasswordStrength(form.password);

    const set = (k, v) => { setForm((f) => ({ ...f, [k]: v })); setErrors((e) => ({ ...e, [k]: "" })); setApiError(""); };

    const validate = () => {
        const errs = {};
        if (!form.firstName.trim()) errs.firstName = "Required";
        if (!form.lastName.trim()) errs.lastName = "Required";
        if (!form.email.trim()) errs.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Enter a valid email address";
        if (!form.password) errs.password = "Password is required";
        else if (form.password.length < 8) errs.password = "Must be at least 8 characters";
        if (form.password !== form.confirm) errs.confirm = "Passwords do not match";
        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }
        setLoading(true);
        await new Promise((r) => setTimeout(r, 800));
        const result = await register({ 
            name: `${form.firstName} ${form.lastName}`, 
            email: form.email, 
            password: form.password,
            role: form.role
        });
        setLoading(false);
        if (!result.ok) setApiError(result.error);
    };

    const StrengthBar = () => (
        form.password.length > 0 ? (
            <div className="pw-strength">
                <div className="pw-bars">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className={`pw-bar${strength.level >= i ? ` s${strength.level}` : ""}`} />
                    ))}
                </div>
                <span className={`pw-label s${strength.level}`}>{strength.label} password</span>
                <div className="pw-reqs">
                    {[
                        ["length", "8+ characters"],
                        ["upper", "Uppercase letter"],
                        ["lower", "Lowercase letter"],
                        ["number", "Number"],
                    ].map(([key, label]) => (
                        <div key={key} className={`pw-req${strength.checks[key] ? " met" : ""}`}>
                            <span className="req-dot" />{label}
                        </div>
                    ))}
                </div>
            </div>
        ) : null
    );

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
                        <h2 className="auth-form-title">Create account</h2>
                        <p className="auth-form-sub">
                            Already have an account?{" "}
                            <a href="#login" onClick={(e) => { e.preventDefault(); onGoLogin(); }}>Login here →</a>
                        </p>
                    </div>

                    {apiError && (
                        <div className="auth-alert">⚠ {apiError}</div>
                    )}

                    <form onSubmit={handleSubmit} noValidate>
                        <div className="af-group">
                            <label>I am a...</label>
                            <div className="af-role-toggle">
                                {['Farmer', 'Dealer', 'Admin'].map(r => (
                                    <div 
                                        key={r} 
                                        className={`role-opt ${form.role === r ? 'selected' : ''}`}
                                        onClick={() => set("role", r)}
                                    >
                                        <span className="ro-ic">{r === 'Farmer' ? '👨‍🌾' : r === 'Dealer' ? '🤝' : '🛡️'}</span>
                                        {r}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="af-row">
                            <div className="af-group">
                                <label>First Name</label>
                                <div className="af-input-wrap">
                                    <span className="af-icon">👤</span>
                                    <input
                                        type="text"
                                        placeholder="John"
                                        className={errors.firstName ? "err" : form.firstName ? "ok" : ""}
                                        value={form.firstName}
                                        onChange={(e) => set("firstName", e.target.value)}
                                    />
                                </div>
                                {errors.firstName && <div className="af-err">{errors.firstName}</div>}
                            </div>
                            <div className="af-group">
                                <label>Last Name</label>
                                <div className="af-input-wrap">
                                    <input
                                        type="text"
                                        placeholder="Doe"
                                        className={errors.lastName ? "err" : form.lastName ? "ok" : ""}
                                        value={form.lastName}
                                        onChange={(e) => set("lastName", e.target.value)}
                                    />
                                </div>
                                {errors.lastName && <div className="af-err">{errors.lastName}</div>}
                            </div>
                        </div>

                        <div className="af-group">
                            <label>Email Address</label>
                            <div className="af-input-wrap">
                                <span className="af-icon">✉</span>
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    className={errors.email ? "err" : form.email && !errors.email ? "ok" : ""}
                                    value={form.email}
                                    onChange={(e) => set("email", e.target.value)}
                                />
                            </div>
                            {errors.email && <div className="af-err">{errors.email}</div>}
                        </div>

                        <div className="af-group">
                            <label>Password</label>
                            <div className="af-input-wrap">
                                <span className="af-icon">🔒</span>
                                <input
                                    type={"password"}
                                    placeholder="••••••••"
                                    className={errors.password ? "err" : strength.level === 3 ? "ok" : ""}
                                    value={form.password}
                                    onChange={(e) => set("password", e.target.value)}
                                />
                            </div>
                            <StrengthBar />
                        </div>

                        <div className="af-group">
                            <label>Confirm Password</label>
                            <div className="af-input-wrap">
                                <span className="af-icon">🔒</span>
                                <input
                                    type={"password"}
                                    placeholder="••••••••"
                                    className={errors.confirm ? "err" : form.confirm && !errors.confirm ? "ok" : ""}
                                    value={form.confirm}
                                    onChange={(e) => set("confirm", e.target.value)}
                                />
                            </div>
                            {errors.confirm && <div className="af-err">{errors.confirm}</div>}
                        </div>

                        <button className="auth-submit" disabled={loading}>
                            {loading ? <div className="auth-spinner" /> : "Create Account →"}
                        </button>
                    </form>

                    <div className="auth-terms">
                        By creating an account you agree to our <a href="#terms" onClick={(e) => e.preventDefault()}>Terms of Service</a> and <a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a>.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;
