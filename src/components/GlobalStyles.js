const GlobalStyles = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Fraunces:ital,wght@0,700;0,900;1,600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --primary: #1b4332; /* Deep Forest Green */
      --primary-light: #2d6a4f;
      --secondary: #22c55e; /* Vibrant Leaf Green */
      --accent: #d4a373; /* Harvest Gold/Wheat */
      --accent-light: #fefae0;
      
      --blue: #1b4332; --blue2: #081c15; --sky: #f0fff4;
      --navy: #081c15; --white: #ffffff;
      --red: #ef4444; --red2: #dc2626;
      --green: #22c55e; --green-bg: #f0fdf4;
      --harvest: #d4a373; --forest: #1b4332;
      --glass: rgba(255, 255, 255, 0.85);
      
      /* Theme Variables */
      --bg: #fdfdfd;
      --text: #081c15;
      --muted: #475569;
      --border: #e2e8f0;
      --nav-bg: #1b4332;
      --nav-text: #ffffff;
      --card-bg: #ffffff;
      --input-bg: #f8fafc;
      --modal-bg: #ffffff;
    }

    body.dark-mode {
      --bg: #051610;
      --text: #f0fdf4;
      --muted: #94a3b8;
      --border: #0f2922;
      --nav-bg: #081c15;
      --card-bg: #0f2922;
      --input-bg: #081c15;
      --modal-bg: #081c15;
      --sky: rgba(34,197,94, 0.1);
      --green-bg: rgba(34,197,94, 0.1);
      background: var(--bg);
    }
    html { scroll-behavior: smooth; }
    body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--text); overflow-x: hidden; transition: background 0.3s, color 0.3s; }
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-thumb { background: var(--blue); }

    @keyframes rotate3D   { 0% { transform: perspective(1000px) rotateY(0deg) rotateX(0deg); } 50% { transform: perspective(1000px) rotateY(15deg) rotateX(5deg); } 100% { transform: perspective(1000px) rotateY(0deg) rotateX(0deg); } }
    /* ── ADMIN DASHBOARD ── */
    .admin-portal { padding: 90px 64px; background: var(--accent-light); border-top: 2px solid var(--accent); border-bottom: 2px solid var(--accent); animation: fadeUp 0.6s ease; }
    .dash-header { margin-bottom: 32px; text-align: left; }
    .dash-header h2 { font-family: 'Fraunces', serif; font-size: 2.8rem; color: var(--navy); margin-bottom: 8px; }
    .dash-header p { color: var(--muted); font-size: 1.1rem; }
    .dashboard-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px; }
    .dash-card { background: var(--card-bg); border: 2px solid var(--border); border-radius: 24px; padding: 32px; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); cursor: pointer; position: relative; overflow: hidden; display: flex; flex-direction: column; gap: 16px; }
    .dash-card:hover { transform: translateY(-10px); border-color: var(--secondary); box-shadow: 0 20px 40px rgba(34, 197, 94, 0.15); }
    .dash-card-icon { width: 56px; height: 56px; background: var(--green-bg); border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; transition: all 0.3s; }
    .dash-card:hover .dash-card-icon { background: var(--secondary); color: #fff; transform: scale(1.1); }
    .dash-card-title { font-size: 1.3rem; font-weight: 800; color: var(--navy); }
    .dash-card-desc { font-size: 0.9rem; color: var(--muted); line-height: 1.6; }
    .dash-card-arrow { position: absolute; bottom: 32px; right: 32px; width: 40px; height: 40px; border-radius: 50%; border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; transition: all 0.3s; opacity: 0; transform: translateX(-10px); }
    .dash-card:hover .dash-card-arrow { opacity: 1; transform: translateX(0); background: var(--secondary); border-color: var(--secondary); color: #fff; }
    
    @keyframes pulse {
      0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255,255,255,0.7); }
      70% { transform: scale(1.1); box-shadow: 0 0 0 10px rgba(255,255,255,0); }
      100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255,255,255,0); }
    }
    @keyframes glow      { 0%,100% { box-shadow: 0 0 20px rgba(26,92,255,0.2); } 50% { box-shadow: 0 0 40px rgba(26,92,255,0.4); } }
    @keyframes floating  { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
    @keyframes slowZoom  { from { transform: scale(1.05); } to { transform: scale(1); } }
    @keyframes fadeUp   { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
    @keyframes ticker   { from { transform:translateX(0); } to { transform:translateX(-50%); } }
    @keyframes float    { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-10px);} }
    @keyframes modalIn  { from{opacity:0;transform:scale(.95) translateY(12px);} to{opacity:1;transform:scale(1) translateY(0);} }
    @keyframes toastIn  { from{opacity:0;transform:translateX(60px);} to{opacity:1;transform:translateX(0);} }
    @keyframes spin     { to{transform:rotate(360deg);} }
    @keyframes authSlide{ from{opacity:0;transform:translateX(24px);} to{opacity:1;transform:translateX(0);} }
    @keyframes pulse    { 0%,100%{opacity:1;} 50%{opacity:.4;} }

    .rev { opacity:0; transform:translateY(24px); transition:opacity .7s, transform .7s; }
    .rev.on { opacity:1; transform:translateY(0); }
    .d1{transition-delay:.1s;} .d2{transition-delay:.2s;}
    .d3{transition-delay:.3s;} .d4{transition-delay:.4s;}

    /* Global Buttons */
    .btn-blue { background: var(--nav-bg); color: #ffffff !important; border: none; cursor: pointer; transition: all .2s; font-family: inherit; display: inline-flex; align-items: center; justify-content: center; border-radius: 8px; font-weight: 700; }
    .btn-blue:hover { background: var(--secondary); transform: translateY(-1px); box-shadow: 0 6px 16px rgba(34, 197, 94, 0.25); }

    /* ── NAV ── */
    nav { position:fixed; top:0; left:0; right:0; z-index:999; 
      background:var(--nav-bg); border-bottom:1px solid rgba(255,255,255,0.1);
      display:flex; align-items:center; justify-content:space-between;
      padding:16px 64px; transition:all .3s ease; height: 80px; }
    nav.scrolled { height: 70px; background:var(--nav-bg); box-shadow: 0 4px 20px rgba(0,0,0,0.15); }
    
    .logo { 
      text-decoration:none; display:flex; align-items:center; gap:12px; cursor:pointer; color: #fff;
    }
    .logo-icon { 
      width:42px; height:42px; background:#fff; border-radius:50%;
      display:flex; align-items:center; justify-content:center; font-size:1.4rem;
      border: 2px solid #ffffff; /* Blue and white theme */
    }
    .logo-text { display: flex; flex-direction: column; line-height: 1.1; }
    .logo-main { font-family:'Fraunces',serif; font-size:1.4rem; font-weight:900; letter-spacing: -0.02em; }
    .logo-sub { font-size:0.55rem; font-weight:800; text-transform:uppercase; letter-spacing:0.12em; opacity: 0.8; }
    
    .nav-links { display:flex; gap:28px; list-style:none; align-items: center; }
    .nav-links a { 
      font-size:.85rem; font-weight:600; color:rgba(255,255,255,0.85); 
      text-decoration:none; transition:all .2s; padding: 6px 0; border-bottom: 2px solid transparent;
    }
    .nav-links a:hover, .nav-links a.active { color:#fff; border-bottom-color: #fff; }
    
    .nav-actions { display:flex; gap:18px; align-items:center; }
    .nav-icon-btn {
      background: transparent; border: none; color: #fff; cursor: pointer;
      font-size: 1.1rem; display: flex; align-items: center; justify-content: center;
      transition: transform .2s; position: relative;
    }
    .nav-icon-btn:hover { transform: scale(1.1); opacity: 0.8; }
    
    .theme-toggle {
      width: 38px; height: 38px; border-radius: 50%; background: rgba(255,255,255,0.1);
      display: flex; align-items: center; justify-content: center; cursor: pointer;
      border: 1px solid rgba(255,255,255,0.2); transition: all .2s; font-size: 1rem;
    }
    .theme-toggle:hover { background: rgba(255,255,255,0.2); }

    /* Mobile */
    .mobile-toggle { display: none; background: transparent; border: none; color: #fff; font-size: 1.5rem; cursor: pointer; }

    @media (max-width: 1024px) {
      nav { padding: 16px 24px; }
      .nav-links { display: none; }
      .mobile-toggle { display: block; }
      .nav-actions { gap: 12px; }
    }

    .mobile-drawer {
      position: fixed; top: 0; right: -300px; width: 300px; height: 100vh;
      background: var(--bg); z-index: 1000; transition: right 0.3s ease;
      padding: 40px 24px; box-shadow: -10px 0 30px rgba(0,0,0,0.1);
      display: flex; flex-direction: column; gap: 20px;
    }
    .mobile-drawer.open { right: 0; }
    .drawer-close { position: absolute; top: 20px; right: 20px; font-size: 1.5rem; background: transparent; border: none; color: var(--text); cursor: pointer; }
    .drawer-links { display: flex; flex-direction: column; gap: 24px; list-style: none; margin-top: 40px; }
    .drawer-links a { font-size: 1.1rem; font-weight: 700; color: var(--text); text-decoration: none; }
    .drawer-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 999; display: none; }
    .drawer-overlay.open { display: block; }

    /* User menu */
    .user-menu { position:relative; }
    .user-avatar-btn { display:flex; align-items:center; gap:12px; padding:8px 20px 8px 8px;
      border:2.5px solid rgba(255,255,255,0.3); border-radius:100px; background:rgba(255,255,255,0.15);
      cursor:pointer; transition:all .4s cubic-bezier(0.4, 0, 0.2, 1); font-family:inherit; color: #fff;
      box-shadow: 0 6px 16px rgba(0,0,0,0.15); }
    .user-avatar-btn:hover { border-color: #fff; background: rgba(255,255,255,0.25); transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.2); }
    .avatar-circle { width:38px; height:38px; border-radius:50%; background: var(--accent);
      display:flex; align-items:center; justify-content:center;
      font-size:.95rem; font-weight:900; color:#fff; text-transform:uppercase; flex-shrink:0;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    .avatar-name { font-size:.95rem; font-weight:800; color:#fff; max-width:140px;
      overflow:hidden; text-overflow:ellipsis; white-space:nowrap; letter-spacing: 0.03em; text-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .avatar-chevron { font-size:.7rem; color:#fff; opacity: 0.8; }
    .user-dropdown { position:absolute; top:calc(100% + 8px); right:0; background:#fff;
      border:1.5px solid var(--border); border-radius:12px;
      box-shadow:0 12px 40px rgba(0,0,0,.12); min-width:200px;
      padding:8px; animation:modalIn .15s ease; z-index:100; }
    .dd-header { padding:8px 10px 10px; border-bottom:1px solid var(--border); margin-bottom:6px; }
    .dd-name { font-weight:700; font-size:.85rem; color:var(--navy); }
    .dd-email { font-size:.72rem; color:var(--muted); margin-top:2px; }
    .dd-item { display:flex; align-items:center; gap:8px; padding:9px 10px; border-radius:8px;
      font-size:.8rem; font-weight:600; color:var(--text); cursor:pointer;
      transition:all .2s; border:none; background:transparent; width:100%; text-align:left; font-family:inherit; }
    .dd-item:hover { background:var(--sky); color:var(--blue); }
    .dd-item.danger { color:var(--red); }
    .dd-item.danger:hover { background:#fff5f5; color:var(--red2); }
    .dd-sep { height:1px; background:var(--border); margin:4px 0; }

    /* Admin toggle */
    .admin-toggle { display:flex; align-items:center; gap:7px; padding:8px 16px;
      border-radius:8px; border:1.5px solid var(--border); font-size:.78rem; font-weight:700;
      cursor:pointer; transition:all .2s; background:transparent; color:var(--muted); font-family:inherit; }
    .admin-toggle:hover { border-color:var(--blue); color:var(--blue); }
    .admin-toggle.active { background:var(--navy); color:#fff; border-color:var(--navy); }
    .admin-dot { width:7px; height:7px; border-radius:50%; background:currentColor; }

    /* ── LANDING PAGE ── */
    .landing-page { min-height:100vh; background: var(--bg); display: flex; align-items: center; justify-content: center; padding: 0 80px; overflow: hidden; position: relative; }
    .landing-content { max-width: 1000px; width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; z-index: 2; position: relative; padding-top: 40px; }
    .landing-text { position: relative; z-index: 5; text-align: left; }
    .landing-text h1 { font-family: 'Fraunces', serif; font-size: clamp(2.5rem, 4.5vw, 3.5rem); line-height: 1.15; margin-bottom: 24px; color: var(--text); letter-spacing: -0.01em; }
    .landing-text h1 span { color: var(--secondary); display: block; font-style: italic; }
    .landing-text p { font-size: 1.1rem; color: var(--muted); margin-bottom: 40px; max-width: 440px; line-height: 1.8; }
    .landing-btns { display: flex; gap: 16px; align-items: center; }
    
    .landing-visual { position: relative; display: flex; justify-content: center; align-items: center; perspective: 1500px; }
    .hero-img-wrap { width: 100%; max-width: 320px; position: relative; z-index: 4; border-radius: 30px; overflow: hidden; box-shadow: 0 40px 100px rgba(10,22,40,0.1); border: 8px solid #fff; background: #fff; transform-style: preserve-3d; animation: slowZoom 2s ease-out; }
    .hero-img { width: 100%; height: auto; display: block; filter: brightness(1.01); }
    
    .rotating-card-overlay { 
      position: absolute; bottom: 30px; left: -30px;
      background: var(--glass); backdrop-filter: blur(20px); 
      border-radius: 18px; padding: 20px; box-shadow: 0 20px 50px rgba(0,0,0,0.08);
      border: 1px solid rgba(255,255,255,0.3); z-index: 10;
      animation: floating 6s ease-in-out infinite;
    }
    .ro-val { font-family: 'Fraunces', serif; font-size: 1.5rem; color: var(--forest); font-weight: 900; }
    .ro-lbl { font-size: 0.7rem; color: var(--muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 2px; }

    .blob { position: absolute; width: 600px; height: 600px; background: radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%); border-radius: 50%; z-index: 1; filter: blur(40px); }
    .b1 { top: -200px; right: -100px; animation: floating 8s ease-in-out infinite; }
    .b2 { bottom: -200px; left: -100px; background: radial-gradient(circle, rgba(26,92,255,0.06) 0%, transparent 70%); animation: floating 10s ease-in-out infinite alternate; }

    /* ── AUTH PAGES ── */
    .auth-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--bg); padding: 40px 20px; position: relative; overflow: hidden; }
    .auth-page::before { content: ''; position: absolute; width: 800px; height: 800px; border-radius: 50%; background: radial-gradient(circle, rgba(59,130,246,0.05), transparent 70%); top: -300px; right: -200px; animation: floating 10s infinite; }
    .auth-page::after { content: ''; position: absolute; width: 600px; height: 600px; border-radius: 50%; background: radial-gradient(circle, rgba(26,92,255,0.04), transparent 70%); bottom: -200px; left: -100px; animation: floating 12s infinite alternate; }
    
    .auth-right { display: flex; align-items: center; justify-content: center; width: 100%; position: relative; z-index: 10; }
    .auth-form-wrap { 
      width: 100%; max-width: 460px; background: var(--card-bg); 
      padding: 52px; border-radius: 30px; 
      box-shadow: 0 40px 100px rgba(10,22,40,0.12); 
      border: 1px solid var(--border);
      animation: modalIn .5s ease;
    }
    .auth-header-centered { text-align: center; margin-bottom: 36px; }
    .auth-logo-ic-small { width: 44px; height: 44px; background: var(--secondary); border-radius: 12px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; }
    .auth-form-title { font-family: 'Fraunces', serif; font-size: 2.1rem; font-weight: 900; color: var(--navy); margin-bottom: 10px; text-align: center; }
    .auth-form-sub { font-size: .92rem; color: var(--muted); margin-bottom: 36px; line-height: 1.7; text-align: center; }
    .auth-form-sub a { color:var(--blue); font-weight:700; text-decoration:none; cursor:pointer; }
    .auth-form-sub a:hover { text-decoration:underline; }

    /* Form fields */
    .af-group { margin-bottom:18px; }
    .af-group label { display:block; font-size:.72rem; font-weight:700; color:var(--navy);
      letter-spacing:.05em; text-transform:uppercase; margin-bottom:7px; }
    .af-input-wrap { position:relative; }
    .af-icon { position:absolute; left:14px; top:50%; transform:translateY(-50%);
      font-size:.9rem; color:var(--muted); pointer-events:none; }
    .af-group input { width:100%; padding:12px 14px 12px 40px; border:1.5px solid var(--border);
      border-radius:10px; font-family:'Plus Jakarta Sans',sans-serif; font-size:.9rem;
      color:var(--text); transition:all .2s; outline:none; background:var(--input-bg); }
    .af-group input:focus { border-color:var(--blue); box-shadow:0 0 0 3px rgba(26,92,255,.1); }
    .af-group input.err { border-color:var(--red); box-shadow:0 0 0 3px rgba(239,68,68,.1); }
    .af-group input.ok { border-color:var(--green); }
    .af-toggle { position:absolute; right:13px; top:50%; transform:translateY(-50%);
      background:transparent; border:none; cursor:pointer; color:var(--muted);
      font-size:.8rem; padding:4px; transition:color .2s; }
    .af-toggle:hover { color:var(--blue); }
    .af-err { font-size:.72rem; color:var(--red); margin-top:5px; font-weight:600;
      display:flex; align-items:center; gap:4px; }
    .af-hint { font-size:.72rem; color:var(--muted); margin-top:5px; }

    /* Password strength */
    .pw-strength { margin-top:10px; }
    .pw-bars { display:flex; gap:4px; margin-bottom:5px; }
    .pw-bar { flex:1; height:4px; border-radius:100px; background:var(--border); transition:all .3s; }
    .pw-bar.s1 { background:var(--red); }
    .pw-bar.s2 { background:#f59e0b; }
    .pw-bar.s3 { background:var(--green); }
    .pw-label { font-size:.68rem; font-weight:600; }
    .pw-label.s1 { color:var(--red); }
    .pw-label.s2 { color:#f59e0b; }
    .pw-label.s3 { color:var(--green); }

    /* Requirements checklist */
    .pw-reqs { display:grid; grid-template-columns:1fr 1fr; gap:4px; margin-top:8px; }
    .pw-req { font-size:.68rem; color:var(--muted); display:flex; align-items:center; gap:5px;
      transition:color .2s; }
    .pw-req.met { color:var(--green); }
    .pw-req .req-dot { width:5px; height:5px; border-radius:50%; background:currentColor; flex-shrink:0; }

    /* Row for name */
    .af-row { display:grid; grid-template-columns:1fr 1fr; gap:14px; }

    /* Divider */
    .auth-divider { display:flex; align-items:center; gap:14px; margin:22px 0; }
    .auth-divider::before, .auth-divider::after { content:''; flex:1; height:1px; background:var(--border); }
    .auth-divider span { font-size:.72rem; font-weight:600; color:var(--muted); }

    /* Social buttons */
    .social-btns { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:22px; }
    .social-btn { display:flex; align-items:center; justify-content:center; gap:8px;
      padding:10px; border:1.5px solid var(--border); border-radius:9px;
      font-size:.8rem; font-weight:600; color:var(--text); background:#fff;
      cursor:pointer; transition:all .2s; font-family:inherit; }
    .social-btn:hover { border-color:var(--blue); color:var(--blue); background:var(--sky); }
    .social-ic { font-size:1rem; }

    /* Submit */
    .auth-submit { width:100%; padding:13px; background:var(--nav-bg); color:#fff; border:none;
      border-radius:10px; font-size:.92rem; font-weight:700; cursor:pointer;
      transition:all .2s; font-family:inherit; display:flex; align-items:center;
      justify-content:center; gap:8px; margin-top:6px; }
    .auth-submit:hover:not(:disabled) { background:var(--blue2); transform:translateY(-1px);
      box-shadow:0 8px 20px rgba(26,92,255,.3); }
    .auth-submit:disabled { opacity:.65; cursor:not-allowed; transform:none; }
    .auth-spinner { width:16px; height:16px; border:2px solid rgba(255,255,255,.3);
      border-top-color:#fff; border-radius:50%; animation:spin .6s linear infinite; }

    /* Global API error */
    .auth-alert { background:#fff5f5; border:1.5px solid #fecaca; border-radius:10px;
      padding:11px 14px; font-size:.82rem; color:var(--red); font-weight:600;
      margin-bottom:18px; display:flex; align-items:center; gap:8px; animation:fadeIn .2s; }

    /* Success state */
    .auth-success { background:#f0fdf4; border:1.5px solid #bbf7d0; border-radius:10px;
      padding:11px 14px; font-size:.82rem; color:#166534; font-weight:600;
      margin-bottom:18px; display:flex; align-items:center; gap:8px; animation:fadeIn .2s; }

    /* Terms */
    .auth-terms { font-size:.7rem; color:var(--muted); text-align:center; margin-top:18px; line-height:1.6; }
    .auth-terms a { color:var(--blue); text-decoration:none; font-weight:600; }

    /* ── ADMIN BANNER ── */
    .admin-banner { position:fixed; top:73px; left:0; right:0; z-index:998;
      background:var(--navy); color:rgba(255,255,255,.7);
      padding:8px 64px; font-size:.72rem; font-weight:600;
      letter-spacing:.06em; text-transform:uppercase;
      display:flex; align-items:center; gap:8px;
      border-bottom:1px solid rgba(255,255,255,.08); }
    .admin-banner-dot { width:6px; height:6px; border-radius:50%; background:var(--green); animation:float 2s ease-in-out infinite; }

    /* ── HERO ── */
    .hero { min-height:100vh; padding:110px 64px 80px; display:grid;
      grid-template-columns:1fr 1fr; align-items:center; gap:60px;
      background:linear-gradient(165deg,var(--bg) 55%,var(--accent-light) 55%); position:relative; overflow:hidden; }
    .hero::before { content:''; position:absolute; width:500px; height:500px; border-radius:50%;
      background:radial-gradient(circle, rgba(34,197,94,.06), transparent 70%); top:-100px; right:200px; }
    .badge { display:inline-flex; align-items:center; gap:8px; background:var(--green-bg);
      color:var(--secondary); padding:6px 14px; border-radius:100px;
      font-size:.72rem; font-weight:700; letter-spacing:.04em; margin-bottom:28px;
      animation:fadeUp .5s ease both; }
    .badge-dot { width:7px; height:7px; background:var(--secondary); border-radius:50%; }
    h1 { font-family:'Fraunces',serif; font-size:clamp(2.8rem,4.5vw,4.8rem); font-weight:900;
      line-height:.96; color:var(--text); margin-bottom:22px; animation:fadeUp .6s .1s ease both; }
    h1 span { color:var(--secondary); font-style:italic; }
    .hdesc { font-size:1rem; line-height:1.8; color:var(--muted); max-width:440px;
      margin-bottom:38px; font-weight:400; animation:fadeUp .6s .2s ease both; }
    .hbtns { display:flex; gap:12px; animation:fadeUp .6s .3s ease both; }
    .hbtns .btn-blue { padding:13px 30px; font-size:.93rem; }
    .hbtns .btn-ghost { padding:13px 24px; font-size:.9rem; border-radius:8px; }
    .hstats { display:flex; gap:40px; margin-top:52px; padding-top:36px;
      border-top:1px solid var(--border); animation:fadeUp .6s .4s ease both; }
    .sn { font-family:'Fraunces',serif; font-size:2.1rem; font-weight:900; color:var(--text); }
    .sl { font-size:.72rem; color:var(--muted); margin-top:3px; font-weight:500; }
    .hero-right { position:relative; display:flex; justify-content:center; align-items:center; animation:fadeUp .8s .3s ease both; }
    .dashboard-mock { background:var(--card-bg); border:1px solid var(--border); border-radius:20px;
      padding:28px; box-shadow:0 20px 60px rgba(0,0,0,.15); width:380px; }
    .dash-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:22px; }
    .dash-title { font-weight:700; font-size:.92rem; color:var(--text); }
    .dash-badge { background:var(--sky); color:var(--blue); font-size:.62rem; font-weight:700; padding:3px 10px; border-radius:100px; }
    .dash-cards { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:20px; }
    .dc { padding:16px; border-radius:12px; background:var(--sky); }
    .dc.dark { background:var(--blue); }
    .dc-label { font-size:.68rem; font-weight:600; color:var(--muted); margin-bottom:6px; }
    .dc.dark .dc-label { color:rgba(255,255,255,.7); }
    .dc-val { font-family:'Fraunces',serif; font-size:1.5rem; font-weight:900; color:var(--text); }
    .dc.dark .dc-val { color:#fff; }
    .dc-sub { font-size:.68rem; color:var(--muted); margin-top:2px; }
    .dc.dark .dc-sub { color:rgba(255,255,255,.6); }
    .bar-row { margin-bottom:12px; }
    .bar-label { display:flex; justify-content:space-between; font-size:.72rem; font-weight:600; color:var(--text); margin-bottom:6px; }
    .bar-track { height:8px; background:#f0f4ff; border-radius:100px; overflow:hidden; }
    .bar-fill { height:100%; border-radius:100px; background:linear-gradient(90deg,var(--blue),#6b9fff); }
    .mini-tag { display:inline-flex; align-items:center; gap:6px; background:#f0f7f0;
      color:#2d7a3a; font-size:.7rem; font-weight:600; padding:5px 12px; border-radius:100px; margin-top:4px; }

    /* ── TICKER ── */
    .ticker { background:var(--nav-bg); padding:12px 0; overflow:hidden; white-space:nowrap; border-bottom: 2px solid var(--accent); }
    .t-inner { display:inline-flex; gap:52px; animation:ticker 22s linear infinite; }
    .tick { font-size:.68rem; font-weight:600; letter-spacing:.12em; text-transform:uppercase;
      color:#fff; display:flex; align-items:center; gap:10px; }
    .tdot { width:4px; height:4px; background:rgba(255,255,255,.5); border-radius:50%; display:inline-block; }

    /* ── PRODUCTS ── */
    .products { padding:90px 64px; background:var(--bg); }
    .sec-head { display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:52px; }
    .sec-kicker { font-size:.68rem; font-weight:700; letter-spacing:.16em; text-transform:uppercase; color:var(--secondary); margin-bottom:10px; }
    .sec-h2 { font-family:'Fraunces',serif; font-size:clamp(1.8rem,3vw,2.6rem); font-weight:900; color:var(--text); line-height:1.1; }
    .sec-h2 em { color:var(--secondary); font-style:italic; }
    .prod-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:22px; }
    .pcard { background:var(--card-bg); border:1.5px solid rgba(27, 67, 50, 0.08); border-radius:18px; overflow:hidden; transition:all .3s; cursor:pointer; position:relative; 
      box-shadow: 0 10px 30px rgba(27, 67, 50, 0.04); }
    .pcard:hover { border-color:var(--secondary); transform:translateY(-6px); box-shadow:0 16px 48px rgba(27, 67, 50, 0.12); }
    .pimg { height:190px; display:flex; align-items:center; justify-content:center;
      position:relative; background:linear-gradient(135deg,var(--sky),#d6e4ff); }
    .pimg.p2 { background:linear-gradient(135deg,#e8fff0,#c8f0d8); }
    .pimg.p3 { background:linear-gradient(135deg,#fff8e8,#faebc8); }
    .pimg.p4 { background:linear-gradient(135deg,#fce7f3,#fbcfe8); }
    .pimg.p5 { background:linear-gradient(135deg,#ede9fe,#ddd6fe); }
    .pemoji { font-size:3.8rem; animation:float 3s ease-in-out infinite; }
    .pbadge { position:absolute; top:14px; left:14px; background:var(--secondary); color:#fff;
      font-size:.58rem; font-weight:700; letter-spacing:.08em; text-transform:uppercase;
      padding:4px 10px; border-radius:100px; }
    .admin-actions { position:absolute; top:10px; right:10px; display:flex; gap:6px; opacity:0; transition:opacity .2s; }
    .pcard:hover .admin-actions { opacity:1; }
    .act-btn { width:32px; height:32px; border-radius:8px; border:none; display:flex;
      align-items:center; justify-content:center; font-size:.8rem; cursor:pointer; transition:all .2s; backdrop-filter:blur(8px); }
    .act-edit { background:rgba(255,255,255,.92); color:var(--blue); }
    .act-edit:hover { background:var(--blue); color:#fff; }
    .act-delete { background:rgba(255,255,255,.92); color:var(--red); }
    .act-delete:hover { background:var(--red); color:#fff; }
    .pcard-body { padding:22px; }
    .pcat { font-size:.62rem; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:var(--blue); margin-bottom:6px; }
    .pname { font-family:'Fraunces',serif; font-size:1.18rem; font-weight:700; color:var(--navy); margin-bottom:8px; }
    .pdesc { font-size:.78rem; line-height:1.65; color:var(--muted); margin-bottom:20px; }
    .pfoot { display:flex; justify-content:space-between; align-items:center; }
    .pprice { font-family:'Fraunces',serif; font-size:1.4rem; font-weight:900; color:var(--navy); }
    .pper { display:block; font-size:.65rem; color:var(--muted); font-family:'Plus Jakarta Sans',sans-serif; font-weight:400; }
    .cart-btn { background:var(--nav-bg); color:#fff; border:none; padding:9px 20px;
      border-radius:8px; font-size:.78rem; font-weight:700; cursor:pointer; transition:all .2s; font-family:inherit; }
    .cart-btn:hover { background:var(--blue2); }
    .add-product-btn { display:flex; align-items:center; gap:9px; padding:11px 22px;
      background:var(--nav-bg); color:#fff; border:none; border-radius:10px;
      font-size:.84rem; font-weight:700; cursor:pointer; transition:all .2s; font-family:inherit; }
    .add-product-btn:hover { background:var(--blue2); transform:translateY(-1px); }
    .empty-state { grid-column:1/-1; text-align:center; padding:80px 20px;
      border:2px dashed var(--border); border-radius:18px; }
    .empty-icon { font-size:3rem; margin-bottom:16px; }
    .empty-title { font-family:'Fraunces',serif; font-size:1.4rem; color:var(--navy); margin-bottom:8px; }
    .empty-desc { color:var(--muted); font-size:.85rem; margin-bottom:24px; }

    /* ── MODAL ── */
    .modal-overlay { position:fixed; inset:0; z-index:1100;
      background:rgba(10,22,40,.75); backdrop-filter:blur(4px);
      display:flex; align-items:center; justify-content:center; padding:24px; animation:fadeIn .2s; }
    .modal { background:var(--modal-bg); border-radius:22px; width:100%; max-width:540px;
      box-shadow:0 32px 80px rgba(0,0,0,.3); animation:modalIn .25s ease; max-height:90vh; overflow-y:auto; border: 1px solid var(--border); }
    .modal-header { display:flex; align-items:center; justify-content:space-between; padding:26px 30px 0; }
    .modal-title { font-family:'Fraunces',serif; font-size:1.35rem; font-weight:900; color:var(--navy); }
    .modal-close { width:34px; height:34px; border-radius:8px; border:1.5px solid var(--border);
      background:transparent; cursor:pointer; display:flex; align-items:center;
      justify-content:center; font-size:1rem; color:var(--muted); transition:all .2s; font-family:inherit; }
    .modal-close:hover { border-color:var(--red); color:var(--red); }
    .modal-body { padding:24px 30px 30px; }
    .form-row { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
    .form-group { margin-bottom:18px; }
    .form-group label { display:block; font-size:.75rem; font-weight:700; color:var(--navy);
      letter-spacing:.04em; margin-bottom:7px; text-transform:uppercase; }
    .form-group input, .form-group select, .form-group textarea {
      width:100%; padding:11px 14px; border:1.5px solid var(--border); border-radius:10px;
      font-family:'Plus Jakarta Sans',sans-serif; font-size:.85rem; color:var(--text);
      transition:all .2s; outline:none; background:var(--input-bg); }
    .form-group input:focus, .form-group select:focus, .form-group textarea:focus { border-color:var(--blue); box-shadow:0 0 0 3px rgba(26,92,255,.1); }
    .form-group textarea { resize:vertical; min-height:80px; }
    .form-group input.error { border-color:var(--red); }
    .form-error { font-size:.72rem; color:var(--red); margin-top:5px; font-weight:600; }
    .emoji-picker { display:flex; flex-wrap:wrap; gap:8px; margin-top:8px; }
    .emoji-opt { width:38px; height:38px; border-radius:8px; border:1.5px solid var(--border);
      background:#fff; font-size:1.1rem; cursor:pointer; transition:all .15s;
      display:flex; align-items:center; justify-content:center; }
    .emoji-opt:hover { border-color:var(--blue); background:var(--sky); transform:scale(1.1); }
    .emoji-opt.selected { border-color:var(--blue); background:var(--sky); box-shadow:0 0 0 2px var(--blue); }
    .imgclass-picker { display:flex; gap:8px; margin-top:8px; }
    .imgclass-opt { flex:1; height:36px; border-radius:8px; border:1.5px solid var(--border); cursor:pointer; transition:all .15s; }
    .imgclass-opt:hover { transform:scale(1.04); }
    .imgclass-opt.selected { border:2.5px solid var(--blue); box-shadow:0 0 0 2px rgba(26,92,255,.2); }
    .imgclass-opt.c0 { background:linear-gradient(135deg,var(--sky),#d6e4ff); }
    .imgclass-opt.c1 { background:linear-gradient(135deg,#e8fff0,#c8f0d8); }
    .imgclass-opt.c2 { background:linear-gradient(135deg,#fff8e8,#faebc8); }
    .imgclass-opt.c3 { background:linear-gradient(135deg,#fce7f3,#fbcfe8); }
    .imgclass-opt.c4 { background:linear-gradient(135deg,#ede9fe,#ddd6fe); }
    .modal-footer { display:flex; gap:10px; justify-content:flex-end;
      padding-top:8px; border-top:1px solid var(--border); margin-top:6px; }
    .btn-cancel { padding:10px 22px; border:1.5px solid var(--border); border-radius:9px;
      font-size:.84rem; font-weight:600; color:var(--muted); background:transparent;
      cursor:pointer; transition:all .2s; font-family:inherit; }
    .btn-cancel:hover { border-color:var(--text); color:var(--text); }
    .btn-save { padding:10px 26px; background:var(--nav-bg); color:#fff; border:none;
      border-radius:9px; font-size:.84rem; font-weight:700; cursor:pointer; transition:all .2s; font-family:inherit; }
    .btn-save:hover { background:var(--blue2); }
    .del-modal { padding:36px 30px; text-align:center; }
    .del-icon { font-size:2.8rem; margin-bottom:16px; }
    .del-title { font-family:'Fraunces',serif; font-size:1.3rem; color:var(--navy); margin-bottom:8px; }
    .del-desc { font-size:.85rem; color:var(--muted); line-height:1.6; margin-bottom:28px; }
    .del-btns { display:flex; gap:10px; justify-content:center; }
    .btn-delete { padding:11px 28px; background:var(--nav-bg); color:#fff; border:none;
      border-radius:9px; font-size:.84rem; font-weight:700; cursor:pointer; transition:all .2s; font-family:inherit; }
    .btn-delete:hover { background:var(--red2); }

    /* ── TOAST ── */
    .toast-container { position:fixed; bottom:28px; right:28px; z-index:1200; display:flex; flex-direction:column; gap:10px; }
    .toast { display:flex; align-items:center; gap:12px; background:var(--navy); color:#fff;
      padding:13px 18px; border-radius:12px; font-size:.82rem; font-weight:600;
      box-shadow:0 8px 30px rgba(0,0,0,.2); animation:toastIn .3s ease; min-width:220px; }
    .toast-icon { font-size:1rem; }
    .toast.success .toast-icon::before { content:'✓'; color:var(--green); }
    .toast.error .toast-icon::before { content:'✕'; color:var(--red); }
    .toast.info .toast-icon::before { content:'●'; color:#6b9fff; }

    /* ── ABOUT ── */
    .about { padding:90px 64px; background:#fff; }
    .about-grid { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center; }
    .sec-body { font-size:.95rem; line-height:1.85; color:var(--muted); font-weight:400; margin-bottom:30px; }
    .feat-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
    .feat { padding:20px; border:1.5px solid var(--border); border-radius:14px; transition:all .3s; }
    .feat:hover { border-color:var(--blue); background:var(--sky); }
    .ficon { width:40px; height:40px; background:var(--sky); border-radius:10px;
      display:flex; align-items:center; justify-content:center; font-size:1.1rem; margin-bottom:12px; }
    .feat:hover .ficon { background:var(--blue); }
    .fname { font-weight:700; font-size:.86rem; color:var(--navy); margin-bottom:4px; }
    .fdesc { font-size:.75rem; color:var(--muted); line-height:1.55; }

    /* ── PROCESS ── */
    .process { padding:90px 64px; background:#fafbff; }
    .process-center { text-align:center; margin-bottom:64px; }
    .steps { display:grid; grid-template-columns:repeat(4,1fr); gap:0; position:relative; }
    .steps::before { content:''; position:absolute; top:36px; left:12.5%; right:12.5%; height:2px;
      background:linear-gradient(90deg,var(--blue),#6b9fff,var(--blue)); opacity:.25; }
    .step { text-align:center; padding:0 20px; position:relative; z-index:1; }
    .step-num { width:74px; height:74px; border-radius:50%; background:#fff; border:2.5px solid var(--blue);
      display:flex; align-items:center; justify-content:center; font-family:'Fraunces',serif;
      font-size:1.35rem; font-weight:900; color:var(--blue); margin:0 auto 22px; box-shadow:0 0 0 6px var(--sky); }
    .step-t { font-weight:700; font-size:.92rem; color:var(--navy); margin-bottom:8px; }
    .step-d { font-size:.76rem; color:var(--muted); line-height:1.65; }

    /* ── TESTIMONIALS ── */
    .testi { padding:90px 64px; background:#fff; }
    .testi-center { text-align:center; margin-bottom:52px; }
    .tgrid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
    .tcard { background:#fafbff; border:1.5px solid var(--border); border-radius:18px;
      padding:28px; transition:all .3s; position:relative; }
    .tcard::before { content:'\u201C'; font-family:'Fraunces',serif; font-size:4.5rem;
      color:var(--blue); opacity:.12; position:absolute; top:8px; left:18px; line-height:1; }
    .tcard:hover { border-color:var(--blue); box-shadow:0 12px 36px rgba(26,92,255,.08); transform:translateY(-4px); }
    .tstars { color:var(--blue); font-size:.82rem; letter-spacing:3px; margin-bottom:14px; }
    .ttext { font-size:.87rem; line-height:1.78; color:var(--muted); font-style:italic; margin-bottom:22px; }
    .tauthor { display:flex; align-items:center; gap:11px; }
    .tavatar { width:42px; height:42px; border-radius:50%; background:var(--sky);
      display:flex; align-items:center; justify-content:center; font-size:1.1rem; }
    .taname { font-weight:700; font-size:.85rem; color:var(--text); }
    .tarole { font-size:.72rem; color:var(--muted); margin-top:2px; }

    /* ── CTA ── */
    .cta { padding:80px 64px; background:var(--navy); text-align:center; position:relative; overflow:hidden; }
    .cta::before { content:''; position:absolute; width:600px; height:600px; border-radius:50%;
      background:radial-gradient(circle,rgba(26,92,255,.2),transparent 70%);
      top:50%; left:50%; transform:translate(-50%,-50%); }
    .cta h2 { font-family:'Fraunces',serif; font-size:clamp(2rem,4vw,3.4rem); color:#fff; margin-bottom:14px; position:relative; }
    .cta h2 em { color:#6b9fff; font-style:italic; }
    .cta p { color:rgba(255,255,255,.55); font-size:.98rem; margin-bottom:40px; position:relative; }
    .cta-btns { display:flex; gap:14px; justify-content:center; position:relative; }
    .btn-w { background:var(--nav-bg); color:#fff; padding:14px 34px; border-radius:8px;
      font-weight:700; font-size:.93rem; text-decoration:none; transition:all .2s; border:none; cursor:pointer; font-family:inherit; }
    .btn-w:hover { background:#f0f5ff; transform:translateY(-2px); }
    .btn-ghost-w { color:rgba(255,255,255,.7); border:1.5px solid rgba(255,255,255,.2);
      padding:14px 26px; border-radius:8px; font-size:.9rem; text-decoration:none;
      transition:all .2s; background:transparent; cursor:pointer; font-family:inherit; }
    .btn-ghost-w:hover { border-color:rgba(255,255,255,.5); color:#fff; }

    /* ── FOOTER ── */
    footer { background:#041a12; padding:56px 64px 28px; border-top:1px solid var(--accent); }
    .foot-top { display:grid; grid-template-columns:2fr 1fr 1fr 1fr; gap:56px;
      padding-bottom:44px; border-bottom:1px solid rgba(255,255,255,.06); margin-bottom:24px; }
    .flogo { font-family:'Fraunces',serif; font-size:1.45rem; font-weight:900; color:#fff;
      text-decoration:none; display:flex; align-items:center; gap:9px; margin-bottom:16px; }
    .flogo-icon { width:28px; height:28px; background:var(--secondary); border-radius:7px;
      display:flex; align-items:center; justify-content:center; font-size:.85rem; }
    .flogo span { color:var(--accent); }
    .fdesc { font-size:.8rem; color:rgba(255,255,255,.35); line-height:1.78; margin-bottom:22px; }
    .socials { display:flex; gap:9px; }
    .soc { width:34px; height:34px; border:1px solid rgba(255,255,255,.1); border-radius:7px;
      display:flex; align-items:center; justify-content:center; font-size:.7rem;
      color:rgba(255,255,255,.4); text-decoration:none; transition:all .2s; font-weight:600; }
    .soc:hover { border-color:var(--blue); color:var(--blue); }
    .foot-col h4 { font-size:.6rem; font-weight:700; letter-spacing:.14em; text-transform:uppercase;
      color:rgba(255,255,255,.35); margin-bottom:18px; }
    .foot-col ul { list-style:none; }
    .foot-col li { margin-bottom:9px; }
    .foot-col a { text-decoration:none; color:rgba(255,255,255,.35); font-size:.8rem; transition:color .2s; }
    .foot-col a:hover { color:#fff; }
    .foot-bottom { display:flex; justify-content:space-between; align-items:center; }
    .copy { font-size:.68rem; color:rgba(255,255,255,.2); letter-spacing:.04em; }
    /* ── CART & NAVIGATION ── */
    .nav-actions { display: flex; align-items: center; gap: 16px; }
    .nav-cart-btn { 
      background: rgba(255,255,255,0.2); border: 1.5px solid rgba(255,255,255,0.4);
      width: 44px; height: 44px; border-radius: 12px; position: relative; color: #ffffff;
      cursor: pointer; transition: all .2s ease; display: flex; align-items: center; justify-content: center;
    }
    .nav-cart-btn:hover { background: rgba(255,255,255,0.3); transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
    .cart-ic { font-size: 1.4rem; }
    .cart-badge { 
      position: absolute; top: -6px; right: -6px; 
      background: var(--secondary); color: #fff; font-size: .65rem; font-weight: 800;
      min-width: 18px; height: 18px; border-radius: 10px; 
      display: flex; align-items: center; justify-content: center;
      border: 2px solid #fff; box-shadow: 0 4px 8px rgba(34,197,94,0.2);
    }

    /* ── CART MODAL ── */
    .cart-modal { max-width: 480px !important; }
    .cart-items { display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px; }
    .cart-item { 
      display: flex; align-items: center; gap: 16px; padding: 12px; 
      background: var(--input-bg); border-radius: 16px; border: 1px solid var(--border);
    }
    .ci-emoji { font-size: 1.5rem; width: 48px; height: 48px; background: var(--card-bg); border-radius: 12px; display: flex; align-items: center; justify-content: center; }
    .ci-info { flex: 1; }
    .ci-name { font-weight: 700; color: var(--text); font-size: .95rem; }
    .ci-price { font-size: .85rem; color: var(--muted); margin-top: 2px; }
    .ci-actions { display: flex; align-items: center; gap: 12px; }
    .ci-actions button { width: 28px; height: 28px; border-radius: 8px; border: 1px solid var(--border); background: var(--card-bg); color: var(--text); cursor: pointer; transition: all .2s; }
    .ci-actions button:hover { background: var(--blue); color: #fff; border-color: var(--blue); }
    .ci-actions span { font-weight: 700; width: 20px; text-align: center; font-size: .95rem; color: var(--text); }
    .ci-del { color: #ef4444 !important; }
    .cart-summary { background: var(--card-bg); padding: 16px; border-radius: 16px; border: 1px dashed var(--border); margin-top: 10px; }
    .cs-row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: .9rem; color: var(--muted); }
    .cs-row.total { border-top: 1px solid var(--border); padding-top: 12px; margin-top: 8px; color: var(--text); font-weight: 800; font-size: 1.1rem; }
    .empty-cart { text-align: center; padding: 40px 0; }
    .checkout-btn { background: var(--nav-bg); color: #fff; width: 100%; margin-top: 20px; font-weight: 800; height: 52px; font-size: 1rem; border-radius: 16px; border: none; cursor: pointer; transition: all .2s; }
    .checkout-btn:hover { opacity: 0.9; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3); }

    .order-summary-mini { background: var(--input-bg); padding: 16px; border-radius: 16px; margin-bottom: 20px; border: 1px solid var(--border); }
    
    /* Auth Extras */
    .back-home-btn {
        position: absolute;
        top: 24px;
        left: 24px;
        display: flex;
        align-items: center;
        gap: 8px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(0, 0, 0, 0.05);
        padding: 8px 16px;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.3s ease;
        backdrop-filter: blur(5px);
    }
    .back-home-btn:hover {
        background: rgba(255, 255, 255, 0.15);
        transform: translateX(-4px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }
    .bh-icon { font-size: 1.1rem; }
    .bh-text { font-size: 0.82rem; font-weight: 700; color: var(--text); opacity: 0.8; }

    .af-role-toggle {
        display: flex;
        gap: 10px;
        margin-top: 8px;
    }
    .role-opt {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 12px;
        background: var(--card);
        border: 2px solid var(--border);
        border-radius: 14px;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        font-size: 0.75rem;
        font-weight: 700;
        color: var(--muted);
    }
    .role-opt:hover {
        border-color: var(--blue);
        transform: translateY(-2px);
    }
    .role-opt.selected {
        background: var(--blue);
        color: #fff;
        border-color: var(--blue);
        box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3);
    }
    .ro-ic { font-size: 1.3rem; margin-bottom: 4px; }

    .os-title { font-weight: 800; color: var(--text); font-size: .9rem; margin-bottom: 12px; text-transform: uppercase; letter-spacing: .05em; }
    .os-list { max-height: 120px; overflow-y: auto; padding-right: 4px; }
    .os-item { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; font-size: .85rem; color: var(--muted); }
    .os-emoji { font-size: 1.1rem; }
    .os-name { flex: 1; color: var(--text); font-weight: 600; }
    .os-qty { font-weight: 700; color: var(--blue); }
    .os-price { font-weight: 700; }

    /* ── PAYMENT MODAL ── */
    .payment-modal { max-width: 440px !important; }
    .pay-options { display: grid; gap: 12px; margin-bottom: 24px; }
    .pay-opt { 
      padding: 16px; border-radius: 16px; border: 2px solid var(--border);
      display: flex; align-items: center; gap: 16px; cursor: pointer; transition: all .2s;
    }
    .pay-opt:hover { border-color: var(--blue); background: rgba(26,92,255,0.02); }
    .pay-opt.selected { border-color: var(--blue); background: rgba(26,92,255,0.05); }
    .pay-ic { width: 44px; height: 44px; background: var(--input-bg); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; }
    .font-ep { font-weight: 900; color: #1aae3c; font-size: .8rem; }
    .font-jc { font-weight: 900; color: #d0021b; font-size: .8rem; }
    .pay-t { font-weight: 700; color: var(--text); font-size: .95rem; }
    .pay-d { font-size: .8rem; color: var(--muted); }
    .pay-summary { margin-bottom: 24px; text-align: center; font-size: 1.1rem; color: var(--text); }
    .pay-summary strong { color: var(--blue); }
    
    .order-receipt { text-align: center; padding: 20px 10px; }
    .receipt-title { font-family: 'Fraunces', serif; font-size: 1.6rem; color: var(--text); margin: 12px 0 6px; }
    .receipt-desc { font-size: .85rem; color: var(--muted); margin-bottom: 24px; }
    .receipt-card { 
      background: var(--input-bg); border: 1.5px solid var(--border); border-radius: 20px; 
      padding: 24px; text-align: left; box-shadow: 0 4px 12px rgba(0,0,0,0.02);
    }
    .receipt-row { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: .85rem; }
    .r-label { color: var(--muted); font-weight: 500; }
    .r-value { color: var(--text); font-weight: 700; }
    .r-status { font-weight: 800; font-size: .75rem; padding: 2px 8px; border-radius: 4px; }
    .r-status.success { background: var(--green-bg); color: var(--green); }
    .r-status.pending { background: #fffbeb; color: #d97706; }
    .receipt-divider { height: 1px; background: var(--border); margin: 18px 0; border-top: 1px dashed var(--border); }
    .receipt-items { margin-bottom: 18px; }
    .ri-row { display: flex; justify-content: space-between; font-size: .85rem; margin-bottom: 8px; color: var(--text); }
    .ri-n { flex: 1; }
    .ri-p { font-weight: 700; }
    .receipt-total { 
      display: flex; justify-content: space-between; border-top: 1px solid var(--border); 
      padding-top: 15px; font-weight: 800; font-size: 1.05rem; color: var(--text); 
    }

    /* ── TRACK ORDER ── */
    .track-card { background: var(--input-bg); padding: 30px; border-radius: 20px; border: 1px solid var(--border); margin-top: 20px; }
    .track-input-wrap { display: flex; gap: 12px; margin-bottom: 24px; }
    .track-input { flex: 1; padding: 14px 20px; border-radius: 12px; border: 1.5px solid var(--border);
      background: var(--card-bg); font-family: inherit; font-size: 1rem; color: var(--text); outline: none; transition: all .2s; }
    .track-input:focus { border-color: var(--blue); box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1); }
    .track-btn { background: var(--nav-bg); color: #fff; border: none; padding: 0 24px; border-radius: 12px;
      font-weight: 700; cursor: pointer; transition: all .2s; }
    .track-btn:hover { background: var(--blue2); transform: translateY(-1px); }
    
    .track-status-box { text-align: center; padding: 20px 0; animation: fadeIn .3s; }
    .ts-icon { font-size: 3rem; margin-bottom: 12px; }
    .ts-label { font-weight: 800; color: var(--text); font-size: 1.2rem; margin-bottom: 6px; }
    .ts-desc { color: var(--muted); font-size: .9rem; line-height: 1.6; }

    .logo-main { color: #fff !important; font-size: 1.8rem !important; }
    .logo-sub { color: rgba(255,255,255,0.85) !important; font-weight: 900 !important; font-size: 0.65rem !important; }

    .auth-spinner {
      display: inline-block; width: 18px; height: 18px; border: 2.5px solid rgba(255,255,255,.3);
      border-radius: 50%; border-top-color: #fff; animation: spin 1s ease-in-out infinite;
    }

    /* == ADMIN DASHBOARD == */
    .dashboard-modal { max-width: 900px !important; border-radius: 24px !important; overflow: hidden; border: 1px solid rgba(255,255,255,0.2); }
    .admin-table { width: 100%; border-collapse: separate; border-spacing: 0 8px; margin-top: 10px; }
    .admin-table th { 
    }
    .admin-table th:first-child { border-radius: 8px 0 0 0; }
    .admin-table th:last-child { border-radius: 0 8px 0 0; }
    .admin-table td { 
      padding: 12px 14px; border-bottom: 1px solid var(--border); 
      color: var(--text); vertical-align: middle;
    }
    .admin-table tr:hover td { background: var(--input-bg); }
    .admin-table tr:last-child td { border-bottom: none; }

    .status-pill {
      display: inline-block; padding: 3px 10px; border-radius: 100px;
      font-size: .68rem; font-weight: 700; letter-spacing: .05em;
    }
    .status-pill.successful { background: #dcfce7; color: #166534; }
    .status-pill.pending { background: #fffbeb; color: #92400e; }

    /* Review Submit Form */
    .review-form { margin-top: 28px; background: var(--input-bg); border-radius: 16px; padding: 24px; border: 1px solid var(--border); }
    .review-form h4 { font-weight: 800; color: var(--text); margin-bottom: 16px; font-size: .95rem; }
    .review-form input, .review-form textarea { 
      width: 100%; padding: 10px 14px; border: 1.5px solid var(--border); border-radius: 10px;
      font-family: inherit; font-size: .85rem; color: var(--text); background: var(--card-bg);
      margin-bottom: 12px; outline: none; transition: border .2s;
    }
    .review-form input:focus, .review-form textarea:focus { border-color: var(--blue); }
    .review-form textarea { resize: vertical; min-height: 80px; }
    .btn-ghost { 
      padding: 10px 22px; border: 1.5px solid var(--blue); color: var(--blue);
      background: transparent; border-radius: 9px; font-size: .84rem; font-weight: 700;
      cursor: pointer; transition: all .2s; font-family: inherit;
    }
    .btn-ghost:hover { background: var(--blue); color: #fff; }
    .confirm-text { color: var(--muted); font-size: .9rem; margin-bottom: 20px; }
    .w100 { width: 100%; margin-top: 10px; }
    .success-icon { font-size: 3rem; }

    /* == IMAGE UPLOAD == */
    .image-upload-wrap { margin-top: 5px; }
    .image-preview-box { 
      width: 100%; height: 160px; border: 2px dashed var(--border); border-radius: 12px;
      display: flex; align-items: center; justify-content: center; overflow: hidden;
      cursor: pointer; transition: all .2s; background: var(--input-bg);
    }
    .image-preview-box:hover { border-color: var(--blue); background: var(--sky); }
    .image-preview-box img { width: 100%; height: 100%; object-fit: cover; }
    .upload-placeholder { text-align: center; color: var(--muted); }
    .upload-placeholder span { font-size: 2rem; display: block; margin-bottom: 5px; }
    .btn-remove-img { 
      background: none; border: none; color: var(--red); font-size: .75rem; 
      font-weight: 700; cursor: pointer; margin-top: 8px; text-decoration: underline;
    }
    .pimg-file { width: 100%; height: 100%; object-fit: cover; }

    /* == DETAIL MODAL == */
    .detail-modal { max-width: 800px !important; padding: 0 !important; }
    .detail-grid { display: grid; grid-template-columns: 1fr 1fr; align-items: stretch; }
    .detail-img-side { background: var(--sky); display: flex; align-items: center; justify-content: center; min-height: 400px; }
    .detail-pimg { background: none !important; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
    .detail-pimg img { width: 100%; height: 100%; object-fit: cover; }
    .pemoji.lg { font-size: 8rem; }
    .detail-info-side { padding: 40px; display: flex; flex-direction: column; justify-content: center; }
    .detail-badge { position: relative !important; top: 0 !important; left: 0 !important; margin-bottom: 12px; display: inline-block; }
    .pname-lg { font-family: 'Fraunces', serif; font-size: 2.2rem; font-weight: 900; color: var(--navy); margin-bottom: 10px; line-height: 1.1; }
    .pprice-lg { font-family: 'Fraunces', serif; font-size: 1.8rem; font-weight: 800; color: var(--secondary); margin-bottom: 20px; }
    .pprice-lg small { font-family: 'Plus Jakarta Sans', sans-serif; font-size: .9rem; color: var(--muted); font-weight: 500; }
    .pdesc-lg { font-size: .95rem; line-height: 1.7; color: var(--muted); margin-bottom: 30px; }
    .detail-features { display: flex; gap: 20px; margin-bottom: 30px; }
    .df-item { display: flex; align-items: center; gap: 8px; font-size: .85rem; font-weight: 700; color: var(--navy); }
    .df-item span { font-size: 1.2rem; }

    @media (max-width: 768px) {
      .detail-grid { grid-template-columns: 1fr; }
      .detail-img-side { min-height: 250px; }
      .detail-info-side { padding: 24px; }
    }
  `}</style>
);

export default GlobalStyles;
