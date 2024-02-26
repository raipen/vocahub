type login = {
  email: string;
  password: string;
}

export const requestLogin = async ({email, password}: login) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return "access_token";
}

export const requestRefresh = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return "access_token";
}

export const requestLogout = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
}
