import { useEffect, useMemo, useState } from "preact/hooks";

type TypewriterProps = {
    text: string;
    speed?: number;
};

export default function Typewriter({ text, speed = 5 }: TypewriterProps) {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        setDisplayedText("");

        let index = 0;

        const interval = window.setInterval(() => {
            setDisplayedText((previous) => {
                return previous + text.charAt(index);
            });

            index++;

            if (index >= text.length) {
                window.clearInterval(interval);
            }
        }, speed);

        return () => {
            window.clearInterval(interval);
        };
    }, [text, speed]);

    const parts = useMemo(() => {
        const placeholder = displayedText
            .replace(/br/g, "@@DOUBLE@@")
            .replace(/\n/g, "@@SINGLE@@");

        return placeholder.split(/(@@DOUBLE@@|@@SINGLE@@)/);
    }, [displayedText]);

    return (
        <pre>
            {parts.map((part, index) => {
                if (part === "@@DOUBLE@@") {
                    return (
                        <span key={index}>
                            <br />
                            <br />
                        </span>
                    );
                }

                if (part === "@@SINGLE@@") {
                    return <br key={index} />;
                }

                return <span key={index}>{part}</span>;
            })}
        </pre>
    );
}