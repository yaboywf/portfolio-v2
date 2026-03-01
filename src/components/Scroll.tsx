import { createSignal, onMount, onCleanup, For } from 'solid-js';
import './scroll.scss';

const GAP = 16;

interface CarouselProps {
    items: any[];
    baseWidth?: number;
    [key: string]: any;
}

export default function Carousel(props: CarouselProps) {
    const { items, baseWidth = 300, ...rest } = props;

    const containerPadding = 16;
    const itemWidth = baseWidth - containerPadding * 2;
    const trackItemOffset = itemWidth + GAP;

    const carouselItems = [...items, items[0]];
    const [currentIndex, setCurrentIndex] = createSignal(0);
    const [isHovered, setIsHovered] = createSignal(false);

    let containerRef: HTMLDivElement | undefined;

    onMount(() => {
        if (!containerRef) return;
        const enter = () => setIsHovered(true);
        const leave = () => setIsHovered(false);

        containerRef.addEventListener('mouseenter', enter);
        containerRef.addEventListener('mouseleave', leave);

        const timer = setInterval(() => {
            if (isHovered()) return;

            setCurrentIndex((prev) => {
                if (prev >= carouselItems.length - 1) return 0;
                return prev + 1;
            });
        }, 3000);

        onCleanup(() => {
            containerRef.removeEventListener("mouseenter", enter);
            containerRef.removeEventListener("mouseleave", leave);
            clearInterval(timer);
        });
    });

    const handleClick = (link: string) => {
        window.open(link, "_blank");
    };

    return (
        <div
            ref={containerRef}
            class="carousel-container"
            style={{
                width: `${baseWidth}px`,
                height: `${baseWidth}px`,
                'border-radius': '50%',
                overflow: "hidden",
                ...rest
            }}
        >
            <div
                class="carousel-track"
                style={{
                    display: "flex",
                    gap: `${GAP}px`,
                    transform: `translateX(-${currentIndex() * trackItemOffset}px)`,
                    transition: "transform 0.6s ease"
                }}
            >
                <For each={carouselItems}>
                    {(item) => (
                        <div
                            class="carousel-item"
                            style={{
                                width: `${itemWidth}px`,
                                height: `${itemWidth}px`,
                                "border-radius": "50%",
                                flex: "0 0 auto"
                            }}
                        >
                            <div class="carousel-item-header">
                                <img
                                    src={`/images/certs/${item.image}`}
                                    class="carousel-icon-container"
                                />
                            </div>

                            <div class="carousel-item-content">
                                <div class="carousel-item-title">{item.title}</div>

                                {baseWidth >= 300 && (
                                    <button onClick={() => handleClick(item.link)}>
                                        Show Me!
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </For>
            </div>

            {baseWidth >= 300 && (
                <div class="carousel-indicators">
                    <For each={items}>
                        {(_, index) => (
                            <div
                                class={`carousel-indicator ${currentIndex() % items.length === index()
                                        ? "active"
                                        : "inactive"
                                    }`}
                                onClick={() => setCurrentIndex(index())}
                            />
                        )}
                    </For>
                </div>
            )}
        </div>
    );
}
