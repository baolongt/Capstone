import axiosKit from './axiosKit';
import { CreateUserPayLoad } from '../../models/auth';

const authController = {
  createUser(payLoad: CreateUserPayLoad) {
    //payloaad là 1 object truyền biến trong createUserPayLoad
    const url = '/api/users';
    return axiosKit.post(url, payLoad);
  },

  getAllUsers() {
    const url = '/api/users';
    return axiosKit.get(url);
  },

  updateUser(payLoad: CreateUserPayLoad) {
    const url = '/api/users';
    return axiosKit.post(url, payLoad);
  },
  deleteUser() {
    const url = '/api/users';
    return axiosKit.delete(url);
  }
};

export default authController;
