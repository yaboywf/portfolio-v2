import { useState, useEffect } from "preact/hooks";
import styles from "./footer.module.css";

const Footer = () => {
    const [year, setYear] = useState<number | null>(null);

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    return (
        <footer class={styles.footer}>
            <p>Project made with ❤️</p>
            <p>© {year ?? 2026} Dylan Yeo. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
