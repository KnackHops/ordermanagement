import './Header.scss';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className='fd'>
            <div className='icon fd'>
                <h1>
                    MY ORDER
                </h1>
                <p>
                    MANAGEMENT SYSTEM
                </p>
            </div>
            <nav className='fd'>
                <Link to={ "/" } > DASHBOARD </Link>
                <Link to={ "/archive" } > DELETED ORDERS </Link>
            </nav>
        </header>
    )
}

export default Header