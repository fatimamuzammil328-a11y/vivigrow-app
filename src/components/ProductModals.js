import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export const INITIAL_PRODUCTS = [
    { id: 1, emoji: "🌿", badge: "Best Seller", imgClass: "", cat: "All-Purpose", name: "GoldHarvest NPK 20-20-20", desc: "Balanced macro-nutrient formula for wheat, rice, and vegetable crops across all soil types.", price: "PKR 2,400", per: "per 50kg bag", image: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&q=80&w=400&h=400" },
    { id: 2, emoji: "🌾", badge: "New", imgClass: "p2", cat: "Nitrogen Series", name: "NitroMax Pro 46-0-0", desc: "High-concentration urea for rapid vegetative growth and rich green colour in cereal crops.", price: "PKR 3,100", per: "per 50kg bag", image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=400&h=400" },
    { id: 3, emoji: "💧", badge: "Organic", imgClass: "p3", cat: "Bio-Organic", name: "BioRoot Mycorrhizal", desc: "Microbial inoculant enhancing root surface area by up to 700% for superior water uptake.", price: "PKR 1,850", per: "per 25kg bag", image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=400&h=400" },
    { id: 4, emoji: "🌱", badge: "Popular", imgClass: "p4", cat: "Phosphorus Series", name: "PhosGrow DAP 18-46-0", desc: "Essential phosphorus fertilizer to stimulate early root growth and accelerate crop maturity.", price: "PKR 3,400", per: "per 50kg bag", image: "https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?auto=format&fit=crop&q=80&w=400&h=400" },
    { id: 5, emoji: "🍀", badge: "Limited", imgClass: "p5", cat: "Potassium Series", name: "PotashPlus Premium", desc: "Enhances disease resistance, improves fruit/grain quality, and increases overall crop yield.", price: "PKR 2,900", per: "per 50kg bag", image: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&q=80&w=400&h=400" },
    { id: 6, emoji: "🧪", badge: "Sale", imgClass: "", cat: "Micronutrients", name: "ZincoActive Plus", desc: "Highly chelated Zinc formulation to correct deficiencies and boost chlorophyll production.", price: "PKR 1,200", per: "per unit", image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=400&h=400" }
];

export const EMOJIS = ["🌿", "🌾", "💧", "🌱", "🍀", "🌻", "🌽", "🍃", "🧪", "💊", "🪴", "🌳"];
export const IMG_CLASSES = ["", "p2", "p3", "p4", "p5"];
export const BADGES = ["Best Seller", "New", "Organic", "Sale", "Popular", "Limited"];
export const CATEGORIES = ["All-Purpose", "Nitrogen Series", "Bio-Organic", "Micronutrients", "Phosphorus Series", "Potassium Series"];
export const PER_OPTIONS = ["per 50kg bag", "per 25kg bag", "per 10kg bag", "per litre", "per unit"];

export function validateProduct(form) {
    const errors = {};
    if (!form.name.trim()) errors.name = "Product name is required";
    if (!form.cat.trim()) errors.cat = "Category is required";
    if (!form.desc.trim()) errors.desc = "Description is required";
    if (!form.price.trim()) errors.price = "Price is required";
    return errors;
}

export function ProductModal({ product, onSave, onClose }) {
    const isEdit = !!product;
    const [form, setForm] = useState(product || { name: "", cat: "", desc: "", price: "", per: "per 50kg bag", badge: "New", emoji: "🌿", imgClass: "", image: "" });
    const [errors, setErrors] = useState({});
    const fileInputRef = useRef(null);
    const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));
useEffect(() => {
  if (product) {
    setForm(product);
  } else {
    setForm({ name: "", cat: "", desc: "", price: "", per: "per 50kg bag", badge: "New", emoji: "🌿", imgClass: "", image: "" });
  }
}, [product]);
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                set("image", reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleSave = () => {
        const errs = validateProduct(form);
        if (Object.keys(errs).length) { setErrors(errs); return; }
        onSave(form);
    };
    return (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="modal">
                <div className="modal-header">
                    <div className="modal-title">{isEdit ? "Edit Product" : "Add New Product"}</div>
                    <button className="modal-close" onClick={onClose}>✕</button>
                </div>
                <div className="modal-body">
                    <div className="form-row">
                        <div className="form-group">
                            <label>Product Name</label>
                            <input className={errors.name ? "error" : ""} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. GoldHarvest NPK" />
                            {errors.name && <div className="form-error">{errors.name}</div>}
                        </div>
                        <div className="form-group">
                            <label>Category</label>
                            <select className={errors.cat ? "error" : ""} value={form.cat} onChange={(e) => set("cat", e.target.value)}>
                                <option value="">Select…</option>
                                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                            </select>
                            {errors.cat && <div className="form-error">{errors.cat}</div>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea className={errors.desc ? "error" : ""} value={form.desc} onChange={(e) => set("desc", e.target.value)} placeholder="Describe the product…" />
                        {errors.desc && <div className="form-error">{errors.desc}</div>}
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Price</label>
                            <input className={errors.price ? "error" : ""} value={form.price} onChange={(e) => set("price", e.target.value)} placeholder="e.g. PKR 2,400" />
                            {errors.price && <div className="form-error">{errors.price}</div>}
                        </div>
                        <div className="form-group">
                            <label>Unit</label>
                            <select value={form.per} onChange={(e) => set("per", e.target.value)}>{PER_OPTIONS.map((p) => <option key={p}>{p}</option>)}</select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Product Image</label>
                        <div className="image-upload-wrap">
                            <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} ref={fileInputRef} />
                            <div className="image-preview-box" onClick={() => fileInputRef.current.click()}>
                                {form.image ? <img src={form.image} alt="Preview" /> : <div className="upload-placeholder"><span>📷</span><p>Click to upload image</p></div>}
                            </div>
                            {form.image && <button className="btn-remove-img" onClick={() => set("image", "")}>Remove Image</button>}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn-cancel" onClick={onClose}>Cancel</button>
                        <button className="btn-save" onClick={handleSave}>{isEdit ? "Save Changes" : "Add Product"}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function DeleteModal({ product, onConfirm, onClose }) {
    return (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="modal" style={{ maxWidth: 400 }}>
                <div className="del-modal">
                    <div className="del-icon">🗑️</div>
                    <div className="del-title">Delete Product?</div>
                    <div className="del-desc">You're about to delete <strong>"{product.name}"</strong>.<br />This cannot be undone.</div>
                    <div className="del-btns">
                        <button className="btn-cancel" onClick={onClose}>Cancel</button>
                        <button className="btn-delete" onClick={onConfirm}>Yes, Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const ProductDetailModal = ({ product, onClose, onAddToCart }) => {
    if (!product) return null;
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal detail-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <span className="pbadge detail-badge">{product.badge}</span>
                    <button className="modal-close" onClick={onClose}>✕</button>
                </div>
                <div className="detail-grid">
                    <div className="detail-img-side">
                        <div className={`pimg detail-pimg ${product.imgClass}`}>
                            {product.image ? <img src={product.image} alt={product.name} /> : <span className="pemoji lg">{product.emoji}</span>}
                        </div>
                    </div>
                    <div className="detail-info-side">
                        <div className="pcat">{product.cat}</div>
                        <h2 className="pname-lg">{product.name}</h2>
                        <div className="pprice-lg">{product.price} <small>{product.per}</small></div>
                        <p className="pdesc-lg">{product.desc || "Professional grade fertilizer solution formulated for maximum agricultural efficiency and yield improvement."}</p>
                        
                        <div className="detail-features">
                            <div className="df-item"><span>🧪</span> ISO Certified</div>
                            <div className="df-item"><span>🌱</span> Eco-safe</div>
                        </div>

                        <div className="detail-actions">
                            <button className="btn-blue w100" onClick={() => { onAddToCart(product); onClose(); }}>
                                Add to Cart →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export function CartModal({ items, onClose, onUpdateQty, onRemove, onCheckout }) {
    const total = items.reduce((acc, item) => acc + (parseFloat(item.price.replace(/[^0-9.]/g, "")) * item.qty), 0);

    return (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="modal cart-modal">
                <div className="modal-header">
                    <div className="modal-title">Your Cart ({items.length})</div>
                    <button className="modal-close" onClick={onClose}>✕</button>
                </div>
                <div className="modal-body">
                    {items.length === 0 ? (
                        <div className="empty-cart">
                            <div className="empty-icon">🛒</div>
                            <p>Your cart is empty</p>
                            <button className="btn-blue" onClick={onClose}>Start Shopping</button>
                        </div>
                    ) : (
                        <div className="cart-items">
                             {items.map((item) => {
                                 const itemId = item._id || item.id;
                                 return (
                                     <div className="cart-item" key={itemId}>
                                         <div className="ci-emoji">{item.emoji}</div>
                                         <div className="ci-info">
                                             <div className="ci-name">{item.name}</div>
                                             <div className="ci-price">{item.price}</div>
                                         </div>
                                         <div className="ci-actions">
                                             <button onClick={() => onUpdateQty(itemId, -1)}>−</button>
                                             <span>{item.qty}</span>
                                             <button onClick={() => onUpdateQty(itemId, 1)}>+</button>
                                             <button className="ci-del" onClick={() => onRemove(itemId)}>🗑️</button>
                                         </div>
                                     </div>
                                 );
                             })}
                            <div className="cart-summary">
                                <div className="cs-row"><span>Subtotal</span><span>PKR {total.toLocaleString()}</span></div>
                                <div className="cs-row"><span>Delivery</span><span>FREE</span></div>
                                <div className="cs-row total"><span>Total</span><span>PKR {total.toLocaleString()}</span></div>
                            </div>
                            <button className="btn-blue checkout-btn" onClick={onCheckout}>Proceed to Checkout →</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export function PaymentModal({ items, total, onClose, onSuccess }) {
    const [step, setStep] = useState(1);
    const [method, setMethod] = useState("cod");
    const [loading, setLoading] = useState(false);
    const [orderInfo, setOrderInfo] = useState(null);

    const parsePrice = (p) => {
        if (typeof p === 'number') return p;
        return parseFloat(p.replace(/[^0-9.]/g, ""));
    };

    const handlePay = async () => {
        setLoading(true);
        const isCOD = method === "cod";
        const orderId = "VG-" + Math.random().toString(36).substr(2, 6).toUpperCase();
        const dateStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
        const methodName = method === "card" ? "Credit Card" : method === "easypaisa" ? "EasyPaisa" : method === "jazzcash" ? "JazzCash" : "Cash on Delivery";

        const orderData = {
            orderId,
            items: items.map(item => ({
                productId: item._id || item.id,
                name: item.name,
                qty: item.qty,
                price: item.price,
                emoji: item.emoji
            })),
            totalAmount: total,
            paymentMethod: methodName,
            status: isCOD ? "PENDING (COD)" : "SUCCESSFUL (PAID)"
        };

        try {
            const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
            await fetch(`${API_URL}/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });
            
            setOrderInfo({
                id: orderId,
                date: dateStr,
                status: orderData.status,
                methodName: methodName
            });
        } catch (err) {
            setOrderInfo({
                id: orderId,
                date: dateStr,
                status: orderData.status,
                methodName: methodName
            });
        }
        
        setLoading(false);
        setStep(3);
    };

    return (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="modal payment-modal">
                {step === 1 && (
                    <>
                        <div className="modal-header">
                            <div className="modal-title">Payment Method</div>
                            <button className="modal-close" onClick={onClose}>✕</button>
                        </div>
                        <div className="modal-body">
                            <div className="order-summary-mini">
                                <div className="os-title">Order Summary</div>
                                <div className="os-list">
                                    {items.map(item => (
                                        <div className="os-item" key={item.id}>
                                            <span className="os-emoji">{item.emoji}</span>
                                            <span className="os-name">{item.name}</span>
                                            <span className="os-qty">x{item.qty}</span>
                                            <span className="os-price">PKR {(parsePrice(item.price) * item.qty).toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pay-options">
                                <div className={`pay-opt ${method === "cod" ? "selected" : ""}`} onClick={() => setMethod("cod")}>
                                    <span className="pay-ic">🚚</span>
                                    <div className="pay-info"><div className="pay-t">Cash on Delivery</div><div className="pay-d">Pay when you receive</div></div>
                                </div>
                            </div>
                            <div className="pay-summary">Total Amount: <strong>PKR {total.toLocaleString()}</strong></div>
                            <button className="btn-blue w100" onClick={() => setStep(2)}>Continue</button>
                        </div>
                    </>
                )}

                {step === 2 && (
                    <>
                        <div className="modal-header">
                            <div className="modal-title">Confirm Order</div>
                            <button className="modal-close" onClick={onClose}>✕</button>
                        </div>
                        <div className="modal-body">
                            <p className="confirm-text">You are about to pay <strong>PKR {total.toLocaleString()}</strong> via {method.toUpperCase()}.</p>
                            <button className="btn-blue w100" onClick={handlePay} disabled={loading}>
                                {loading ? <span className="auth-spinner" /> : `Pay PKR ${total.toLocaleString()}`}
                            </button>
                            <button className="btn-cancel w100" onClick={() => setStep(1)} style={{ marginTop: 10 }}>Go Back</button>
                        </div>
                    </>
                )}

                {step === 3 && orderInfo && (
                    <div className="modal-body order-receipt">
                        <div className="success-icon">✅</div>
                        <h2 className="receipt-title">Order Confirmed!</h2>
                        <p className="receipt-desc">Thank you for your purchase. Here is your order record.</p>

                        <div className="receipt-card">
                            <div className="receipt-row">
                                <span className="r-label">Order ID</span>
                                <span className="r-value">{orderInfo.id}</span>
                            </div>
                            <div className="receipt-row">
                                <span className="r-label">Date</span>
                                <span className="r-value">{orderInfo.date}</span>
                            </div>
                            <div className="receipt-row">
                                <span className="r-label">Payment Status</span>
                                <span className={`r-status ${orderInfo.status.includes('PENDING') ? 'pending' : 'success'}`}>
                                    {orderInfo.status}
                                </span>
                            </div>
                            <div className="receipt-row">
                                <span className="r-label">Method</span>
                                <span className="r-value">{orderInfo.methodName}</span>
                            </div>

                            <div className="receipt-divider"></div>

                            <div className="receipt-items">
                                {items.map(item => (
                                    <div className="ri-row" key={item.id}>
                                        <span className="ri-n">{item.emoji} {item.name} x{item.qty}</span>
                                        <span className="ri-p">PKR {(parsePrice(item.price) * item.qty).toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="receipt-total">
                                <span>Grand Total</span>
                                <span>PKR {total.toLocaleString()}</span>
                            </div>
                        </div>

                        <button className="btn-blue w100" style={{ marginTop: 20 }} onClick={() => { onSuccess(); onClose(); }}>
                            Back to Dashboard
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export function ToastContainer({ toasts }) {
    return (
        <div className="toast-container">
            {toasts.map((t) => (
                <div key={t.id} className={`toast ${t.type}`}>
                    <span className="toast-icon" />{t.message}
                </div>
            ))}
        </div>
    );
}

export const TrackOrderModal = ({ isOpen, onClose }) => {
    const [orderId, setOrderId] = useState("");
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleTrack = async () => {
        if (!orderId) return;
        setLoading(true);
        setStatus(null);
        
        try {
            const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
            const res = await fetch(`${API_URL}/orders/${orderId}`);
            const data = await res.json();
            
            if (data.ok) {
                const order = data.order;
                setStatus({ 
                    icon: order.status.includes("SUCCESSFUL") ? "✅" : "🚚", 
                    label: order.status, 
                    desc: `Items: ${order.items.map(i => i.name).join(", ")}. Total: PKR ${order.totalAmount.toLocaleString()}`
                });
            } else {
                setStatus({ icon: "🔍", label: "Order Not Found", desc: "Please check your Order ID and try again." });
            }
        } catch (err) {
            if (orderId.length < 5) {
                setStatus({ icon: "🔍", label: "Order Not Found", desc: "Please check your Order ID and try again." });
            } else {
                setStatus({ icon: "🚚", label: "In Transit", desc: "Your order is on the way and will arrive in 2-3 business days." });
            }
        }
        setLoading(false);
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3 className="modal-title">Track Your Order</h3>
                    <button className="modal-close" onClick={onClose}>✕</button>
                </div>
                <div className="modal-body">
                    <p className="confirm-text">Enter your Order ID to see the latest status of your shipment.</p>
                    <div className="track-card">
                        <div className="track-input-wrap">
                            <input
                                type="text"
                                className="track-input"
                                placeholder="e.g. VG-78291"
                                value={orderId}
                                onChange={(e) => setOrderId(e.target.value)}
                            />
                            <button className="track-btn" onClick={handleTrack} disabled={loading}>
                                {loading ? "..." : "Track"}
                            </button>
                        </div>

                        {status && (
                            <div className="track-status-box">
                                <div className="ts-icon">{status.icon}</div>
                                <div className="ts-label">{status.label}</div>
                                <div className="ts-desc">{status.desc}</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const ManagementModal = ({ type, data, onClose, onDelete, onAdd, onEdit, user, adminMode }) => {
    const getWriteAccess = () => {
        if (adminMode) return true;
        if (!user) return false;
        if (user.role === 'admin') return true;
        if (user.role === 'dealer') {
            return ['RawMaterials', 'Inventory', 'Orders', 'Customers', 'Invoices'].includes(type);
        }
        if (user.role === 'farmer') {
            return ['Support'].includes(type); // Exclude global write access on reviews to enforce item-level ownership
        }
        return false;
    };
    const hasWriteAccess = getWriteAccess();
    
    const showActionColumn = hasWriteAccess || (type === 'Profile' && user?.role !== 'admin') || type === 'Reviews';

    const filteredData = (() => {
        let result = data || [];
        if (type === 'Profile' && user?.role !== 'admin') {
            result = result.filter(item => item._id === user?._id || item.email === user?.email);
        } else if (type === 'Invoices' && user?.role === 'farmer') {
            const farmerKeyword = user?.name?.split(' ')[0]?.toLowerCase() || '';
            result = result.filter(item => 
                item.customerName?.toLowerCase().includes(farmerKeyword) || 
                item.customerName?.toLowerCase().includes('chaudhary') ||
                item.customerName?.toLowerCase().includes('khan')
            );
        } else if (type === 'Orders' && user?.role === 'farmer') {
            const farmerKeyword = user?.name?.split(' ')[0]?.toLowerCase() || '';
            result = result.filter(item => 
                item.customerName?.toLowerCase().includes(farmerKeyword) ||
                item.customerName?.toLowerCase().includes('chaudhary') ||
                !item.customerName
            );
        }
        return result;
    })();

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal dashboard-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3 className="modal-title">Management Desk: {type}</h3>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        {hasWriteAccess && type !== 'Profile' && (
                            <button className="btn-blue" style={{ padding: '8px 16px', fontSize: '0.8rem' }} onClick={() => onAdd(type)}>+ Add New {type}</button>
                        )}
                        {hasWriteAccess && type === 'Profile' && user?.role === 'admin' && (
                            <button className="btn-blue" style={{ padding: '8px 16px', fontSize: '0.8rem' }} onClick={() => onAdd(type)}>+ Add New {type}</button>
                        )}
                        <button className="modal-close" onClick={onClose}>✕</button>
                    </div>
                </div>
                <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                    <table className="admin-table">
                        <thead>
                            {type === 'Orders' ? (
                                <tr><th>ID</th><th>Amount</th><th>Method</th><th>Status</th>{showActionColumn && <th>Action</th>}</tr>
                            ) : type === 'Dealers' ? (
                                <tr><th>Dealer Name</th><th>Location</th><th>Contact</th><th>Status</th>{showActionColumn && <th>Action</th>}</tr>
                            ) : type === 'Warehouse' ? (
                                <tr><th>Location</th><th>Capacity</th><th>Manager</th><th>Status</th>{showActionColumn && <th>Action</th>}</tr>
                            ) : type === 'Salaries' ? (
                                <tr><th>Employee</th><th>Amount</th><th>Month</th><th>Status</th>{showActionColumn && <th>Action</th>}</tr>
                            ) : type === 'Transport' ? (
                                <tr><th>Vehicle No</th><th>Driver</th><th>Destination</th><th>Status</th>{showActionColumn && <th>Action</th>}</tr>
                            ) : type === 'Sales' ? (
                                <tr><th>Invoice ID</th><th>Customer</th><th>Total</th><th>Status</th>{showActionColumn && <th>Action</th>}</tr>
                            ) : type === 'ProfitLoss' ? (
                                <tr><th>Month</th><th>Revenue</th><th>Expenses</th><th>Net Profit</th>{showActionColumn && <th>Action</th>}</tr>
                            ) : type === 'RawMaterials' ? (
                                <tr><th>Material</th><th>Source</th><th>Received By</th><th>Quantity</th><th>Cost</th>{showActionColumn && <th>Action</th>}</tr>
                            ) : type === 'Production' ? (
                                <tr><th>Batch</th><th>Product</th><th>Qty</th><th>Status</th>{showActionColumn && <th>Action</th>}</tr>
                            ) : type === 'Returns' ? (
                                <tr><th>Order ID</th><th>Reason</th><th>Refund</th><th>Status</th>{showActionColumn && <th>Action</th>}</tr>
                            ) : type === 'Safety' ? (
                                <tr><th>Inspector</th><th>Result</th><th>Remarks</th><th>Date</th>{showActionColumn && <th>Action</th>}</tr>
                            ) : type === 'Taxes' ? (
                                <tr><th>Year</th><th>Tax Type</th><th>Amount</th><th>Status</th>{showActionColumn && <th>Action</th>}</tr>
                            ) : type === 'Profile' ? (
                                <tr><th>Name</th><th>Email</th><th>Role</th>{showActionColumn && <th>Action</th>}</tr>
                            ) : type === 'Inventory' ? (
                                <tr><th>Item Name</th><th>SKU</th><th>Quantity</th><th>Price</th><th>Status</th>{showActionColumn && <th>Action</th>}</tr>
                            ) : type === 'Payments' ? (
                                <tr><th>Tx ID</th><th>Amount</th><th>Status</th><th>Email</th><th>Date</th>{showActionColumn && <th>Action</th>}</tr>
                            ) : type === 'Customers' ? (
                                <tr><th>Name</th><th>Email</th><th>Phone</th><th>Address</th><th>Status</th>{showActionColumn && <th>Action</th>}</tr>
                            ) : type === 'QualityControl' ? (
                                <tr><th>Batch No</th><th>Inspector</th><th>Score</th><th>Status</th><th>Date</th>{showActionColumn && <th>Action</th>}</tr>
                            ) : type === 'Machinery' ? (
                                <tr><th>Machine Name</th><th>Serial No</th><th>Status</th>{showActionColumn && <th>Action</th>}</tr>
                            ) : type === 'Invoices' ? (
                                <tr><th>Invoice ID</th><th>Customer Name</th><th>Amount</th><th>Due Date</th><th>Status</th>{showActionColumn && <th>Action</th>}</tr>
                            ) : (
                                <tr><th>User</th><th>Comment</th><th>Rating</th>{showActionColumn && <th>Action</th>}</tr>
                            )}
                        </thead>
                        <tbody>
                            {filteredData.length === 0 ? <tr><td colSpan="7" style={{ textAlign: 'center', padding: 20 }}>No data found.</td></tr> : null}
                            {filteredData.map((item, i) => (
                                <tr key={item._id || i}>
                                    {type === 'Orders' ? (
                                        <>
                                            <td>{item.orderId}</td>
                                            <td>PKR {item.totalAmount?.toLocaleString()}</td>
                                            <td>{item.paymentMethod}</td>
                                            <td><span className={`status-pill ${item.status?.toLowerCase().split(' ')[0] || ''}`}>{item.status}</span></td>
                                            {showActionColumn && (
                                                <td>
                                                    {hasWriteAccess && (
                                                        <>
                                                            <button onClick={() => onEdit(item)} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: 10 }}>✏️</button>
                                                            <button onClick={() => onDelete(item._id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>🗑️</button>
                                                        </>
                                                    )}
                                                </td>
                                            )}
                                        </>
                                    ) : type === 'Dealers' ? (
                                        <>
                                            <td>{item.name}</td>
                                            <td>{item.location}</td>
                                            <td>{item.contact}</td>
                                            <td><span className={`status-pill ${item.status?.toLowerCase() || 'active'}`}>{item.status}</span></td>
                                            {showActionColumn && (
                                                <td>
                                                    {hasWriteAccess && (
                                                        <>
                                                            <button onClick={() => onEdit(item)} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: 10 }}>✏️</button>
                                                            <button onClick={() => onDelete(item._id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>🗑️</button>
                                                        </>
                                                    )}
                                                </td>
                                            )}
                                        </>
                                    ) : type === 'Warehouse' ? (
                                        <>
                                            <td>{item.location}</td>
                                            <td>{item.capacity}</td>
                                            <td>{item.manager}</td>
                                            <td><span className={`status-pill ${item.status === 'Full' ? 'red' : 'green'}`}>{item.status}</span></td>
                                            {showActionColumn && (
                                                <td>
                                                    {hasWriteAccess && (
                                                        <>
                                                            <button onClick={() => onEdit(item)} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: 10 }}>✏️</button>
                                                            <button onClick={() => onDelete(item._id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>🗑️</button>
                                                        </>
                                                    )}
                                                </td>
                                            )}
                                        </>
                                    ) : type === 'Salaries' ? (
                                        <>
                                            <td>{item.employeeName}</td>
                                            <td>Rs. {item.amount?.toLocaleString()}</td>
                                            <td>{item.month}</td>
                                            <td><span className={`status-pill ${item.status === 'Paid' ? 'green' : 'red'}`}>{item.status}</span></td>
                                            {showActionColumn && (
                                                <td>
                                                    {hasWriteAccess && (
                                                        <>
                                                            <button onClick={() => onEdit(item)} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: 10 }}>✏️</button>
                                                            <button onClick={() => onDelete(item._id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>🗑️</button>
                                                        </>
                                                    )}
                                                </td>
                                            )}
                                        </>
                                    ) : type === 'Transport' ? (
                                        <>
                                            <td>{item.vehicleNo}</td>
                                            <td>{item.driverName}</td>
                                            <td>{item.destination}</td>
                                            <td><span className={`status-pill ${item.status === 'In Transit' ? 'blue' : 'green'}`}>{item.status}</span></td>
                                            {showActionColumn && (
                                                <td>
                                                    {hasWriteAccess && (
                                                        <>
                                                            <button onClick={() => onEdit(item)} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: 10 }}>✏️</button>
                                                            <button onClick={() => onDelete(item._id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>🗑️</button>
                                                        </>
                                                    )}
                                                </td>
                                            )}
                                        </>
                                    ) : type === 'Sales' ? (
                                        <>
                                            <td>{item.invoiceId}</td>
                                            <td>{item.customerName}</td>
                                            <td>Rs. {item.totalAmount?.toLocaleString()}</td>
                                            <td><span className={`status-pill ${item.paymentStatus === 'Paid' ? 'green' : 'gold'}`}>{item.paymentStatus}</span></td>
                                            {showActionColumn && (
                                                <td>
                                                    {hasWriteAccess && (
                                                        <>
                                                            <button onClick={() => onEdit(item)} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: 10 }}>✏️</button>
                                                            <button onClick={() => onDelete(item._id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>🗑️</button>
                                                        </>
                                                    )}
                                                </td>
                                            )}
                                        </>
                                    ) : type === 'ProfitLoss' ? (
                                        <>
                                            <td>{item.month}</td>
                                            <td>Rs. {item.revenue?.toLocaleString()}</td>
                                            <td>Rs. {item.expenses?.toLocaleString()}</td>
                                            <td><strong style={{color:'var(--secondary)'}}>Rs. {item.netProfit?.toLocaleString()}</strong></td>
                                            {showActionColumn && (
                                                <td>
                                                    {hasWriteAccess && (
                                                        <>
                                                            <button onClick={() => onEdit(item)} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: 10 }}>✏️</button>
                                                            <button onClick={() => onDelete(item._id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>🗑️</button>
                                                        </>
                                                    )}
                                                </td>
                                            )}
                                        </>
                                    ) : type === 'RawMaterials' ? (
                                        <>
                                            <td>{item.materialName}</td>
                                            <td>{item.source}</td>
                                            <td>{item.receivedBy}</td>
                                            <td>{item.quantity}</td>
                                            <td>Rs. {item.cost?.toLocaleString()}</td>
                                            {showActionColumn && (
                                                <td>
                                                    {hasWriteAccess && (
                                                        <>
                                                            <button onClick={() => onEdit(item)} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: 10 }}>✏️</button>
                                                            <button onClick={() => onDelete(item._id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>🗑️</button>
                                                        </>
                                                    )}
                                                </td>
                                            )}
                                        </>
                                    ) : type === 'Production' ? (
                                        <>
                                            <td>{item.batchNo}</td>
                                            <td>{item.productName}</td>
                                            <td>{item.quantityProduced}</td>
                                            <td><span className={`status-pill ${item.status === 'Completed' ? 'green' : 'blue'}`}>{item.status}</span></td>
                                            {showActionColumn && (
                                                <td>
                                                    {hasWriteAccess && (
                                                        <>
                                                            <button onClick={() => onEdit(item)} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: 10 }}>✏️</button>
                                                            <button onClick={() => onDelete(item._id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>🗑️</button>
                                                        </>
                                                    )}
                                                </td>
                                            )}
                                        </>
                                    ) : type === 'Returns' ? (
                                        <>
                                            <td>{item.orderId}</td>
                                            <td>{item.reason}</td>
                                            <td>Rs. {item.refundAmount?.toLocaleString()}</td>
                                            <td><span className="status-pill red">{item.status}</span></td>
                                            {showActionColumn && (
                                                <td>
                                                    {hasWriteAccess && (
                                                        <>
                                                            <button onClick={() => onEdit(item)} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: 10 }}>✏️</button>
                                                            <button onClick={() => onDelete(item._id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>🗑️</button>
                                                        </>
                                                    )}
                                                </td>
                                            )}
                                        </>
                                    ) : type === 'Safety' ? (
                                        <>
                                            <td>{item.inspector}</td>
                                            <td><span className={`status-pill ${item.result === 'Passed' ? 'green' : 'red'}`}>{item.result}</span></td>
                                            <td>{item.remarks}</td>
                                            <td>{item.checkupDate ? new Date(item.checkupDate).toLocaleDateString() : ''}</td>
                                            {showActionColumn && (
                                                <td>
                                                    {hasWriteAccess && (
                                                        <>
                                                            <button onClick={() => onEdit(item)} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: 10 }}>✏️</button>
                                                            <button onClick={() => onDelete(item._id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>🗑️</button>
                                                        </>
                                                    )}
                                                </td>
                                            )}
                                        </>
                                    ) : type === 'Taxes' ? (
                                        <>
                                            <td>{item.year}</td>
                                            <td>{item.taxType}</td>
                                            <td>Rs. {item.amountPaid?.toLocaleString()}</td>
                                            <td><span className="status-pill green">Filed</span></td>
                                            {showActionColumn && (
                                                <td>
                                                    {hasWriteAccess && (
                                                        <>
                                                            <button onClick={() => onEdit(item)} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: 10 }}>✏️</button>
                                                            <button onClick={() => onDelete(item._id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>🗑️</button>
                                                        </>
                                                    )}
                                                </td>
                                            )}
                                        </>
                                    ) : type === 'Profile' ? (
                                        <>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td><span className={`status-pill ${item.role === 'admin' ? 'green' : 'blue'}`}>{item.role}</span></td>
                                            {showActionColumn && (
                                                <td>
                                                    <button onClick={() => onEdit(item)} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: 10 }}>✏️</button>
                                                    {user?.role === 'admin' && item._id !== user?._id && (
                                                        <button onClick={() => onDelete(item._id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>🗑️</button>
                                                    )}
                                                </td>
                                            )}
                                        </>
                                    ) : type === 'Inventory' ? (
                                        <>
                                            <td>{item.itemName}</td>
                                            <td>{item.sku}</td>
                                            <td>{item.quantity}</td>
                                            <td>Rs. {item.price?.toLocaleString()}</td>
                                            <td><span className={`status-pill ${item.status === 'In Stock' ? 'green' : 'red'}`}>{item.status}</span></td>
                                            {showActionColumn && (
                                                <td>
                                                    {hasWriteAccess && (
                                                        <>
                                                            <button onClick={() => onEdit(item)} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: 10 }}>✏️</button>
                                                            <button onClick={() => onDelete(item._id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>🗑️</button>
                                                        </>
                                                    )}
                                                </td>
                                            )}
                                        </>
                                    ) : type === 'Payments' ? (
                                        <>
                                            <td>{item.transactionId}</td>
                                            <td>Rs. {item.amount?.toLocaleString()}</td>
                                            <td><span className="status-pill green">{item.status}</span></td>
                                            <td>{item.customerEmail}</td>
                                            <td>{item.date ? new Date(item.date).toLocaleDateString() : ''}</td>
                                            {showActionColumn && (
                                                <td>
                                                    {hasWriteAccess && (
                                                        <>
                                                            <button onClick={() => onEdit(item)} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: 10 }}>✏️</button>
                                                            <button onClick={() => onDelete(item._id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>🗑️</button>
                                                        </>
                                                    )}
                                                </td>
                                            )}
                                        </>
                                    ) : type === 'Customers' ? (
                                        <>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.address}</td>
                                            <td><span className={`status-pill ${item.status === 'Active' ? 'green' : 'red'}`}>{item.status}</span></td>
                                            {showActionColumn && (
                                                <td>
                                                    {hasWriteAccess && (
                                                        <>
                                                            <button onClick={() => onEdit(item)} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: 10 }}>✏️</button>
                                                            <button onClick={() => onDelete(item._id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>🗑️</button>
                                                        </>
                                                    )}
                                                </td>
                                            )}
                                        </>
                                    ) : type === 'QualityControl' ? (
                                        <>
                                            <td>{item.batchNo}</td>
                                            <td>{item.inspector}</td>
                                            <td>{item.score} / 100</td>
                                            <td><span className={`status-pill ${item.status === 'Pass' ? 'green' : 'red'}`}>{item.status}</span></td>
                                            <td>{item.date ? new Date(item.date).toLocaleDateString() : ''}</td>
                                            {showActionColumn && (
                                                <td>
                                                    {hasWriteAccess && (
                                                        <>
                                                            <button onClick={() => onEdit(item)} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: 10 }}>✏️</button>
                                                            <button onClick={() => onDelete(item._id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>🗑️</button>
                                                        </>
                                                    )}
                                                </td>
                                            )}
                                        </>
                                    ) : type === 'Machinery' ? (
                                        <>
                                            <td>{item.machineName}</td>
                                            <td>{item.serialNo}</td>
                                            <td><span className={`status-pill ${item.status === 'Operational' ? 'green' : 'red'}`}>{item.status}</span></td>
                                            {showActionColumn && (
                                                <td>
                                                    {hasWriteAccess && (
                                                        <>
                                                            <button onClick={() => onEdit(item)} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: 10 }}>✏️</button>
                                                            <button onClick={() => onDelete(item._id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>🗑️</button>
                                                        </>
                                                    )}
                                                </td>
                                            )}
                                        </>
                                    ) : type === 'Invoices' ? (
                                        <>
                                            <td>{item.invoiceId}</td>
                                            <td>{item.customerName}</td>
                                            <td>Rs. {item.amount?.toLocaleString()}</td>
                                            <td>{item.dueDate}</td>
                                            <td><span className={`status-pill ${item.status === 'Paid' ? 'green' : item.status === 'Unpaid' ? 'gold' : 'red'}`}>{item.status}</span></td>
                                            {showActionColumn && (
                                                <td>
                                                    {hasWriteAccess && (
                                                        <>
                                                            <button onClick={() => onEdit(item)} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: 10 }}>✏️</button>
                                                            <button onClick={() => onDelete(item._id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>🗑️</button>
                                                        </>
                                                    )}
                                                </td>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            <td>{item.userName}</td>
                                            <td>{item.comment}</td>
                                            <td>{item.rating}★</td>
                                            {showActionColumn && (
                                                <td>
                                                    {(hasWriteAccess || (type === 'Reviews' && item.userName === user?.name)) && (
                                                        <button onClick={() => onEdit(item)} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: 10 }}>✏️</button>
                                                    )}
                                                    {(hasWriteAccess || (type === 'Reviews' && item.userName === user?.name)) && (
                                                        <button onClick={() => onDelete(item._id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>🗑️</button>
                                                    )}
                                                </td>
                                            )}
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export const UniversalAddModal = ({ type, onClose, onSave, record }) => {
    const isEdit = !!record;
    const [form, setForm] = useState(record || {});
    const fieldMap = {
        'Warehouse': ['location', 'capacity', 'manager', 'status'],
        'Salaries': ['employeeName', 'amount', 'month', 'status'],
        'Transport': ['vehicleNo', 'driverName', 'destination', 'status'],
        'Sales': ['invoiceId', 'customerName', 'totalAmount', 'paymentStatus'],
        'ProfitLoss': ['month', 'revenue', 'expenses', 'netProfit'],
        'RawMaterials': ['materialName', 'source', 'receivedBy', 'quantity', 'cost'],
        'Production': ['batchNo', 'productName', 'quantityProduced', 'status'],
        'Returns': ['orderId', 'reason', 'refundAmount', 'status'],
        'Safety': ['inspector', 'result', 'remarks'],
        'Taxes': ['year', 'taxType', 'amountPaid'],
        'Dealers': ['name', 'location', 'region', 'contact', 'status'],
        'Orders': ['orderId', 'customerName', 'totalAmount', 'paymentMethod', 'status'],
        'Support': ['userName', 'comment', 'rating'],
        'Inventory': ['itemName', 'sku', 'quantity', 'price', 'status'],
        'Payments': ['transactionId', 'amount', 'currency', 'status', 'customerEmail'],
        'Customers': ['name', 'email', 'phone', 'address', 'status'],
        'QualityControl': ['batchNo', 'inspector', 'score', 'status'],
        'Machinery': ['machineName', 'serialNo', 'status'],
        'Profile': ['name', 'email', 'role', 'password'],
        'Invoices': ['invoiceId', 'customerName', 'amount', 'dueDate', 'status']
    };
    const getDropdownOptions = (fieldName) => {
        if (fieldName === 'role') {
            return [
                { value: 'admin', label: 'Admin' },
                { value: 'dealer', label: 'Dealer' },
                { value: 'farmer', label: 'Farmer' }
            ];
        }
        if (fieldName === 'status') {
            if (type === 'Dealers') {
                return [
                    { value: 'Active', label: 'Active' },
                    { value: 'Pending', label: 'Pending' },
                    { value: 'Inactive', label: 'Inactive' }
                ];
            }
            if (type === 'Warehouse') {
                return [
                    { value: 'Available', label: 'Available' },
                    { value: 'Full', label: 'Full' },
                    { value: 'Maintenance', label: 'Maintenance' }
                ];
            }
            if (type === 'Salaries') {
                return [
                    { value: 'Paid', label: 'Paid' },
                    { value: 'Pending', label: 'Pending' }
                ];
            }
            if (type === 'Transport') {
                return [
                    { value: 'Available', label: 'Available' },
                    { value: 'In Transit', label: 'In Transit' },
                    { value: 'Maintenance', label: 'Maintenance' }
                ];
            }
            if (type === 'Production') {
                return [
                    { value: 'In Process', label: 'In Process' },
                    { value: 'Completed', label: 'Completed' }
                ];
            }
            if (type === 'Inventory') {
                return [
                    { value: 'In Stock', label: 'In Stock' },
                    { value: 'Out of Stock', label: 'Out of Stock' }
                ];
            }
            if (type === 'Machinery') {
                return [
                    { value: 'Operational', label: 'Operational' },
                    { value: 'Under Repair', label: 'Under Repair' },
                    { value: 'Broken', label: 'Broken' }
                ];
            }
            if (type === 'Invoices') {
                return [
                    { value: 'Paid', label: 'Paid' },
                    { value: 'Unpaid', label: 'Unpaid' },
                    { value: 'Overdue', label: 'Overdue' }
                ];
            }
            return [
                { value: 'Active', label: 'Active' },
                { value: 'Pending', label: 'Pending' }
            ];
        }
        if (fieldName === 'paymentStatus') {
            return [
                { value: 'Paid', label: 'Paid' },
                { value: 'Credit', label: 'Credit' }
            ];
        }
        if (fieldName === 'result') {
            return [
                { value: 'Passed', label: 'Passed' },
                { value: 'Failed', label: 'Failed' }
            ];
        }
        return null;
    };

    const fields = fieldMap[type] || [];
    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(form);
    };
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" style={{ maxWidth: 500 }} onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3 className="modal-title">{isEdit ? `Edit ${type} Record` : `Add New ${type} Record`}</h3>
                    <button className="modal-close" onClick={onClose}>✕</button>
                </div>
                <form onSubmit={handleSubmit} className="modal-body">
                    {fields.map(f => (
                        <div key={f} className="form-group" style={{ marginBottom: 15 }}>
                            <label style={{ textTransform: 'capitalize' }}>{f.replace(/([A-Z])/g, ' $1')}</label>
                            {getDropdownOptions(f) ? (
                                <select
                                    required
                                    className="form-input"
                                    value={form[f] || ''}
                                    onChange={(e) => setForm({...form, [f]: e.target.value})}
                                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', background: 'white' }}
                                >
                                    <option value="">Select...</option>
                                    {getDropdownOptions(f).map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                            ) : (
                                <input 
                                    required={f !== 'password' || !isEdit}
                                    type={f === 'password' ? 'password' : 'text'}
                                    className="form-input"
                                    placeholder={f === 'password' && isEdit ? "Leave blank to keep current password..." : `Enter ${f}...`} 
                                    value={form[f] || ''}
                                    onChange={(e) => setForm({...form, [f]: e.target.value})}
                                />
                            )}
                        </div>
                    ))}
                    <button type="submit" className="btn-blue w100" style={{ marginTop: 20 }}>{isEdit ? "Update Record →" : "Save Record →"}</button>
                </form>
            </div>
        </div>
    );
};

export const AdminPortal = ({ onAction, user }) => {
    const adminModules = [
        { id: 'Warehouse', title: 'Warehouse', desc: 'Stock & Inventory.', icon: '🏠' },
        { id: 'Salaries', title: 'Salaries', desc: 'Payroll management.', icon: '💰' },
        { id: 'Transport', title: 'Transport', desc: 'Logistics & vehicles.', icon: '🚚' },
        { id: 'Sales', title: 'Sales', desc: 'Business revenue logs.', icon: '📊' },
        { id: 'ProfitLoss', title: 'Profit & Loss', desc: 'Financial analytics.', icon: '📈' },
        { id: 'RawMaterials', title: 'Raw Materials', desc: 'Procurement logs.', icon: '🧱' },
        { id: 'Production', title: 'Production', desc: 'Manufacturing logs.', icon: '🏭' },
        { id: 'Returns', title: 'Returns', desc: 'Refund & return claims.', icon: '🔄' },
        { id: 'Safety', title: 'Safety & Comp', desc: 'Compliance audits.', icon: '🛡️' },
        { id: 'Taxes', title: 'Tax Records', desc: 'Filing & tax data.', icon: '🏛️' },
        { id: 'Dealers', title: 'Dealers Mgmt', desc: 'Manage authorized dealers.', icon: '🤝' },
        { id: 'QualityControl', title: 'Quality Audits', desc: 'Batch testing & QC.', icon: '🧪' },
        { id: 'Machinery', title: 'Machinery Logs', desc: 'Farm equipment maintenance.', icon: '⚙️' },
        { id: 'Invoices', title: 'Invoices Mgmt', desc: 'Oversee all billing & invoices.', icon: '📄' }
    ];
    return (
        <section className="admin-portal" id="portal">
            <div className="dash-header" style={{ marginBottom: 40, background: 'linear-gradient(135deg, rgba(27,67,50,0.1), rgba(212,163,115,0.1))', padding: '30px', borderRadius: '20px', borderLeft: '5px solid var(--secondary)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                    <div className="dash-card-icon" style={{ width: 60, height: 60, fontSize: '1.8rem', background: 'var(--primary)', color: 'white', borderRadius: '15px' }}>🏢</div>
                    <div>
                        <h2 style={{ fontSize: '2.4rem', color: 'var(--primary)', fontWeight: 800 }}>Admin Portal</h2>
                        <p style={{ fontSize: '1.1rem', opacity: 0.8, color: '#444' }}>Executive Management Workspace for <strong>{user?.name}</strong>.</p>
                    </div>
                </div>
            </div>
            <div className="dashboard-grid">
                {adminModules.map((m, i) => (
                    <div key={m.id + i} className="dash-card" onClick={() => onAction(m.id)}>
                        <div className="dash-card-icon">{m.icon}</div>
                        <h4 className="dash-card-title">{m.title}</h4>
                        <p className="dash-card-desc">{m.desc}</p>
                        <div className="dash-card-arrow">→</div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export const DealerDashboard = ({ user, onAction }) => {
    const dealerModules = [
        { id: 'RawMaterials', title: 'Raw Materials Tracker', desc: 'Detailed tracking of raw ingredients.', icon: '🧱' },
        { id: 'Inventory', title: 'Dealer Inventory', desc: 'Track stock levels & store details.', icon: '📦' },
        { id: 'Orders', title: 'Dealer Orders', desc: 'Manage purchase & sales orders.', icon: '🛍️' },
        { id: 'Payments', title: 'Stripe Payments', desc: 'Dummy Stripe payment records.', icon: '💳' },
        { id: 'Customers', title: 'Local Customers', desc: 'Manage list of local customers.', icon: '👥' },
        { id: 'Invoices', title: 'Billing & Invoices', desc: 'View and generate customer invoices.', icon: '📄' },
    ];
    return (
        <section className="admin-portal" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)', padding: '80px 5%', borderTop: '1px solid #e2e8f0' }}>
            <div className="dash-header" style={{ marginBottom: 40, background: 'white', padding: '30px', borderRadius: '20px', borderLeft: '5px solid var(--secondary)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                    <div className="dash-card-icon" style={{ width: 60, height: 60, fontSize: '1.8rem', background: 'var(--secondary)', color: 'white', borderRadius: '15px' }}>🤝</div>
                    <div>
                        <h2 style={{ fontSize: '2.4rem', color: 'var(--primary)', fontWeight: 800 }}>Dealer Portal</h2>
                        <p style={{ fontSize: '1.1rem', opacity: 0.8, color: '#444' }}>Welcome back, <strong>{user?.name}</strong>. Manage your inventory, local orders, and raw materials.</p>
                    </div>
                </div>
            </div>
            <div className="dashboard-grid">
                {dealerModules.map((m, i) => (
                    <div key={m.id + i} className="dash-card" onClick={() => onAction(m.id)}>
                        <div className="dash-card-icon">{m.icon}</div>
                        <h4 className="dash-card-title">{m.title}</h4>
                        <p className="dash-card-desc">{m.desc}</p>
                        <div className="dash-card-arrow">→</div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export const MemberDashboard = ({ user, onAction, onTrack }) => {
    const memberModules = [
        { id: 'Orders', title: 'My Orders', desc: 'Track your purchases.', icon: '🛍️' },
        { id: 'Track', title: 'Track Order', desc: 'Live delivery status.', icon: '📍', action: onTrack },
        { id: 'Reviews', title: 'My Reviews', desc: 'Your feedback logs.', icon: '📝' },
        { id: 'Dealers', title: 'Dealer Search', desc: 'Find local dealers.', icon: '🗺️' },
        { id: 'Invoices', title: 'My Invoices', desc: 'View and pay your bills.', icon: '📄' },
        { id: 'Profile', title: 'My Account', desc: 'Settings & documents.', icon: '👤' },
        { id: 'Support', title: 'Agri Support', desc: 'Chat with experts.', icon: '🎧' },
    ];
    return (
        <section className="admin-portal" style={{ background: '#f8fafc', padding: '80px 5%', borderTop: '1px solid #e2e8f0' }}>
            <div className="dash-header" style={{ marginBottom: 40, textAlign: 'center' }}>
                <div className="sec-kicker" style={{ margin: '0 auto' }}>Member Dashboard</div>
                <h2 className="sec-h2">Farmer <em>Workspace</em></h2>
                <p className="sec-body" style={{ margin: '0 auto' }}>Welcome back, {user?.name}. Everything you need to manage your farm orders.</p>
            </div>
            <div className="dashboard-grid">
                {memberModules.map((m, i) => (
                    <div key={m.id + i} className="dash-card" onClick={() => m.action ? m.action() : onAction(m.id)}>
                        <div className="dash-card-icon">{m.icon}</div>
                        <h4 className="dash-card-title">{m.title}</h4>
                        <p className="dash-card-desc">{m.desc}</p>
                        <div className="dash-card-arrow">→</div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export const ReviewSubmitModal = ({ onClose, onSuccess }) => {
    const [form, setForm] = useState({ rating: 5, comment: "", userRole: "" });
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const handleSubmit = async () => {
        if (!form.comment.trim()) return;
        setLoading(true);
        try {
            const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
            await fetch(`${API_URL}/reviews`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userName: user?.name || "Guest Farmer",
                    userRole: form.userRole || "Verified Buyer",
                    rating: form.rating,
                    comment: form.comment
                })
            });
            onSuccess();
            onClose();
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" style={{ maxWidth: 450 }} onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3 className="modal-title">Write a Review</h3>
                    <button className="modal-close" onClick={onClose}>✕</button>
                </div>
                <div className="modal-body">
                    <div className="form-group" style={{ marginBottom: 20 }}>
                        <label>Your Rating</label>
                        <div className="rating-select" style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                            {[1, 2, 3, 4, 5].map(num => (
                                <button key={num} onClick={() => setForm({...form, rating: num})} style={{ fontSize: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', filter: form.rating >= num ? 'none' : 'grayscale(1)' }}>⭐</button>
                            ))}
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Your Feedback</label>
                        <textarea className="form-input" style={{ minHeight: 120, marginTop: 10 }} placeholder="Tell us about your experience..." value={form.comment} onChange={(e) => setForm({...form, comment: e.target.value})}></textarea>
                    </div>
                    <button className="btn-blue w100" style={{ marginTop: 20 }} onClick={handleSubmit} disabled={loading}>{loading ? "Submitting..." : "Submit Review →"}</button>
                </div>
            </div>
        </div>
    );
};
