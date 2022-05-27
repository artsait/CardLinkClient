import React, {useContext} from 'react';
import {Routes, Route} from 'react-router-dom';
import {authRouter, publicRouter, registrationRouter} from '../routes';
import {NoMatch} from '../pages/NoMatch';
import {Context} from '../App';

const AppRouter = () => {
  const {roleType} = useContext(Context);
  const {creator, registrar} = roleType;

  return (
    <Routes>
      {creator && authRouter.map(({path, element}) =>
        <Route key={path} path={path} element={element} />,
      )}
      {registrar && registrationRouter.map(({path, element}) =>
        <Route key={path} path={path} element={element} />,
      )}
      {publicRouter.map(({path, element}) =>
        <Route key={path} path={path} element={element} />,
      )}
      <Route path="*" element={ <NoMatch /> } />
    </Routes>
  );
};

export default AppRouter;
