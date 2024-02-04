type setLoginContext = {
  setIsLogined: (isLogined: null|boolean) => void;
  setAccessToken: (accessToken: string) => void;
}

type login = {
  email: string;
  password: string;
}

export const requestLogin = ({setIsLogined, setAccessToken}: setLoginContext) =>async ({email, password}: login) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  setIsLogined(true);
  setAccessToken("access_token");
}

export const requestRefresh = ({setIsLogined, setAccessToken}: setLoginContext) => async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("refresh");
  setIsLogined(true);
  setAccessToken("access_token");
}

export const requestLogout = ({setIsLogined, setAccessToken}: setLoginContext) => async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  setIsLogined(false);
  setAccessToken("");
}