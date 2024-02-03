export const requestLogin = ({setIsLogined, setAccessToken}) => async ({email, password}) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  setIsLogined(true);
  setAccessToken("access_token");
}

export const requestRefresh = ({setIsLogined, setAccessToken}) => async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  setIsLogined(true);
  setAccessToken("access_token");
}

export const requestLogout = ({setIsLogined, setAccessToken}) => async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  setIsLogined(false);
  setAccessToken("");
}