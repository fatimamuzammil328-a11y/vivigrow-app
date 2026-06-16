import React from 'react';

function LandingPage({ onGoLogin, onGoSignup }) {
    return (
        <div className="landing-page">
            <div className="blob b1"></div>
            <div className="blob b2"></div>

            {/* Top Bar */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '30px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100 }}>
                <div className="logo" style={{ cursor: 'default' }}>
                    <span className="logo-icon">🌿</span>
                </div>
                <div style={{ display: 'flex', gap: 15 }}>
                    <button className="btn-blue" onClick={onGoLogin} style={{ padding: '12px 28px', fontSize: '0.9rem', fontWeight: 800, borderRadius: '12px', background: 'var(--primary)', color: '#fff', border: 'none', boxShadow: '0 8px 20px rgba(27,67,50,0.2)' }}>Login</button>
                </div>
            </div>

            <div className="landing-content">
                <div className="landing-text">
                    <div className="badge" style={{ background: 'rgba(212,163,115,0.1)', color: 'var(--secondary)', border: '1px solid rgba(212,163,115,0.2)' }}>
                        <span className="badge-dot" style={{ background: 'var(--secondary)' }}></span> Official Marketing Portal
                    </div>
                    <h1 style={{ fontSize: '3.8rem', lineHeight: 1.1, marginBottom: 25 }}>
                        AgroFertilizers <br />
                        <span style={{ color: 'var(--secondary)' }}>Marketing Website</span> <br />
                        <span style={{ fontSize: '2.5rem', opacity: 0.8 }}>for ViviGrow</span>
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: '#444', marginBottom: 40, maxWidth: '550px' }}>
                        Empowering South Asian agriculture with precision soil science and data-driven fertilizer solutions. 
                        Join 12,000+ happy farmers achieving 40% higher yields.
                    </p>
                    <div className="landing-btns" style={{ display: 'flex', gap: 20 }}>
                        <button className="btn-blue" onClick={onGoSignup} style={{ padding: '18px 45px', fontSize: '1.1rem', fontWeight: 800, borderRadius: '16px', background: 'var(--primary)', color: '#fff', boxShadow: '0 10px 30px rgba(27,67,50,0.3)' }}>
                            Join the Network
                        </button>
                        <button onClick={onGoLogin} style={{ padding: '18px 30px', background: 'none', border: '2px solid var(--primary)', borderRadius: '16px', fontWeight: 700, cursor: 'pointer', color: 'var(--primary)' }}>
                            Client Login
                        </button>
                    </div>
                </div>

                <div className="landing-visual">
                    <div className="hero-img-wrap">
                        <img src="/soft_sprout.png" alt="Nature farming" className="hero-img" />
                    </div>

                    <div className="rotating-card-overlay">
                        <div className="cs-val" style={{ color: 'var(--green)', fontSize: '1.8rem' }}>+42%</div>
                        <div className="cs-lbl">Yield Increase</div>
                        <div style={{ marginTop: 12, height: 4, background: 'rgba(0,0,0,0.05)', borderRadius: 100 }}>
                            <div style={{ width: '80%', height: '100%', background: 'var(--green)', borderRadius: 100 }}></div>
                        </div>
                    </div>

                    <div className="rotating-card-overlay" style={{ bottom: 'auto', top: -20, left: 'auto', right: -20, animationDelay: '-3s' }}>
                        <div className="cs-val" style={{ color: 'var(--blue)' }}>ISO Certified</div>
                        <div className="cs-lbl">Standard Analysis</div>
                        <div style={{ marginTop: 8, display: 'flex', gap: 4 }}>
                            {[1, 2, 3, 4, 5].map(i => <span key={i} style={{ color: 'var(--harvest)', fontSize: '0.8rem' }}>★</span>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
