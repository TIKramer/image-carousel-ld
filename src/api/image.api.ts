
import axios from "./axios";
import { ENDPOINTS } from "./endpoints";

export const getImages = async( page : number, per_page: number=30, order_by?: string ) => {
  return axios
    .request({
      method: 'GET',
      url: `${ENDPOINTS.image.getImages}?page=${page}&per_page=${per_page}`,
    })
    .then((response) => {return response.data as I_API_Image[]})
    .catch((e) => console.log(e));
};




export const getRandom = async() => {
  return axios
    .request({
      method: 'GET',
      url: `${ENDPOINTS.image.random}`,
    })
    .then((response) => {return response.data as I_API_Image})
    .catch((e) => console.log(e));
};
