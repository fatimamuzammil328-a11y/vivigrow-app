import { useState, useEffect, useRef } from "react";

function UserMenu({ user, onLogout, adminMode, onToggleAdmin }) {
    const [open, setOpen] = useState(false);
    const ref = useRef();

    useEffect(() => {
        const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const initials = user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

    return (
        <div className="user-menu" ref={ref}>
            <button className="user-avatar-btn" onClick={() => setOpen((v) => !v)}>
                <div className="avatar-circle">{initials}</div>
                <span className="avatar-name">{user.name.split(" ")[0]}</span>
                <span className="avatar-chevron">{open ? "▲" : "▼"}</span>
            </button>
            {open && (
                <div className="user-dropdown">
                    <div className="dd-header">
                        <div className="dd-name">{user.name}</div>
                        <div className="dd-email">{user.email}</div>
                    </div>
                    <button className="dd-item" onClick={() => { onToggleAdmin && onToggleAdmin(); setOpen(false); }}>
                        {adminMode ? "🛑 Exit Portal" : "⚙️ Admin Portal"}
                    </button>
                    <div className="dd-sep" />
                    <button className="dd-item danger" onClick={() => { onLogout(); setOpen(false); }}>
                        ↩ Sign Out
                    </button>
                </div>
            )}
        </div>
    );
}

export default UserMenu;
