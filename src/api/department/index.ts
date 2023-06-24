import { createDepartmentPayload } from "../../models/department";
import axiosInstance from "../axios";

export const getAllDepartments = async () => {
    const url = 'api/departments';
    return await axiosInstance.get(url);
};
export const createDepartment = async (payload: createDepartmentPayload) => {
    const url = 'api/departments';
    return await axiosInstance.post(url, payload);
};

export const deleteDepartment = async (id: number) => {
  const url = `/api/departments`;
  return await axiosInstance.delete(url, {
    params: { id: id }
  });
};

export const updateDepartment = async (id:number, payload: createDepartmentPayload) => {
    const url = `/api/departments?id=${id}`;
    return await axiosInstance.put(url, payload);
};

export const getDepartmentById = async (id: string) => {
  const url = `/api/departments/${id}`;
  return await axiosInstance.get(url);
};