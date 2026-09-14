import { GitHubCalendar } from "react-github-calendar";
import styles from "./contribution.module.css";

export default function Contributions() {
    return (
        <div className={styles.contribution}>
            <p>GitHub Contributions</p>

            <GitHubCalendar
                username="yaboywf"
                blockSize={12}
                blockMargin={4}
                fontSize={14}
            />
        </div>
    );
}