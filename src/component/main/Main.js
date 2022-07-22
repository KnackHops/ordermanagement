import { Outlet } from 'react-router-dom'
import './Main.scss';

const Main = () => {
    return (
        <main>
            <Outlet />
        </main>
    )
}

export default Main;