import "./techstack.scss";
import BlurText from "@/components/TextEffect";
import Threads from "@/components/Threads";
import Typewriter from "@/components/TypeWriter";

const Techstack = () => {
    const text = `Tech Stack Overview
-------------------------------------------------------

[ WEB DEVELOPMENT ]             [ DEVOPS ]
- HTML                          - Git/GitHub
- CSS / SCSS                    - Github Actions
- JavaScript/TypeScript         - Jenkins
- React.js                      - Playwright / Cypress
- Next.js                       - Cloud (AWS / GCP) 
- Node.js (Express)             - Docker
- Python (Flask)                - SuperTest
- Django                        - Minikube / Kubernetes
- SolidJS

[ PROGRAMMING LANGUAGES ]       [ DATABASES ]
- Python                        - MySQL
- Dart                          - PostgreSQL
- Javascript                    - MongoDB
- TypeScript                    - SQLite
- MicroPython                   - Firebird SQL
                                - Firebase

[ MOBILE DEVELOPMENT ]          [ GAME DEVELOPMENT ]
- Flutter                       - Pygame

-------------------------------------------------------
END OF FILE
    `;

    return (
        <section class="techstack">
            <div class="threads-text-container">
                <Threads amplitude={4} />
                <BlurText text="What I Use" delay={150} />
            </div>

            <div class="terminal-container">
                <div class="terminal-header">
                    <div class="circle red"></div>
                    <div class="circle yellow"></div>
                    <div class="circle green"></div>
                    <div class="terminal-title">Terminal</div>
                </div>

                <div class="terminal-body">
                    <p>$ cat techstack.txt</p>
                    <Typewriter text={text} />
                </div>
            </div>
        </section>
    );
};

export default Techstack;