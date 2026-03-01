import { render } from "solid-js/web";
import { Route, HashRouter } from "@solidjs/router";
import { Suspense, lazy } from "solid-js";

import Layout from "@/Layout";
import Loading from "@/pages/Loading";

const Main = lazy(() => import("@/pages/intro/Main"));
const Experience = lazy(() => import("@/pages/experience/Experience"));
const Contact = lazy(() => import("./pages/contact/Contact"));
// const GL = lazy(() => import("./pages/gl/GL"));

render(() => (
    <HashRouter>
        <Route path="/" component={Layout}>
            <Suspense fallback={<Loading />}>
                <Route path="/" component={Main} />
                <Route path="/experience" component={Experience} />
                <Route path="/contact" component={Contact} />
                {/* <Route path="/gl" component={GL} /> */}
            </Suspense>
        </Route>
    </HashRouter>
), document.getElementById("root")!);