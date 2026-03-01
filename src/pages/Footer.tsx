import styles from '@/styles/footer.module.scss';

const Footer = () => {
    return (
        <footer class={styles.footer}>
            <p>© {new Date().getFullYear()} Dylan Yeo. All rights reserved.</p>
        </footer>
    );
}

export default Footer;