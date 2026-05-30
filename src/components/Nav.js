import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import UserMenu from "./UserMenu";

const Nav = ({ cartCount, onOpenCart, onOpenTrackOrder, onAction }) => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "#/" },
        { name: "Products", href: "#products" },
        { name: "About", href: "#about" },
        { name: "Process", href: "#process" },
        { name: "Payment Status", href: "#!", onClick: (e) => { e.preventDefault(); onOpenTrackOrder(); } },
    ];


    return (
        <>
            <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
                <div className="nav-container" style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                    <a href="#/" className="logo">
                        <div className="logo-icon">🌱</div>
                        <div className="logo-text">
                            <span className="logo-main">ViviGrow</span>
                            <span className="logo-sub">Pure Plant Nutrition</span>
                        </div>
                    </a>

                    <ul className="nav-links">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <a href={link.href} onClick={link.onClick}>{link.name}</a>
                            </li>
                        ))}
                    </ul>

                    <div className="nav-actions">

                        <div className="theme-toggle" onClick={toggleTheme}>
                            {theme === 'light' ? '🌙' : '☀️'}
                        </div>

                        <button className="nav-cart-btn" onClick={onOpenCart}>
                            <span className="cart-ic">🛒</span>
                            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                        </button>

                        {user ? (
                            <UserMenu user={user} onLogout={logout} />
                        ) : (
                            <button className="nav-cart-btn" style={{ padding: '6px 14px', borderRadius: '8px', fontSize: '0.8rem', background: 'var(--accent)', color: '#000', fontWeight: 700 }} onClick={() => onAction('Login')}>
                                Login
                            </button>
                        )}

                        <button className="mobile-toggle" onClick={() => setMobileOpen(true)}>☰</button>
                    </div>
                </div>
            </nav>

            <div className={`drawer-overlay ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen(false)} />
            <div className={`mobile-drawer ${mobileOpen ? 'open' : ''}`}>
                <button className="drawer-close" onClick={() => setMobileOpen(false)}>✕</button>
                <ul className="drawer-links">
                    {navLinks.map((link) => (
                        <li key={link.name} onClick={() => { setMobileOpen(false); if (link.onClick) link.onClick({ preventDefault: () => { } }); }}>
                            <a href={link.href}>{link.name}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Nav;
