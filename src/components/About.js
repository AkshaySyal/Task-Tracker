import { Link } from 'react-router-dom'
//Link replaces a tag. pg wont load. <a href="/">Go back </a>
function About() {
    return (
        <div>
            <h4>Version 1.0.0</h4>
            <Link to="/">Go Back</Link>

        </div>
    )
}

export default About
