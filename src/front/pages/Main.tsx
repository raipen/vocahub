import axios from 'axios';

function Main() {
  const onClick = async () => {
    try{
      const result = await axios.post('/api/v1/user/signUp');
    }catch(e){
      console.log(e);
    }
  };

  return (
    <div>
      Main
      <button onClick={onClick}>test</button>
    </div>
  );
}

export default Main;
