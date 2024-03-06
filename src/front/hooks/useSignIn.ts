import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { LoginContext } from '@context/LoginContext';
import useLoginForm from './useLoginForm';

function useSignIn() {
  const navigate = useNavigate();
  const { login } = useContext(LoginContext);
  const { name, password, onChage } = useLoginForm();
  const onSignIn = async () => {
    try {
      await login({ name, password });
      navigate("/mywordbook");
    } catch (e) {
      console.error(e);
    }
  }

  return { name, password, onChage, onSignIn };
}

export default useSignIn;
