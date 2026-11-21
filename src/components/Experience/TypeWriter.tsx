import { useEffect, useState } from "preact/hooks";

type TypewriterProps = {
    text: string;
    speed?: number;
};

export default function Typewriter({ text, speed = 20 }: TypewriterProps) {
    const [length, setLength] = useState(0);

    useEffect(() => {
        setLength(0);

        if (!text.length) return;

        let index = 0;

        const interval = window.setInterval(() => {
            index++;
            setLength(index);

            if (index >= text.length) {
                clearInterval(interval);
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed]);

    return <pre>{text.slice(0, length)}</pre>;
}
