import { createSignal, onMount, onCleanup, For } from "solid-js";
import styles from "./textEffect.module.scss";

type BlurTextProps = {
    text: string;
    delay?: number;
    animateBy?: 'words' | 'characters';
    threshold?: number;
    rootMargin?: string;
}

const BlurText = (props: BlurTextProps) => {
    const {
        text = "",
        delay = 200,
        animateBy = "words",
        threshold = 0.1,
        rootMargin = "0px"
    } = props;

    const elements = animateBy === 'words' ? text.split(' ') : text.split('');
    const [inView, setInView] = createSignal(false);
    let ref!: HTMLParagraphElement;

    onMount(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.unobserve(ref);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(ref);
        onCleanup(() => observer.disconnect());
    });

    return (
        <p ref={ref} class={styles.className} style={{ display: 'flex', 'flex-wrap': 'wrap' }}>
            <For each={elements}>
                {(segment, index) => (
                    <span
                        class={`${styles.blur_segment} ${inView() ? styles.show : ""}`}
                        style={{ transition: `all 0.6s ease ${(index() * delay) / 1000}s` }}
                    >
                        {segment === " " ? "\u00A0" : segment}
                        {animateBy === "words" &&
                            index() < elements.length - 1 &&
                            "\u00A0"}
                    </span>
                )}
            </For>
        </p>
    );
};

export default BlurText;
