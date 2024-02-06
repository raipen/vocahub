import styled from 'styled-components';

const ProfileContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  position: relative;
  width: 200px;
  padding: 10px 15px;
  height: 100%;
  border: 1px solid var(--main-color);
  border-radius: 5px;
  &>div:first-child {
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    font-weight: 300;
    margin-bottom: 10px;
  }
  &>div:nth-child(2) {
    display: flex;
    align-items: flex-end;
    gap: 3px;
    color: var(--muted-text-color);
    >.material-icons-sharp {
        font-size: 1rem;
    }
    >span:nth-child(3n+2) {
        font-weight: 600;
        color: var(--important-text-color);
    }
  }
  @media (max-width: 600px) {
    width: 100%;
    padding: 10px max(15px, calc(50% - 150px));
  }
`;

const LoginDateTable = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: calc(11px * 7 + 3px * 6);
    max-width: 300px;
    gap: 3px;
`;

const LoginDateElement = styled.div<{ background: string }>`
    width: 11px;
    height: 11px;
    border-radius: 1px;
    background-color: ${({background}) => background};
    &>div {
        display: none;
        width: 200px;
        font-size: 0.8rem;
        text-align: center;
        z-index: 1;
        background-color: rgb(36, 41, 47);
        color: white;
        border-radius: 5px;
        position: absolute;
        transform: translate(-50%, calc(-100% - 5px));
        padding: 5px;
        &::after {
            content: '';
            position: absolute;
            top: 100%;
            left: 50%;
            border: 5px solid transparent;
            border-top-color: rgb(36, 41, 47);
            transform: translateX(calc(-50% + 5px));
        }
    }
    &:hover {
        &>div {
            display: block;
        }
    }
`

const Month = styled.div`
    margin: 10px 0px 5px 25px;
    max-width: 270px;
    font-size: 11px;
    display: flex;
    justify-content: space-between;
`;

function LoginDate({loginDate}: {loginDate: {date: string, count: number}[]}) {
    if(loginDate.length<70) return (<div>로그인 정보 가져오는 중</div>);
    const dataToUse = loginDate.slice(0, 64 + new Date().getDay()).reverse();
    const [firstMonthName, lastMonthName] = [dataToUse[0].date, dataToUse[dataToUse.length - 1].date].map(date => {
        const month = date.split('-')[1];
        return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][parseInt(month) - 1]
    });
    return (
        <div>
            <Month>
                <div>{firstMonthName}</div>
                <div>{lastMonthName}</div>
            </Month>
            <LoginDateTable>
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
                    <div key={index} style={{fontSize: '11px',lineHeight: '11px'}}>{day}</div>
                ))}
                {dataToUse.map((date, index) => (
                    <LoginDateElement key={index} background={date.count>1? 'var(--main-color)': date.count===1? '#ffaa44': '#ccc'}>
                        <div>{date.date}<br/>{date.count}개의 단어장을 학습</div>
                    </LoginDateElement>
                ))}
            </LoginDateTable>
        </div>
    );
}

function Profile({profile}: {profile:{
    name: string;
    wordbookCount: number;
    vocaCount: number;
    loginDate: {
        date: string;
        count: number;
    }[];
}}) {
  return (
    <ProfileContainer>
        <div>
            {profile.name}
        </div>
        <div>
            <span className="material-icons-sharp">
                style
            </span>
            <span>{profile.vocaCount}</span>
            <span>어휘</span>
            <span>/</span>
            <span>{profile.wordbookCount}</span>
            <span>단어장</span>
        </div>
        <LoginDate loginDate={profile.loginDate} />
    </ProfileContainer>
  ); 
}

export default Profile;