import styles from "./linkPreview.module.css";

type Props = {
    jxl: string;
    webp: string;
    title: string;
    link: string;
    anchorName: string;
};

const LinkPreview = ({ jxl, webp, title, link, anchorName }: Props) => (
    <div style={{ positionAnchor: anchorName }} className={styles.container}>
        <picture>
            <source srcSet={jxl} type="image/jxl" />
            <img src={webp} alt={title} loading="lazy" decoding="async" />
        </picture>
        <p>{title}</p>
        <p>{link}</p>
    </div>
);

export default LinkPreview;
