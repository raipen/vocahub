import axios from "axios";
import * as Wordbook from "@DTO/wordbook.dto";
import * as User from "@DTO/user.dto";
import { apiErrorCatchWrapper } from "@utils";
export * from "./wordbookmock";

export const getDatasWhenWordbookRender = async (accessToken: string): Promise<[Awaited<ReturnType<typeof getProfile>>, Awaited<ReturnType<typeof getWordbookList>>]> => {
  const [profile, wordbooks] = await Promise.all([getProfile(accessToken), getWordbookList(accessToken)]);
  return [profile, wordbooks]
}

const getProfile = apiErrorCatchWrapper(async (accessToken: string) => {
  const response = await axios.get<User.profileInterface['Reply']['200']>(
    "/api/v1/user/profile",
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return response.data;
});

const getWordbookList = apiErrorCatchWrapper(async (accessToken: string) => {
  const response = await axios.get<Wordbook.getWordbookListInterface['Reply']['200']>(
    "/api/v1/wordbook",
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return response.data;
});

export const addWordbook = apiErrorCatchWrapper(async (accessToken: string, title: string) => {
  const response = await axios.post<Wordbook.createWordbookInterface['Reply']['201']>(
    "/api/v1/wordbook",
    { title },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return response.data;
});

export const hideWordbook = apiErrorCatchWrapper(async (accessToken: string, bookId: number) => {
  const response = await axios.patch<Wordbook.hideWordbookInterface['Reply']['200']>(
    "/api/v1/wordbook/hide",
    { bookId },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return response.data;
});

export const showWordbook = apiErrorCatchWrapper(async (accessToken: string, bookId: number) => {
  const response = await axios.patch<Wordbook.showWordbookInterface['Reply']['200']>(
    "/api/v1/wordbook/show",
    { bookId },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return response.data;
});
