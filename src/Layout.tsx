import { createEffect } from "solid-js";
import type { JSX } from "solid-js";
import { useLocation } from "@solidjs/router";
import "@/styles/icons.scss";

export default function Layout(props: { children?: JSX.Element }) {
    const location = useLocation();

    createEffect(() => {
        location.pathname;
        location.hash;

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant"
        });
    });

    return props.children;
}
