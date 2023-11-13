import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Navbar from './components/NavBar'

function RouterAPP() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default RouterAPP;