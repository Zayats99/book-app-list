import { deleteById, getAll, getById, post, put } from "../httpClient";

export const useApi = (url: string) => {
  const getData = async () => {
    const data = await getAll(url);
    return data;
  };

  async function getDataById(param: any) {
    const data = await getById<string>({ url, param });
    return data;
  }

  async function createData<T>(payload: T) {
    const data = await post<T>({ url, payload });
    return data;
  }

  async function deleteData<T>(id: T) {
    deleteById<T>({ url, param: id });
  }

  async function updateData<T>(id: string | number, payload: T) {
    put<Partial<T> | string | number>({ url, param: id, payload });
  }

  return { getData, getDataById, createData, deleteData, updateData };
};
