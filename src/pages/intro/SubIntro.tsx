import "./intro.scss";
import Card from "@/components/Card";

const SubIntro = () => {
    return (
        <div class="subintro-container">
            <Card title={"Education"}>
                <div class="education-container">
                    <img src="/images/tp.webp" alt="Temasek Polytechnic Logo" />
                    <p>Temasek Polytechnic <br /><span>2024 - 2027</span></p>
                    <p>Diploma in Information Technology</p>
                </div>

                <div class="education-container">
                    <img src="/images/gm.webp" alt="Geylang Methodist School Logo" />
                    <p>Geylang Methodist School (Secondary) <br /><span>2022 - 2024</span></p>
                    <p>GCE Ordinary Level | 7 Credits</p>
                </div>
            </Card>

            <Card title={"About Me"}>
                <p>
                    I’m a Year 2 IT student at Temasek Polytechnic with a strong interest in building practical digital solutions.
                    <br /><br />
                    I’m always learning new technologies, taking on projects, and improving my skills through hands-on experience.
                </p>
                <button>
                    <a href="/portfolio.pdf" download="portfolio.pdf">Download Resume</a>
                </button>
            </Card>

            <Card title={"Socials"}>
                <div class="socials-container">
                    <a href="https://www.instagram.com/yaboywf/" target="_blank" rel="noopener noreferrer" aria-label="instagram">
                        <i class="fa-brands fa-instagram"></i>
                        <p>Instagram</p>
                        <p>@yaboywf</p>
                    </a>
                    <a href="https://www.linkedin.com/in/dylan-fong-9273b8234/" target="_blank" rel="noopener noreferrer" aria-label="linkedin">
                        <i class="fa-brands fa-linkedin-in"></i>
                        <p>LinkedIn</p>
                        <p>dylanyeowenfeng</p>
                    </a>
                    <a href="https://github.com/yaboywf" target="_blank" rel="noopener noreferrer" aria-label="github">
                        <i class="fa-brands fa-github"></i>
                        <p>GitHub</p>
                        <p>yaboywf</p>
                    </a>
                </div>
            </Card>
        </div>
    );
};

export default SubIntro;