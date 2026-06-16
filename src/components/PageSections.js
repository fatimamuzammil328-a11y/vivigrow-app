
export const Hero = () => (
    <section className="hero">
        <div>
            <div className="badge"><span className="badge-dot" /> #1 Agri-Tech Platform in Pakistan</div>
            <h1>Smarter <span>Farming</span><br />Starts Here.</h1>
            <p className="hdesc">Data-driven fertilizer solutions powered by soil science. Maximize yield, reduce waste, and grow sustainably with ViviGrow.</p>
            <div className="hbtns">
                <a href="#products" className="btn-blue">Explore Products</a>
                <a href="#process" className="btn-ghost">See How It Works</a>
            </div>
            <div className="hstats">
                <div><div className="sn">38%</div><div className="sl">Higher Yield</div></div>
                <div><div className="sn">12K+</div><div className="sl">Happy Farmers</div></div>
                <div><div className="sn">48hr</div><div className="sl">Delivery</div></div>
            </div>
        </div>
        <div className="hero-right">
            <div className="dashboard-mock">
                <div className="dash-header"><span className="dash-title">Farm Analytics Dashboard</span><span className="dash-badge">LIVE</span></div>
                <div className="dash-cards">
                    <div className="dc dark"><div className="dc-label">Yield Increase</div><div className="dc-val">+38%</div><div className="dc-sub">vs last season</div></div>
                    <div className="dc"><div className="dc-label">Soil Health</div><div className="dc-val">92/100</div><div className="dc-sub">Excellent grade</div></div>
                </div>
                <div className="bar-row"><div className="bar-label"><span>Nitrogen (N)</span><span>76%</span></div><div className="bar-track"><div className="bar-fill" style={{ width: "76%" }} /></div></div>
                <div className="bar-row"><div className="bar-label"><span>Phosphorus (P)</span><span>58%</span></div><div className="bar-track"><div className="bar-fill" style={{ width: "58%", background: "linear-gradient(90deg,#22c55e,#86efac)" }} /></div></div>
                <div className="bar-row"><div className="bar-label"><span>Potassium (K)</span><span>84%</span></div><div className="bar-track"><div className="bar-fill" style={{ width: "84%", background: "linear-gradient(90deg,#f59e0b,#fcd34d)" }} /></div></div>
                <div className="mini-tag">✓ Recommended: GoldHarvest NPK</div>
            </div>
        </div>
    </section>
);

/* ════════════════════════════════════════════════
   TICKER SECTION
════════════════════════════════════════════════ */
const tickerItems = ["Free Soil Analysis", "ISO 9001 Certified", "48hr Delivery", "100% Organic Options", "Expert Agronomists", "12,000+ Farmers", "Govt Subsidized", "Free Soil Analysis", "ISO 9001 Certified"];
export const Ticker = () => (
    <div className="ticker">
        <div className="t-inner">
            {[...tickerItems, ...tickerItems].map((t, i) => <span className="tick" key={i}><span className="tdot" />{t}</span>)}
        </div>
    </div>
);

