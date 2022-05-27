import React, {useState} from 'react';
import {CreateTypeLinkForm} from '../components/Link/TypeLink/CreateTypeLinkForm';
import {useQuery} from 'react-query';
import {API, typeLinkRemoveAPI} from '../http/userAPI';
import {useRemoveQuery} from '../http/useRemoveQuery';
import {Drawer} from 'antd';
import {ListItem} from '../components/ListItem';

export const TypeLink = () => {
  const {data: typeLinks} = useQuery('typeLink', API('typeLink'));
  const {mutate: removeMutate} = useRemoveQuery('typeLink', typeLinkRemoveAPI);

  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const actions = [{title: 'Создать тип ссылки', action: showDrawer}];

  return (
    <>
      <ListItem data={typeLinks} titleValue={'title'} actions={actions} removeAction={removeMutate} />
      <Drawer title="Создать тип ссылки" placement="right" onClose={onClose} visible={visible}>
        <CreateTypeLinkForm />
      </Drawer>
    </>
  );
};
