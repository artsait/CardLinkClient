import React, {useContext} from 'react';
import {PageHeader} from 'antd';
import {Context} from '../App';
import {useNavigate, useLocation} from 'react-router-dom';
import {ButtonLink} from './UIKit';
import {CapsuleTabs} from 'antd-mobile';
import styled from 'styled-components';
import {theme} from '../utils/uiConst';

const navigationCommonList = [
  {title: 'главная', path: '/'},
];

const navigationList = [
  {title: 'карточки', path: '/create'},
  {title: 'города', path: '/city'},
  {title: 'категории', path: '/category'},
  {title: 'типы ссылок', path: '/typeLink'},
];

const navigationRegList = [
  {title: 'регистрация', path: '/registration'},
];

export const HeaderBar = () => {
  const {roleType, email, logout, isMobile} = useContext(Context);
  const {pathname} = useLocation();

  const {creator, registrar, simple} = roleType;
  const navigate = useNavigate();

  const navListCreator = (list) => {
    return list?.map((n, id) =>
      <ButtonLink
        key={n.title}
        title={n.title}
        action={()=>navigate(n.path)}
      />,
    );
  };

  const navHandler = (path) => {
    navigate(path);
  };

  const mobileNavListCreator = (list) => {
    return list?.map((n, id) =>
      <CapsuleTabs.Tab
        key={n.path}
        title={n.title}
      />,
    );
  };

  const NavList = [
    ...navListCreator(navigationCommonList),
    ...creator ? navListCreator(navigationList) : [],
    ...registrar ? navListCreator(navigationRegList) : [],
  ];

  const NavMobileList = () => {
    return <StyledCapsuleTabs
      defaultActiveKey='/'
      activeKey={pathname}
      onChange={navHandler}
    >
      {mobileNavListCreator(navigationCommonList)}
      {creator ? mobileNavListCreator(navigationList) : []}
      {registrar ? mobileNavListCreator(navigationRegList) : []}

    </StyledCapsuleTabs>;
  };

  const userMessage = simple ? 'Обратитесь к администратору для активации' : '';

  return (
    <>
      <div className="site-page-header-ghost-wrapper" >
        {isMobile && <NavMobileList/>}
        {!isMobile && <PageHeader
          className="site-page-header"
          ghost={false}
          title={[...NavList]}
          subTitle={userMessage}
          extra={[
            <ButtonLink key="1" type="link" action={logout} title={email} />,
          ]}
        >
        </PageHeader>}
      </div>
    </>
  );
};

const StyledCapsuleTabs = styled(CapsuleTabs)`
  --adm-color-primary: ${theme.default.greyBlue};
`;
