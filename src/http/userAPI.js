import { $authHost, $host } from "./index";
import {jwtDecode} from "jwt-decode";

export const registration = async ({username, password}) =>{
  const {data} = await $host.post('/auth/registration', {username, password});
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
}

export const login = async ({username, password}) =>{
  const {data} = await $host.post('/auth/login', {username, password});
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
}

export const check = async () =>{
  const response = await $host.post('/auth/registration', {username, password})
  return response
}

export const getPayments = async () =>{
  const payments = [];
  const {data} = await $host.get('/payments');
  try {
    await data.forEach((el) => {
      if(el.id) 
      {
        payments.push(el);
      }
    })        
  } catch (e) {
    alert(e + " Error! Data not found at address: " + process.env.VUE_APP_API_URL + '/payments' );
  }
  return payments;
}
