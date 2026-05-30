import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useReveal } from "../hooks/useReveal";
import { useToast } from "../hooks/useToast";
import Nav from "./Nav";
import { Hero, Ticker, Products, About, Process, Testimonials, CTA, Footer } from "./PageSections";
import { 
    ProductModal, DeleteModal, ToastContainer, INITIAL_PRODUCTS, CartModal, PaymentModal, TrackOrderModal, 
    ManagementModal, ProductDetailModal, ReviewSubmitModal, AdminPortal, UniversalAddModal, MemberDashboard, DealerDashboard 
} from "./ProductModals";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

function MainApp() {
    const { user } = useAuth();
    const { toasts, show: showToast } = useToast();
    const [products, setProducts] = useState(INITIAL_PRODUCTS);

    const [showAddModal, setShowAddModal] = useState(false);
    const [editProduct, setEditProduct] = useState(null);
    const [deleteProduct, setDeleteProduct] = useState(null);
    const [detailProduct, setDetailProduct] = useState(null);

    // retained state variables needed for app functionality

    const [cart, setCart] = useState([]);
    const [reviews, setReviews] = useState([]);


    const [erpData, setErpData] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [showTrackOrder, setShowTrackOrder] = useState(false);
    const [managementModal, setManagementModal] = useState(null);
    const [showReviewSubmit, setShowReviewSubmit] = useState(false);
    const [showUniversalAdd, setShowUniversalAdd] = useState(null);
    const [editingRecord, setEditingRecord] = useState(null);

    useReveal([products, reviews, user]);

    useEffect(() => {
        fetch(`${API_URL}/products`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    if (data.length > 0) setProducts(data);
                }            })
            .catch(() => {});

        fetch(`${API_URL}/reviews`)
            .then(res => res.json())
            .then(data => { if (Array.isArray(data)) setReviews(data); })
            .catch(() => {});
    }, []);

    useEffect(() => {
        if (user?.role === 'admin') {
            fetch(`${API_URL}/orders`)
                .then(res => res.json())
                .then(data => { if (Array.isArray(data)) setErpData(prev => [...prev, ...data]); })
                .catch(() => {});
            
            fetch(`${API_URL}/dealers`)
                .then(res => res.json())
                .then(data => { if (Array.isArray(data)) setErpData(prev => [...prev, ...data]); })
                .catch(() => {});
        }
    }, [user]);

    const nextId = useRef(products.length + 10);

    const getProductId = (product) => product._id || product.id;

    const handleAddToCart = (product, isDetail = false) => {
        if (isDetail) {
            setDetailProduct(product);
            return;
        }
        const pid = getProductId(product);
        setCart((prev) => {
            const existing = prev.find((item) => getProductId(item) === pid);
            if (existing) return prev.map((item) => (getProductId(item) === pid ? { ...item, qty: item.qty + 1 } : item));
            return [...prev, { ...product, qty: 1 }];
        });
        showToast(`${product.name} added to cart`, "success");
    };

    const handleUpdateQty = (id, delta) => {
        setCart((prev) => prev.map((item) => (getProductId(item) === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item)));
    };

    const handleRemoveFromCart = (id) => {
        setCart((prev) => prev.filter((item) => getProductId(item) !== id));
    };

    const handleCheckoutSuccess = () => {
        setCart([]);
        setShowPayment(false);
        showToast("Order placed successfully!", "success");
    };

    const handleSaveNew = async (form) => {
        try {
            const res = await fetch(`${API_URL}/products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if (res.ok) {
                setProducts(prev => [...prev, data]);
            } else {
                setProducts(prev => [...prev, { ...form, id: ++nextId.current }]);
            }
        } catch {
            setProducts(prev => [...prev, { ...form, id: ++nextId.current }]);
        }
        setShowAddModal(false);
        showToast(`"${form.name}" added successfully`, "success");
    };

    const handleSaveEdit = async (form) => {
        const pid = getProductId(editProduct);
        try {
            const res = await fetch(`${API_URL}/products/${pid}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if (res.ok) {
                setProducts(prev => prev.map(p => getProductId(p) === pid ? data : p));
            } else {
                setProducts(prev => prev.map(p => getProductId(p) === pid ? { ...form, id: pid } : p));
            }
        } catch {
            setProducts(prev => prev.map(p => getProductId(p) === pid ? { ...form, id: pid } : p));
        }
        setEditProduct(null);
        showToast(`"${form.name}" updated`, "info");
    };

    const handleDeleteConfirm = async () => {
        const pid = getProductId(deleteProduct);
        try {
            await fetch(`${API_URL}/products/${pid}`, { method: 'DELETE' });
        } catch {}
        setProducts(prev => prev.filter(p => getProductId(p) !== pid));
        showToast(`"${deleteProduct.name}" deleted`, "error");
        setDeleteProduct(null);
    };

    const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);
    const cartTotal = cart.reduce((acc, item) => {
        const price = parseFloat(item.price.replace(/[^0-9.]/g, ""));
        return acc + (price * item.qty);
    }, 0);





    const fetchReviews = () => {
        fetch(`${API_URL}/reviews`)
            .then(res => res.json())
            .then(data => setReviews(data));
    };



    const handleAdminAction = (moduleName) => {
        if (moduleName === 'Login') {
            return; 
        }
        
        setManagementModal(moduleName);
        let url = `${API_URL}/erp/${moduleName.toLowerCase()}`;
        
        if (moduleName === 'Orders') url = `${API_URL}/orders`;
        else if (moduleName === 'Reviews') url = `${API_URL}/reviews`;
        else if (moduleName === 'Support') url = `${API_URL}/reviews`;
        else if (moduleName === 'Profile') url = `${API_URL}/auth/users`;
        else if (moduleName === 'Dealers') url = `${API_URL}/dealers`;

        fetch(url)
            .then(res => res.json())
            .then(data => setErpData(data))
            .catch(() => showToast(`Could not load ${moduleName} data`, "error"));
    };

    const handleDeleteERP = async (id) => {
        try {
            let url = `${API_URL}/erp/${managementModal.toLowerCase()}/${id}`;
            if (managementModal === 'Orders') url = `${API_URL}/orders/${id}`;
            else if (managementModal === 'Reviews') url = `${API_URL}/reviews/${id}`;
            else if (managementModal === 'Support') url = `${API_URL}/reviews/${id}`;
            else if (managementModal === 'Profile') url = `${API_URL}/auth/users/${id}`;
            else if (managementModal === 'Dealers') url = `${API_URL}/dealers/${id}`;

            await fetch(url, { method: 'DELETE' });
            setErpData(prev => prev.filter(item => item._id !== id));
            showToast(`${managementModal} record removed`, "info");
        } catch { showToast("Error deleting record", "error"); }
    };

    const handleUniversalSave = async (formData) => {
        try {
            let url = `${API_URL}/erp/${managementModal.toLowerCase()}`;
            if (managementModal === 'Orders') url = `${API_URL}/orders`;
            else if (managementModal === 'Reviews') url = `${API_URL}/reviews`;
            else if (managementModal === 'Support') url = `${API_URL}/reviews`;
            else if (managementModal === 'Profile') url = `${API_URL}/auth/users`;
            else if (managementModal === 'Dealers') url = `${API_URL}/dealers`;

            const isEdit = !!formData._id;
            const fetchUrl = isEdit ? `${url}/${formData._id}` : url;

            const res = await fetch(fetchUrl, {
                method: isEdit ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const newData = await res.json();
            
            if (isEdit) {
                setErpData(prev => prev.map(item => item._id === formData._id ? newData : item));
                showToast(`${managementModal} record updated successfully!`, "success");
            } else {
                setErpData(prev => [newData, ...prev]);
                showToast(`${managementModal} record added successfully!`, "success");
            }
            setShowUniversalAdd(null);
            setEditingRecord(null);
        } catch { showToast("Error saving record", "error"); }
    };

    const handleReviewSuccess = () => {
        showToast("Review submitted successfully! 🌱", "success");
        fetchReviews();
    };

    return (
        <>
            <Nav
                onAction={(m) => handleAdminAction(m)}
                cartCount={cartCount}
                onOpenCart={() => setShowCart(true)}
                onOpenTrackOrder={() => setShowTrackOrder(true)}
            />
            <main>
                <Hero />
                <Ticker />
                <Products
                    products={products}
                    adminMode={user?.role === 'admin'}
                    onAdd={() => setShowAddModal(true)}
                    onEdit={setEditProduct}
                    onDelete={setDeleteProduct}
                    onAddToCart={handleAddToCart}
                />

                {user?.role === 'admin' ? (
                    <AdminPortal
                        user={user}
                        onAction={handleAdminAction}
                    />
                ) : user?.role === 'dealer' ? (
                    <DealerDashboard
                        user={user}
                        onAction={handleAdminAction}
                    />
                ) : user ? (
                    <MemberDashboard
                        user={user}
                        onAction={handleAdminAction}
                        onTrack={() => setShowTrackOrder(true)}
                    />
                ) : null}
                <About />
                <Process />
                <Testimonials reviews={reviews} onAddReview={() => setShowReviewSubmit(true)} />
                <CTA />
                <Footer />
            </main>

            {showAddModal && <ProductModal onSave={handleSaveNew} onClose={() => setShowAddModal(false)} />}
            {editProduct && <ProductModal product={editProduct} onSave={handleSaveEdit} onClose={() => setEditProduct(null)} />}
            {deleteProduct && <DeleteModal product={deleteProduct} onClose={() => setDeleteProduct(null)} onConfirm={handleDeleteConfirm} />}
            {detailProduct && <ProductDetailModal product={detailProduct} onClose={() => setDetailProduct(null)} onAddToCart={(p) => handleAddToCart(p, false)} />}

            {showCart && (
                <CartModal
                    items={cart}
                    onClose={() => setShowCart(false)}
                    onUpdateQty={handleUpdateQty}
                    onRemove={handleRemoveFromCart}
                    onCheckout={() => { setShowCart(false); setShowPayment(true); }}
                />
            )}
            {showPayment && (
                <PaymentModal
                    items={cart}
                    total={cartTotal}
                    onClose={() => setShowPayment(false)}
                    onSuccess={handleCheckoutSuccess}
                />
            )}


            <TrackOrderModal
                isOpen={showTrackOrder}
                onClose={() => setShowTrackOrder(false)}
            />

            {managementModal && (
                <ManagementModal
                    type={managementModal}
                    data={erpData}
                    user={user}
                    adminMode={user?.role === 'admin'}
                    onClose={() => { setManagementModal(null); setEditingRecord(null); }}
                    onDelete={handleDeleteERP}
                    onAdd={(t) => { setEditingRecord(null); setShowUniversalAdd(t); }}
                    onEdit={(item) => { setEditingRecord(item); setShowUniversalAdd(managementModal); }}
                />
            )}

            {showUniversalAdd && (
                <UniversalAddModal 
                    type={showUniversalAdd} 
                    record={editingRecord}
                    onClose={() => { setShowUniversalAdd(null); setEditingRecord(null); }} 
                    onSave={handleUniversalSave} 
                />
            )}

            {showReviewSubmit && (
                <ReviewSubmitModal
                    onClose={() => setShowReviewSubmit(false)}
                    onSuccess={handleReviewSuccess}
                />
            )}

            <ToastContainer toasts={toasts} />
        </>
    );
}

export default MainApp;
