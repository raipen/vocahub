import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import LoginedRoute from './LoginedRoute';
import { LoginContext, useInitLoginContext } from './context/LoginContext';

function App() {
    const value = useInitLoginContext();
    return (
        <LoginContext.Provider value={value}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/profile" element={<LoginedRoute element={<div>logined!</div>} />} />
                </Routes>
            </BrowserRouter>
        </LoginContext.Provider>
    )
}

export default App;