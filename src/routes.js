import React from 'react';
import {
  ADMIN_PANEL_ROUTE,
  CARD_LIST_ROUTE,
  CARD_ROUTE,
  CREATE_CARD_ROUTE, CREATE_CATEGORY_ROUTE, CREATE_CITY_ROUTE, CREATE_TYPE_LINK_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
} from './utils/routeConst';
import {CardCreate} from './pages/CardCreate';
import {CardList} from './pages/CardList';
import {Card} from './pages/Card';
import {Auth} from './pages/Auth';
import {Admin} from './pages/Admin';
import {Categories} from './pages/Categories';
import {TypeLink} from './pages/TypeLink';
import {City} from './pages/City';
import {Register} from './pages/Register';

export const authRouter = [
  {
    path: CREATE_CARD_ROUTE,
    element: <CardCreate />,
  },
  {
    path: CREATE_CATEGORY_ROUTE,
    element: <Categories />,
  },
  {
    path: CREATE_TYPE_LINK_ROUTE,
    element: <TypeLink />,
  },
  {
    path: CREATE_CITY_ROUTE,
    element: <City />,
  },
  {
    path: ADMIN_PANEL_ROUTE,
    element: <Admin />,
  },
];

export const registrationRouter = [
  {
    path: REGISTRATION_ROUTE,
    element: <Register />,
  },
];

export const publicRouter = [
  {
    path: CARD_LIST_ROUTE,
    element: <CardList />,
  },
  {
    path: CARD_ROUTE + '/:id',
    element: <Card />,
  },
  {
    path: LOGIN_ROUTE,
    element: <Auth type={'login'} />,
  },
  {
    path: REGISTRATION_ROUTE,
    element: <Auth type={'reg'} />,
  },
];
