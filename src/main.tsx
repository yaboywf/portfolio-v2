import { render } from 'preact'

import SmoothScroll from "./components/Lenis/Lenis"
import Intro from './components/Introduction/Intro'
import Techstack from './components/Techstack/Techstack'
import Certificate from './components/Certificate/Certificate';
import Project from './components/Project/Project';
import Experience from './components/Experience/Experience'
import Footer from './components/Footer/Footer'

import "./general.css"
import "./icons.css"

render(
    <>
        <div className="background"></div>
        <SmoothScroll />
        <main>
            <Intro />
            <Techstack />
            <Certificate />
            <Experience />
            <Project />
            <Footer />
        </main>
    </>,
    document.body
)