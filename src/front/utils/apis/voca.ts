import axios from "axios";
import * as VocaList from "@DTO/vocaList.dto";
import { apiErrorCatchWrapper } from "@utils";

export const getVocaList = apiErrorCatchWrapper(async (accessToken: string, bookId: string) => {
  const response = await axios.get<VocaList.getVocaListInterface['Reply']['200']>(
    `/api/v1/voca/list/${bookId}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return response.data;
});

export const saveVocaList = apiErrorCatchWrapper(async (accessToken: string, bookId: string, voca: VocaList.saveVocaListInterface['Body']['voca']) => {
  const response = await axios.put<VocaList.saveVocaListInterface['Reply']['200']>(
    `/api/v1/voca/list`,
    { bookId, voca },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return response.data;
});

export const deleteVoca = apiErrorCatchWrapper(async (accessToken: string, vocaId: number) => {
  const response = await axios.delete<VocaList.deleteVocaInterface['Reply']['200']>(
    `/api/v1/voca/${vocaId}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return response.data;
});

export const increaseCheckCount = apiErrorCatchWrapper(async (accessToken: string, vocaId: number) => {
  const response = await axios.patch<VocaList.increaseCheckCountInterface['Reply']['200']>(
    `/api/v1/voca/increaseCheckCount`,
    { vocaId },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return response.data;
});

export const decreaseCheckCount = apiErrorCatchWrapper(async (accessToken: string, vocaId: number) => {
  const response = await axios.patch<VocaList.decreaseCheckCountInterface['Reply']['200']>(
    `/api/v1/voca/decreaseCheckCount`,
    { vocaId },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return response.data;
});
