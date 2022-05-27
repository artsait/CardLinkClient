import React from 'react';
import styled from 'styled-components';

export const Container = ({children}) => {
  return (
    <StyleContainer>
      {children}
    </StyleContainer>
  );
};

const StyleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  max-width: 400px;
  width: 100%;
  margin: 50px auto 0;
  padding: 5px;
`;
