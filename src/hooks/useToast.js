import { useState } from "react";

export function useToast() {
    const [toasts, setToasts] = useState([]);
    const show = (message, type = "success") => {
        const id = Date.now();
        setToasts((t) => [...t, { id, message, type }]);
        setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
    };
    return { toasts, show };
}
