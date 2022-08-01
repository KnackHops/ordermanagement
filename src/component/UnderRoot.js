import { Routes, Route } from 'react-router-dom';
import Header from "./header/Header";
import Main from './main/Main';
import ArchiveSystem from './main/archivesystem/ArchiveSystem';
import ManagementSystem from './main/managementsystem/ManagementSystem';


const UnderRoot = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path='/*' element={ <Main /> }>
                    <Route index element={ <ManagementSystem /> } />
                    <Route path='archive' element={ <ArchiveSystem /> } />
                </Route>
            </Routes>
        </>
    )
}

export default UnderRoot;