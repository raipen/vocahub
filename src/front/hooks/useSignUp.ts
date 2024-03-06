import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { LoginContext } from '@context/LoginContext';
import useLoginForm from './useLoginForm';

function useSignUp() {
  const navigate = useNavigate();
  const { signUp } = useContext(LoginContext);
  const { name, password, onChage } = useLoginForm();

  const onSignUp = async () => {
    try {
      await signUp({ name, password });
      navigate("/mywordbook");
    } catch (e) {
      console.error(e);
    }
  }
  return { name, password, onChage, onSignUp };
}

export default useSignUp;
