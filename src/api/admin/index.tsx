import { CreateUserPayload, UpdateUserPayload } from "../../models/user";
import axiosInstance from "../axios";

export const getAllUsers = async () => {
    const url = "/api/users";
    return await axiosInstance.get(url)
}
export const getUserById = async (id:string) => {
    const url = "/api/users";
    return await axiosInstance.get(url)
}
export const createUser = async (payload:CreateUserPayload) => {
    const url = "/api/users";
    return await axiosInstance.post(url, payload);
}
export const deleteUser = async (id: number) => {
    const url = `/api/users`;
    return await axiosInstance.delete(url,{
        params: {id: id}
    });
}
export const updateUser = async (id:number, payload: UpdateUserPayload) => {
    const url = `/api/users/${id}`;
    return await axiosInstance.put(url,{
        params: {id: id},
        body: payload
    });
}