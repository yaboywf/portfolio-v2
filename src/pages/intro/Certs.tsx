import { createSignal, onMount, onCleanup } from 'solid-js';
import Scroll from '@/components/Scroll';
import './certs.scss';

const WEBDEV = [
    {
        title: 'Python Basic',
        image: 'hackerrank.webp',
        link: 'https://www.hackerrank.com/certificates/632ad715175d'
    },
    {
        title: 'CSS Basic',
        image: 'hackerrank.webp',
        link: 'https://www.hackerrank.com/certificates/8a3506633a04'
    },
    {
        title: 'SQL Advanced',
        image: 'hackerrank.webp',
        link: 'https://www.hackerrank.com/certificates/c8e92d721d55'
    },
    {
        title: 'Node Basic',
        image: 'hackerrank.webp',
        link: 'https://www.hackerrank.com/certificates/b457e9882934'
    }
];

const OTHERS = [
    {
        title: 'Problem Solving Basic',
        image: 'hackerrank.webp',
        link: 'https://www.hackerrank.com/certificates/229c2962f74e'
    },
    {
        title: 'AWS Cloud Practitioner',
        image: 'aws.webp',
        link: 'https://www.credly.com/badges/a3225cb1-00ff-4622-855c-cbb1b6d9545f'
    },
    {
        title: 'AWS Academy Graduate - Cloud Foundations - Training',
        image: 'aws.webp',
        link: 'https://www.credly.com/badges/bdf09803-0ff2-43c4-b69e-752ae61fa70d'
    },
    {
        title: 'Basic Proficiency in KNIME Analytics Platform',
        image: 'knime.webp',
        link: 'https://www.credly.com/badges/18f7f414-e178-4a23-93a1-109c89e42dd0'
    },
    {
        title: 'Networking Basic',
        image: 'cisco.webp',
        link: "https://www.credly.com/badges/f9fb7756-142f-4ce1-b56f-aece364bfeda/public_url"
    }
];

const Certs = () => {
    const [pageSize, setPageSize] = createSignal(window.innerWidth);
    const handleResize = () => setPageSize(window.innerWidth);

    onMount(() => {
        window.addEventListener('resize', handleResize);
    });

    onCleanup(() => {
        window.removeEventListener("resize", handleResize);
    });

    return (
        <div class="certs">
            <h2 style={{ "grid-area": "header" }}>Certifications</h2>
            <h3 style={{ "grid-area": "sub2" }}>Technical</h3>
            <h3 style={{ "grid-area": "sub1" }}>General</h3>
            <Scroll items={WEBDEV} gridArea="content2" baseWidth={pageSize() >= 500 ? 300 : 200}></Scroll>
            <Scroll items={OTHERS} gridArea="content1" baseWidth={pageSize() >= 500 ? 300 : 200}></Scroll>
        </div>
    );
}

export default Certs