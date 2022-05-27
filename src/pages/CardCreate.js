import * as React from 'react';
import {CreateNewCardForm} from '../components/Card/CreateNewCardForm';
import {TableCard} from '../components/Card/TableCard';
import {Card, Drawer} from 'antd';
import {useQuery} from 'react-query';
import {API} from '../http/userAPI';
import {useContext, useState} from 'react';
import {ButtonPrimary} from '../components/UIKit';
import {Context} from '../App';


export const CardCreate = () => {
  const {isMobile} = useContext(Context);
  const {data: cards} = useQuery('cardList', API('card'));

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const actions = [
    <ButtonPrimary type="primary" action={showDrawer} title={'Создать карточку'}/>,
  ];

  return (
    <>
      <Card size="small"
        title="Список карточек"
        extra={actions}
        style={{width: '95%', margin: 'auto', border: 'none'}}
      >
        <TableCard data={cards}/>
      </Card>
      <Drawer title="Создать карточку" placement={isMobile ? 'left' : 'right'} onClose={onClose} visible={visible}>
        <CreateNewCardForm />
      </Drawer>
    </>
  );
};
