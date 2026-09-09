import styles from './footer.module.css';

const Footer = () => {
    return (
        <footer class={styles.footer}>
            <p>Project made with ❤️</p>
            <p>© {new Date().getFullYear()} Dylan Yeo. All rights reserved.</p>
        </footer>
    );
}

export default Footer;