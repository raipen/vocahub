import { useState } from 'react';

function useLoginForm() {
  const [loginInfo, setLoginInfo] = useState({ name: '', password: '' });
  const { name, password } = loginInfo;
  const onChage = (type: 'name' | 'password') => (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInfo({ ...loginInfo, [type]: e.target.value });
  }
  return { name, password, onChage };
}

export default useLoginForm;
