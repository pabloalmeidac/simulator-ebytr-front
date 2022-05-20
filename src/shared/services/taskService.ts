import { Api } from "./apiConfig";
import { ApiException } from "./apiException";

export interface ITask {
  id: number;
  name: string;
  status: string;
}

const getAll = async (): Promise<ITask[]| ApiException> => {
  try {
    const { data } = await Api().get('/task');
    return data;
  } catch (error: any) {
    return new ApiException(error.message || 'Error ao buscar os registros.')
  }
};

const create = async (dataToCreate: Omit<ITask, 'id'>): Promise<ITask| ApiException> => {
  try {
    const { data } = await Api().post('/task', dataToCreate);
    return data;
  } catch (error: any) {
    return new ApiException(error.message || 'Error ao criar registro.')
  }
};

const updateById = async (id: number, status: string): Promise<ITask| ApiException> => {
  try {
    const { data } = await Api().put(`/task/${id}`, status);
    return data;
  } catch (error: any) {
    return new ApiException(error.message || 'Error ao atualizar a tarefa.')
  }
};

const deleteById = async (id: number): Promise<undefined| ApiException> => {
  try {
    await Api().delete(`/task/${id}`);
    return undefined;
  } catch (error: any) {
    return new ApiException(error.message || 'Error ao apagar tarefa.')
  }
};

export const TasksService = { getAll, create, updateById, deleteById};