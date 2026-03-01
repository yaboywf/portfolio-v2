import styles from "./card.module.scss";
import type { JSX } from "solid-js";

type CardProps = {
    title: string;
    children: JSX.Element;
}

const Card = (props: CardProps) => {
    return (
        <div class={styles.card}>
            <h3>{props.title}</h3>
            <div class={styles.content}>
                {props.children}
            </div>
        </div>
    );
};

export default Card;