import { Routes, Route } from 'react-router-dom';
import { LoginContext, useInitLoginContext } from '@context/LoginContext';
import LoginedRoute from './LoginedRoute';
import Header from '@components/Header';
import Footer from '@components/Footer';
import Main from '@pages/Main';
import Login from '@pages/Login';
import Signup from '@pages/Signup';
import MyWordbook from '@pages/MyWordbook';
import VocaList from '@pages/VocaList';
import Setting from '@pages/Setting';
import Error from '@pages/Error';

function App() {
    const value = useInitLoginContext();
    return (
        <LoginContext.Provider value={value}>
                <Header />
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/mywordbook" element={<LoginedRoute element={<MyWordbook />} />} />
                    <Route path="/vocalist/:wordbookId" element={<LoginedRoute element={<VocaList />} />} />
                    <Route path="/setting" element={<LoginedRoute element={<Setting />} />} />
                    <Route path="/error" element={<Error />} />
                    <Route path="*" element={<div>404 Not Found</div>} />
                </Routes>
                <Footer />
        </LoginContext.Provider>
    )
}

export default App;
