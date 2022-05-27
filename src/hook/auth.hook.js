import {useCallback, useEffect, useState} from 'react';
import jwtDecode from 'jwt-decode';
import {checkAPI, loginAPI} from '../http/userAPI';
import {authority} from '../utils/const';

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);
  const [role, setRole] = useState(null);
  const [ready, setReady] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  const auth = async (email, password) => {
    if (token) {
      await logout();
    }
    const response = await loginAPI(email, password);
    login(response);
  };

  const login = useCallback( (data) => {
    const user = jwtDecode(data);
    setToken(data);
    setEmail(user.email);
    setRole(user.role);

    localStorage.setItem('token', data);
  }, []);

  const logout = useCallback( async () => {
    await localStorage.removeItem('token');
    setToken(null);
    setEmail(null);
    setRole(null);
  }, []);

  const checkToken = async () => {
    try {
      const {data} = await checkAPI();
      login(data.token);
    } catch (e) {
      await logout();
      setReady(true);
    }
  };

  useEffect(async () => {
    const oldToken = localStorage.getItem('token');
    if (oldToken) {
      await checkToken();
    }

    setReady(true);
  }, [login, checkToken]);

  useEffect(()=> {
    setIsAuth(!!token);
  }, [token, role, setIsAuth]);

  const switchUser = async (email, password) => {
    await auth(email, password);
  };

  const creator = isAuth && role === authority.creator;
  const registrar = isAuth && role === authority.registrar;
  const simple = isAuth && role === authority.simple;

  return {
    login,
    logout,
    token,
    email,
    role,
    roleType: {creator, simple, registrar},
    ready,
    isAuth,
    auth,
    switchUser,
  };
};
