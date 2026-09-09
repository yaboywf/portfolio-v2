import { useEffect, useRef, useState } from 'preact/hooks';
import styles from './experience.module.css'
import Typewriter from "./TypeWriter";

const text = `Experiences Overview
-------------------------------------------------------

[ WORK EXPERIENCE ] 
- Temporary Warehouse Assistant @ Singapore Post (Part-Time)
- Temporary Phone Handler @ Mercantile Pacific Asia Pte. Ltd. (Part-Time)
- Assistant Manager @ Advanced Remanufacturing and Technology Centre (ARTC) (Internship)

-------------------------------------------------------
END OF FILE
    `;

const Experience = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const [shouldType, setShouldType] = useState(false);

    useEffect(() => {
        const element = sectionRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldType(true);
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
        <div ref={sectionRef} className={styles.experience_container}>
            <i className="fa-regular fa-briefcase"></i>
            <h2>Work Experience</h2>

            <div className={styles.terminal_container}>
                <div className={styles.terminal_header}>
                    <div className={`${styles.circle} ${styles.red}`}></div>
                    <div className={`${styles.circle} ${styles.yellow}`}></div>
                    <div className={`${styles.circle} ${styles.green}`}></div>
                    <div className={styles.terminal_title}>Terminal</div>
                </div>

                <div className={styles.terminal_body}>
                    <p>$ cat experience.txt</p>
                    {shouldType && <Typewriter text={text} />}
                </div>
            </div>
        </div>
    );
};

export default Experience;