import { createSignal, createEffect, onCleanup, For } from "solid-js";

type TypewriterProps = {
    text: string;
    speed?: number;
}

export default function Typewriter({ text, speed = 10 }: TypewriterProps) {
    const [displayedText, setDisplayedText] = createSignal("");
    let interval: number | undefined;

    createEffect(() => {
        setDisplayedText("");
        let i = 0;

        clearInterval(interval);
        interval = window.setInterval(() => {
            setDisplayedText(prev => prev + text.charAt(i));
            i++;

            if (i >= text.length) clearInterval(interval);
        }, speed);

        onCleanup(() => clearInterval(interval));
    });

    const parts = () => {
        const placeholder = displayedText()
            .replace(/br/g, "@@DOUBLE@@")
            .replace(/\n/g, "@@SINGLE@@");

        return placeholder.split(/(@@DOUBLE@@|@@SINGLE@@)/);
    };

    return (
        <pre>
            <For each={parts()}>
                {(part) => {
                    if (part === "@@DOUBLE@@") {
                        return (
                            <>
                                <br />
                                <br />
                            </>
                        );
                    }

                    if (part === "@@SINGLE@@") {
                        return <br />;
                    }

                    return <span>{part}</span>;
                }}
            </For>
        </pre>
    );
}
