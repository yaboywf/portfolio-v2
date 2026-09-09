import { useRef, useEffect, useState } from "preact/hooks";
import data from "./techstack.json"
import styles from "./techstack.module.css"
import { Icon } from "@iconify-icon/react"

type Category = keyof typeof data
type Item = {
    name: string,
    icon: string,
    custom?: boolean
}

const icons: Record<Category, string> = {
    "Frontend": "fa-code",
    "Backend": "fa-server",
    "Databases": "fa-database",
    "DevOps": "fa-infinity",
    "Mobile": "fa-mobile",
    "Game Development": "fa-gamepad"
}

export default function Techstack() {
    const gridRef = useRef<HTMLDivElement>(null);
    const [showIcons, setShowIcons] = useState(false);

    useEffect(() => {
        const element = gridRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShowIcons(true);
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
        <div class={styles.techstack_container}>
            <i class="fa-regular fa-terminal"></i>
            <h2>Tech Stack</h2>
            <p>Tools I use to design, build and ship products</p>

            <div class={styles.techstack_grid} ref={gridRef}>
                {
                    Object.entries(data).map(([key, value], i) => (
                        <div class={styles.techstack_group} key={key} style={{ animationDelay: `${i * 200}ms` }}>
                            <div class={styles.techstack_header}>
                                <i class={`fa-regular ${icons[key as Category]}`}></i>
                                <h3>{key}</h3>
                            </div>
                            <div class={styles.techstack_items}>
                                {value.map((item: Item) => (
                                    <div class={styles.techstack_item}>
                                        {item.custom ? (
                                            <img
                                                src={`/techstack/${item.icon}.svg`}
                                                width="25"
                                                height="25"
                                                loading="lazy"
                                                alt={item.name} />
                                        ) : showIcons ? (
                                            <Icon
                                                icon={item.icon}
                                                width="25"
                                                height="25"
                                            />
                                        ) : (
                                            <span
                                                className={
                                                    styles.icon_placeholder
                                                }
                                                aria-hidden="true"
                                            />
                                        )}
                                        <span>{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}