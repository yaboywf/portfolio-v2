import { hydrate, prerender as ssr } from "preact-iso";

import SmoothScroll from "./components/Lenis/Lenis"
import Intro from './components/Introduction/Intro'
import Techstack from './components/Techstack/Techstack'
import Certificate from './components/Certificate/Certificate';
import Project from './components/Project/Project';
import Experience from './components/Experience/Experience'
import Footer from './components/Footer/Footer'

import "./general.css"
import "./icons.min.css"

function App() {
  return (
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
    </>
  );
}

if (typeof window !== "undefined") {
  hydrate(<App />, document.body);
}

export async function prerender() {
  const result = await ssr(<App />);

  return {
    ...result,
    html: result.html.replace(
      /file:\/\/\/[^"'\s,]+\/headless-prerender\/([^"'\s,]+)/g,
      "/$1"
    ),
    links: new Set(
      [...(result.links ?? [])].filter(
        (link) => !/\.(pdf|webp|png|jpg|svg|ico)(?:[?#]|$)/i.test(link)
      )
    ),
  };
}