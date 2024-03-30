import { LoginContainer, InputWithLabelContainer,Input, ButtonContainingIcon, DisabledButtonContainingIcon } from "@components";
import ErrorConfigs from "@errors/config";
import { Navigate } from "react-router-dom";
import { useState,useEffect } from "react";
import useFetchWithRendering from "@hooks/useFetchWithRendering";
import useFetchUpdate from "@hooks/useFetchUpdate";
import { getUserName,changeUserName } from "@apis/auth";


function Setting() {
  const [name, setName] = useState('');
  const [data, error] = useFetchWithRendering(getUserName);
  const [loading, update] = useFetchUpdate(changeUserName);

  useEffect(() => {
    if(data){
      setName(data);
    }
  }, [data]);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!name) return;
    update(name);
  }

  if(error) {
    const errorConfig = ErrorConfigs[Error.name];
    if(errorConfig)
      return <Navigate to="/error" state={{message: errorConfig.toast(Error)}} />
    return <Navigate to="/error" state={{message: "알 수 없는 오류가 발생했습니다."}} />
  }
  
  return (
    <LoginContainer onSubmit={onSubmit}>
       <InputWithLabelContainer>
        <label>닉네임</label>
        <Input value={name} onChange={onChange} disabled={loading||!data}/>
      </InputWithLabelContainer>
      {!loading&&<ButtonContainingIcon type="submit">저장</ButtonContainingIcon>}
      {loading&&<DisabledButtonContainingIcon disabled>저장중...</DisabledButtonContainingIcon>}
    </LoginContainer>
  );
}

export default Setting;
