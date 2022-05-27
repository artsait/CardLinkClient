import React from 'react';
import {Button, Col, Row} from 'antd';
import styled from 'styled-components';

export const ListItem = ({data, titleValue, actions, removeAction}) => {
  const getStyleTitle = (color) => color ? {background: color, color: '#FFF'} : {background: '#80a0bb', color: '#FFF'};

  return (
    <Container>
      <Row style={{margin: '25px 0'}}>
        <Col span={24}>
          {actions?.map(({title, action})=>
            <Button key={title} type="dashed" block onClick={action}>
              {title}
            </Button>,
          )}
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          {data?.map((d) =>
            <StyledTitle key={d.id} level={5} style={getStyleTitle(d?.color)}>
              <StyledClose onClick={()=>removeAction(d.id)}>x</StyledClose>

              {d[titleValue]}
            </StyledTitle>,
          )}
        </Col>
      </Row>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  margin: auto;
  padding: 10px;
`;

const StyledTitle = styled.div`
  position: relative;
  margin: 10px 0;
  padding: 10px;
  text-align: center;
  border-radius: 2px;
  transition: .2s;
  
  &:hover{
    opacity: 90%;
  }

  &:hover span{
    display: block;
  }
`;

const StyledClose = styled.span`
  position: absolute;
  display: none;
  right: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.45);
  width: 42px;
  height: 42px;
  padding: 8px;
  font-size: 17px;
  transition: .1s;
  cursor: pointer;
`;
