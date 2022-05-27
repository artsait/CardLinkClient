import {BrowserRouter} from 'react-router-dom';
import React from 'react';
import 'antd/dist/antd.css';
import AppRouter from './components/AppRouter';
import {useAuth} from './hook/auth.hook';
import {createContext} from 'react';
import {Spin, Space, ConfigProvider} from 'antd';
import {HeaderBar} from './components/HeaderBar';
import {QueryClient, QueryClientProvider} from 'react-query';
import locale from 'antd/lib/locale/ru_RU';
import {Container} from './HOC/Container';

export const Context = createContext(null);
const queryClient = new QueryClient();
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

function App() {
  const {token, login, logout, email, role, ready, isAuth, auth, switchUser, roleType} = useAuth();

  if (!ready) {
    return <Container>
      <Space size="middle">
        <Spin size="large" />
      </Space>
    </Container>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Context.Provider value={{
        token, email, role, roleType,
        login, logout, isAuth, auth, switchUser, isMobile,
      }}>
        <ConfigProvider locale={locale} >
          <BrowserRouter basename={'/'}>
            {isAuth && <HeaderBar />}
            <AppRouter />
          </BrowserRouter>
        </ConfigProvider>
      </Context.Provider>
    </QueryClientProvider>
  );
}

export default App;
