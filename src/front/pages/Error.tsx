import { useLocation } from "react-router-dom";
import { styled } from "styled-components";
import { MainContainer } from "@components";

const ErrorContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 2rem;
    padding-top: 5rem;
    &>.material-icons-sharp{
        font-size: 3rem;
        margin-bottom: 1rem;
    }
`;

function Error() {
    const location = useLocation();
    const error = location.state;
    let message: string = "오류메시지가 정의되지 않았습니다.";
    if (!error || typeof error !== "object") {
        message = "비정상적인 접근입니다.";
    }
    if(error.message){
        message = error.message;
    }
    return (
        <MainContainer>
            <ErrorContainer>
                <span className="material-icons-sharp">
                    error
                </span>
                <div>
                    {message}
                </div>
            </ErrorContainer>
        </MainContainer>
    );
}

export default Error;
