import styles from "./linkPreview.module.css"

type Props = {
    src: string,
    title: string,
    link: string,
    anchorName: string
}

const LinkPreview = ({ src, title, link, anchorName }: Props) => {
    console.log(anchorName)
    return (
        <div style={{ positionAnchor: anchorName.replaceAll(" ", "") }} className={styles.container}>
            <img src={src} alt={src} loading="lazy" />
            <p>{title}</p>
            <p>{link}</p>
        </div>
    )
}

export default LinkPreview