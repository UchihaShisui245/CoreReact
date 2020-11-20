import axios, { AxiosResponse } from "axios"
import { resolve } from "dns";
import { IActivity } from '../layout/Models/IActivity';

axios.defaults.baseURL = "http://localhost:5000/api/";

const reponseBody = (response :  AxiosResponse) => response.data;

const sleep = (ms : number) => (response : AxiosResponse) => new Promise<AxiosResponse>(resolve => setTimeout(() => {
  resolve(response)  
}, ms));

const requests = {
    get : (url : string) => axios.get(url).then(sleep(1000)).then(reponseBody),
    post : (url :string , body: {}) => axios.post(url,body).then(sleep(1000)).then(reponseBody),
    put : (url :string , body: {}) => axios.put(url,body).then(sleep(1000)).then(reponseBody),
    delete : (url :string ) => axios.delete(url).then(sleep(1000)).then(reponseBody),
}

export const axiosActivities =  {
    list : () : Promise<IActivity[]> => requests.get("Activities"),
    itemDetails :( id : string) => requests.get(`Activities/${id}`),
    create : (activity : IActivity) =>requests.post("Activities",activity),
    update : (activity : IActivity) => requests.put(`Activities/${activity.id}`,activity),
    delete : (id : string) => requests.delete(`Activities/${id}`)
}

