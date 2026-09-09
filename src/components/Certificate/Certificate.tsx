import { useEffect, useRef, useState } from 'preact/hooks';
import LinkPreview from '../LinkPreview/LinkPreview';
import Certificates from './certificate.json';
import styles from './certificate.module.css';

type HoveredLink = {
    certificate: (typeof Certificates)[number];
    anchorName: string;
};

const Certificate = () => {
    const [hoveredLink, setHoveredLink] = useState<HoveredLink | null>(null);
    const [collapsed, setCollapsed] = useState<boolean>(true)
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    element.classList.add(styles.animate);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.2,
            }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return (
        <div className={styles.certificate_container}>
            <i className="fa-regular fa-file-certificate"></i>
            <h2>Certificates</h2>

            <div className={styles.certificate_list} ref={ref} data-collapsed={collapsed}>
                {Certificates.map((cert, index) => (
                    <div key={index} className={`${styles.certificate_item}`} style={{ animationDelay: `${index * 0.1}s` }}>
                        <img src={`/certs/${cert.image}`} alt={cert.title} loading="lazy" />
                        <h3>{cert.title}</h3>
                        <p>{cert.issuer}</p>
                        <a
                            href={cert.link}
                            onMouseEnter={() => setHoveredLink({ certificate: cert, anchorName: `--certificate-${index}` })}
                            onMouseLeave={() => setHoveredLink(null)}
                            target="_blank" rel="noopener noreferrer"
                            style={{ anchorName: `--certificate-${index}` }}
                            aria-label={`View ${cert.title} certificate`}
                        >
                            <i className="fa-solid fa-arrow-up-right-from-square"></i>
                        </a>
                    </div>
                ))}
            </div>

            <button onClick={() => setCollapsed(prev => !prev)}>Show {collapsed ? "More" : "Less"}</button>

            {hoveredLink && <LinkPreview
                key={hoveredLink.anchorName}
                src={hoveredLink.certificate.preview}
                title={hoveredLink.certificate.title}
                link={hoveredLink.certificate.link}
                anchorName={hoveredLink.anchorName}
            />}
        </div>
    )
}

export default Certificate;