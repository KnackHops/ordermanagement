import { Routes, Route } from 'react-router-dom';
import Header from "./header/Header";
import Main from './main/Main';
import ManagementSystem from './main/managementsystem/ManagementSystem';


const UnderRoot = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path='/*' element={ <Main /> }>
                    <Route index element={ <ManagementSystem /> } />
                </Route>
            </Routes>
        </>
    )
}

export default UnderRoot;