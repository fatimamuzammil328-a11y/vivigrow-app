import { useEffect } from "react";

export function useReveal(deps = []) {
    useEffect(() => {
        const els = document.querySelectorAll(".rev");
        const obs = new IntersectionObserver(
            (entries) => entries.forEach((x) => { 
                if (x.isIntersecting) { 
                    x.target.classList.add("on"); 
                    obs.unobserve(x.target); 
                } 
            }),
            { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
        );
        els.forEach((e) => {
            if (!e.classList.contains("on")) {
                obs.observe(e);
            }
        });
        return () => obs.disconnect();
    }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}
