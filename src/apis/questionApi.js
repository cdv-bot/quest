import axiosClient from './axiosClient';

const questionApi = {
    getQuestion:(params) =>{
      return axiosClient.get(`/listQuestion`, { params });
    },
    postAnswer:(data) =>{
      return axiosClient.post(`/listQuestion`, data);
    }
}
export default questionApi;