import axios from 'axios';
import * as AxiosLogger from 'axios-logger';

const api = axios.create({
  baseURL: "http://localhost:5006"
});
// api.interceptors.response.use(
//     response =>  response.data,
//     error => {
//       console.log(error);
//     });

api.interceptors.request.use(AxiosLogger.requestLogger, AxiosLogger.errorLogger);
api.interceptors.response.use(AxiosLogger.responseLogger, AxiosLogger.errorLogger);
export default {
  getTasks: async () => {

    //const result = 
    const result=await api.get("/toDo")
    
    return result.data;
  },

  addTask: async(name)=>{
    console.log('addTask', name)
    await api.post('/toDo',{"Name":name,"IsComplete":false})
    axios.interceptors.response.use(
      response => response,
      error => {
        console.log(error);
      });
  },

  setCompleted: async(id, isComplete)=>{
    console.log('setCompleted', {id, isComplete})
    await api.put(`/toDo/${id}`,{"IsComplete":isComplete})
    axios.interceptors.response.use(
      response => response,
      error => {
        console.log(error);
      });
  },

  deleteTask:async(id)=>{
   await api.delete(`/toDo/${id}`)
   axios.interceptors.response.use(
    response => response,
    error => {
      console.log(error);
    });
  
  }
};
