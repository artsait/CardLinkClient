import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

export const NoMatch = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    navigate('/');
  }, []);

  return (
    <div>
            страница не найдена
    </div>
  );
};
