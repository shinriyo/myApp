// https://restcountries.eu/rest/v2/all
import axiosBase from 'axios';

const axios = axiosBase.create({
  baseURL: 'https://restcountries.eu/rest/v2',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  responseType: 'json'
});

export const getCounties = (callback: any) => {
  axios.get('/all')
    .then((response: any) => {
      callback(response);
    })
    .catch((error: any) => {
      console.log('ERROR!! occurred in Backend.')
    });
};

