import { setLenis } from "./smooth-scroll";
import { useEffect } from "preact/hooks";
import Lenis from "lenis";

export default function SmoothScroll() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            smoothWheel: true,
            autoRaf: true,
        });

        setLenis(lenis);

        return () => {
            setLenis(null);
            lenis.destroy();
        };
    }, []);

    return null;
}
