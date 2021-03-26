import PropTypes from 'prop-types'
import Button from './Button'
import { useLocation } from 'react-router-dom'
// this hook allows us to look at route we are currently on
// used to see the current route to rmv Add button frm About pg 
//use this when css is not dynamic
// const headingStyle = {
//     color: 'red',
//     backgroundColor: 'black'
// }

//style={{ color: 'red', backgroundColor: 'black' }}


export default function Header({ title, onVisible, taskVisibility }) {
    const loc = useLocation()
    return (
        <header className="header">
            <h1>{title}</h1>
            {loc.pathname === '/' && <Button text={taskVisibility ? 'Close' : 'Add'} color={taskVisibility ? 'red' : 'green'} onClick={onVisible} />}
        </header>
    );
}

Header.defaultProps = {
    title: 'Task Tracker'
}

//Prototypes enforce data type of prop. Will still render, show error in console
Header.propTypes = {
    title: PropTypes.string.isRequired,
}