import React, {useState} from 'react';
import {Button, Drawer} from 'antd'; ;
import {CreateLinkForm} from './CreateLinkForm';
import styled from 'styled-components';
import {theme} from '../../utils/uiConst';

export const CreateLinkModal = ({typesLink, id}) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <StyleBlock>
        <Button
          type="dashed"
          block
          onClick={showModal}
          style={{color: theme.default.greyBlue, borderRadius: 10, borderColor: theme.default.greyBlue}}
        >
                    Добавить ссылку
        </Button>
      </StyleBlock>
      <Drawer title="добавить ссылку" placement="right" onClose={onClose} visible={visible}>
        <CreateLinkForm typesLink={typesLink} id={id}/>
      </Drawer>
    </>
  );
};

const StyleBlock = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 15px auto;
`;
