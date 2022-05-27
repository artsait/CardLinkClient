import {$authHost, $host} from './index';

export const API = (api) => {
  return async () => {
    const {data} = await $host.get(`${api}/`);
    return data;
  };
};

export const registrationAPI = async (email, password) => {
  const data = await $authHost.post('user/registration', {email, password});
  return data;
};

export const loginAPI = async (email, password) => {
  const {data} = await $host.post('user/login', {email, password});
  return data.token;
};

export const checkAPI = async () => {
  const response = await $authHost.get('user/auth');
  return response;
};

export const cardListAPI = async () => {
  const {data} = await $host.get('card/');
  return data;
};

export const cardOneAPI = async (id) => {
  const {data} = await $host.get(`card/${id}`);
  return data;
};

export const getLinkByCardIdAPI = async (id) => {
  const {data} = await $host.get(`link?cardId=${id}`);
  return data;
};

export const cardCreateAPI = async (data) => {
  const {res} = await $authHost.post('card/', data);
  return res;
};

export const cardRemoveAPI = async (id) => {
  const {res} = await $authHost.delete(`card?id=${id}`);
  return res;
};

export const linkCreateAPI = async (data) => {
  const {res} = await $authHost.post('link/', data);
  return res;
};

export const linkRemoveAPI = async (id) => {
  return await $authHost.delete(`link?id=${id}`);
};

export const typeLinkCreateAPI = async (data) => {
  const {res} = await $authHost.post('typeLink/', data);
  return res;
};

export const typeLinkRemoveAPI = (id) => {
  return $authHost.delete(`typeLink?id=${id}`);
};

export const categoryCreateAPI = async (data) => {
  const {res} = await $authHost.post('category/', data);
  return res;
};

export const categoryRemoveAPI = async (id) => {
  const {res} = await $authHost.delete(`category?id=${id}`);
  return res;
};

export const cityCreateAPI = async (data) => {
  const {res} = await $authHost.post('city/', data);
  return res;
};

export const cityRemoveAPI = (id) => {
  return $authHost.delete(`city?id=${id}`);
};
