import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginContext, useInitLoginContext } from '@context/LoginContext';
import LoginedRoute from './LoginedRoute';
import Header from '@components/Header';
import Footer from '@components/Footer';
import Main from '@pages/Main';
import Login from '@pages/Login';
import MyWordbook from '@pages/MyWordbook';
import Wordbook from '@pages/Wordbook';
import Setting from '@pages/Setting';

function App() {
    const value = useInitLoginContext();
    const { isLogined, refresh } = value;
    if(isLogined === null){
        refresh();
    }
    return (
        <LoginContext.Provider value={value}>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/mywordbook" element={<LoginedRoute element={<MyWordbook />} />} />
                    <Route path="/wordbook" element={<LoginedRoute element={<Wordbook />} />} />
                    <Route path="/setting" element={<LoginedRoute element={<Setting />} />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </LoginContext.Provider>
    )
}

export default App;