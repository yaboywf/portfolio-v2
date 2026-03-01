import Particles from '../../components/Particles';

const Intro = () => {
    return (
        <div class='intro-container'>
            <Particles
                particleColors={['#ffffff', '#ffffff']}
                particleCount={200}
                particleSpread={10}
                speed={0.5}
                particleBaseSize={100}
                moveParticlesOnHover={true}
                alphaParticles={true}
            />

            <div class='intro-section'>
                <div id="pfp" style={{ background: `url('/images/pfp.webp') center/cover no-repeat` }}></div>
                <div id="intro">
                    <h3>Hello, I'm</h3>
                    <h1>Dylan Yeo</h1>
                    <p>A passionate IT student specialising in web development and modern software engineering.</p>
                </div>
            </div>
        </div>
    );
};

export default Intro;