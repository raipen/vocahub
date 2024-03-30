import { Routes, Route } from 'react-router-dom';
import LoginContext from '@context/LoginContext';
import useInitLogin from '@hooks/useInitLogin';
import LoginedRoute from './LoginedRoute';
import Header from '@components/Header';
import Footer from '@components/Footer';
import Home from '@pages/Home';
import Login from '@pages/Login';
import SetAccessToken from '@pages/SetAccessToken';
import MyWordbook from '@pages/MyWordbook';
import VocaList from '@pages/VocaList';
import Setting from '@pages/Setting';
import Error from '@pages/Error';
import { MainContainer } from '@components';

function App() {
    const value = useInitLogin();
    return (
        <LoginContext.Provider value={value}>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginedRoute element={<Login />} isLoginPage={false} />} />
                    <Route path="/login/:accessToken" element={<SetAccessToken />} />
                    <Route path="/mywordbook" element={<LoginedRoute element={<MyWordbook />} />} />
                    <Route path="/vocalist/:wordbookId" element={<LoginedRoute element={<VocaList />} />} />
                    <Route path="/setting" element={<LoginedRoute element={<Setting />} />} />
                    <Route path="/error" element={<Error />} />
                    <Route path="*" element={<MainContainer>잘못된 접근입니다</MainContainer>} />
                </Routes>
                <Footer />
        </LoginContext.Provider>
    )
}

export default App;