/* ════════════════════════════════════════════════
   PRODUCTS SECTION
════════════════════════════════════════════════ */
export const Products = ({ products, adminMode, onAdd, onEdit, onDelete, onAddToCart }) => (
    <section className="products" id="products">
        <div className="sec-head rev">
            <div><div className="sec-kicker">Product Catalog</div><div className="sec-h2">Our <em>Fertilizer</em> Range</div></div>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                {adminMode && <button className="add-product-btn" onClick={onAdd}>＋ Add Product</button>}
                <a href="#products" className="btn-ghost">View All →</a>
            </div>
        </div>
        <div className="prod-grid">
            {products.length === 0 && (
                <div className="empty-state">
                    <div className="empty-icon">🌱</div>
                    <div className="empty-title">No products yet</div>
                    <div className="empty-desc">Add your first product to get started.</div>
                    {adminMode && <button className="add-product-btn" onClick={onAdd} style={{ display: "inline-flex" }}>＋ Add Product</button>}
                </div>
            )}
            {products.map((p, i) => (
                <div className={`pcard rev d${(i % 3) + 1}`} key={p._id || p.id} onClick={() => onAddToCart(p, true)}>
                    <div className={`pimg ${p.imgClass}`}>
                        {p.image ? <img src={p.image} alt={p.name} className="pimg-file" /> : <span className="pemoji">{p.emoji}</span>}
                        <span className="pbadge">{p.badge}</span>
                    </div>
                    {adminMode && (
                        <div className="admin-actions">
                            <button className="act-btn act-edit" onClick={(e) => { e.stopPropagation(); onEdit(p); }}>✏️</button>
                            <button className="act-btn act-delete" onClick={(e) => { e.stopPropagation(); onDelete(p); }}>🗑️</button>
                        </div>
                    )}
                    <div className="pcard-body">
                        <div className="pcat">{p.cat}</div>
                        <div className="pname">{p.name}</div>
                        <div className="pdesc">{p.desc}</div>
                        <div className="pfoot">
                            <div><span className="pprice">{p.price}</span><span className="pper">{p.per}</span></div>
                            <button className="cart-btn" onClick={(e) => { e.stopPropagation(); onAddToCart(p); }}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </section>
);

/* ════════════════════════════════════════════════
   ABOUT SECTION
════════════════════════════════════════════════ */
const features = [
    { icon: "🧪", name: "Lab Tested", desc: "Every batch ISO-lab certified before delivery." },
    { icon: "🌍", name: "Eco-Friendly", desc: "Low-runoff formulas protect local ecosystems." },
    { icon: "📊", name: "Data-Driven", desc: "Real-time soil insights power recommendations." },
    { icon: "🚜", name: "Farm Support", desc: "Expert agronomists available 7 days a week." },
];
export const About = () => (
    <section className="about" id="about">
        <div className="about-grid">
            <div className="rev">
                <div className="sec-kicker">Our Mission</div>
                <h2 className="sec-h2" style={{ marginBottom: 20 }}>Rooted in <em>science,</em><br />powered by data</h2>
                <p className="sec-body">ViviGrow was founded by agronomists and data scientists to help farmers across Pakistan achieve higher yields with smarter inputs. Our platform combines soil science with real-time analytics for precision agriculture.</p>
                <a href="#products" className="btn-blue">Discover Our Range →</a>
            </div>
            <div className="feat-grid rev">
                {features.map((f, i) => <div className="feat" key={i}><div className="ficon">{f.icon}</div><div className="fname">{f.name}</div><div className="fdesc">{f.desc}</div></div>)}
            </div>
        </div>
    </section>
);

/* ════════════════════════════════════════════════
   PROCESS SECTION
════════════════════════════════════════════════ */
const steps = [
    { n: "01", t: "Soil Analysis", d: "Submit your sample or use our instant online soil profile tool." },
    { n: "02", t: "Custom Plan", d: "Our agronomists generate a tailored fertilizer plan for your crop." },
    { n: "03", t: "Fast Delivery", d: "Order online and get delivery to your farm within 48 hours." },
    { n: "04", t: "Track Growth", d: "Monitor yield data season over season via our dashboard." },
];
export const Process = () => (
    <section className="process" id="process">
        <div className="process-center rev"><div className="sec-kicker" style={{ justifyContent: "center", display: "flex" }}>Our Process</div><h2 className="sec-h2">How ViviGrow <em>works</em></h2></div>
        <div className="steps">
            {steps.map((s, i) => <div className={`step rev d${i + 1}`} key={i}><div className="step-num">{s.n}</div><div className="step-t">{s.t}</div><div className="step-d">{s.d}</div></div>)}
        </div>
    </section>
);

/* ════════════════════════════════════════════════
   TESTIMONIALS SECTION
════════════════════════════════════════════════ */
/* const testimonials = [
    { text: '"Switched to GoldHarvest NPK and saw a 42% increase in wheat yield. The soil testing was a game-changer!"', avatar: "👨‍🌾", name: "Tariq Ali", role: "Wheat Farmer, Punjab" },
    { text: '"BioRoot transformed my rice paddies. Soil is healthier, water retention improved, using 20% less water now."', avatar: "👨‍🌾", name: "Usman Jamil", role: "Rice Farmer, Sindh" },
    { text: '"Delivery on time, packaging excellent. Agronomist support helped schedule applications correctly."', avatar: "👨‍🌾", name: "Bilal Shafiq", role: "Orchard Owner, KPK" },
]; */
export const Testimonials = ({ reviews = [], onAddReview }) => {
    const displayReviews = reviews.length > 0 ? reviews : [
        { userName: "Tariq Ali", userRole: "Punjab", comment: '"Saw a 42% increase in yield!"', rating: 5 },
        { userName: "Usman Jamil", userRole: "Sindh", comment: '"BioRoot transformed my rice paddies."', rating: 5 },
    ];

    return (
        <section className="testi" id="testi">
            <div className="testi-center rev"><div className="sec-kicker" style={{ justifyContent: "center", display: "flex" }}>Farmer Stories</div><h2 className="sec-h2">What our <em>farmers</em> say</h2></div>
            <div className="tgrid">
                {displayReviews.map((t, i) => (
                    <div className={`tcard rev d${(i % 3) + 1}`} key={i}>
                        <div className="tstars">{"★".repeat(t.rating || 5)}</div>
                        <p className="ttext">{t.comment || t.text}</p>
                        <div className="tauthor">
                            <div className="tavatar">👨‍🌾</div>
                            <div>
                                <div className="taname">{t.userName || t.name}</div>
                                <div className="tarole">{t.userRole || t.role}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 40 }}>
                <p style={{ fontSize: "0.9rem", color: "var(--muted)" }}>Share your experience with us.</p>
                <button className="btn-ghost" style={{ marginTop: 10 }} onClick={onAddReview}>Submit a Review →</button>
            </div>
        </section>
    );
};

/* ════════════════════════════════════════════════
   CTA SECTION
════════════════════════════════════════════════ */
export const CTA = () => (
    <section className="cta">
        <div className="rev">
            <h2>Ready to grow <em>smarter?</em></h2>
            <p>Join 12,000+ farmers. Get a free soil test with your first order.</p>
            <div className="cta-btns"><a href="#products" className="btn-w">Shop Products</a><a href="#process" className="btn-ghost-w">Contact Us →</a></div>
        </div>
    </section>
);

/* ════════════════════════════════════════════════
   FOOTER
════════════════════════════════════════════════ */
export const Footer = () => (
    <footer>
        <div className="foot-top">
            <div>
                <a href="#/" className="flogo"><span className="flogo-icon">🌿</span>Vivi<span>Grow</span></a>
                <p className="fdesc">Precision fertilizer solutions for modern South Asian agriculture. Scientifically formulated. Farmer-tested.</p>
                <div className="socials">{["f", "in", "tw", "yt"].map((s) => <a href="#/" className="soc" key={s}>{s}</a>)}</div>
            </div>
            <div className="foot-col"><h4>Products</h4><ul>{["NPK Fertilizers", "Nitrogen Series", "Organic Range", "Micronutrients"].map((l) => <li key={l}><a href="#/">{l}</a></li>)}</ul></div>
            <div className="foot-col"><h4>Company</h4><ul>{["About Us", "Research", "Careers", "Dealer Network"].map((l) => <li key={l}><a href="#/">{l}</a></li>)}</ul></div>
            <div className="foot-col"><h4>Support</h4><ul>{["Soil Test", "Agronomist Chat", "Track Order", "Contact"].map((l) => <li key={l}><a href="#/">{l}</a></li>)}</ul></div>
        </div>
        <div className="foot-bottom"><span className="copy">© 2026 ViviGrow Pvt Ltd. All rights reserved.</span><span className="copy">Made with 🌱 for farmers of Pakistan</span></div>
    </footer>
);
