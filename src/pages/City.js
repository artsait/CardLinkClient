import React, {useState} from 'react';
import {CreateCityForm} from '../components/City/CreateCityForm';
import {useCityQuery} from '../http/useCityQuery';
import {useRemoveQuery} from '../http/useRemoveQuery';
import {cityRemoveAPI} from '../http/userAPI';
import {Drawer} from 'antd';
import {ListItem} from '../components/ListItem';

export const City = () => {
  const {data: cities} = useCityQuery();
  const {mutate: removeMutate} = useRemoveQuery('cityList', cityRemoveAPI);
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const actions = [{title: 'Создать город', action: showDrawer}];

  return (
    <>
      <ListItem
        data={cities}
        titleValue={'name'}
        actions={actions}
        removeAction={removeMutate}
      />

      <Drawer
        title="Создать карточку"
        placement="right"
        onClose={onClose}
        visible={visible}
      >
        <CreateCityForm />
      </Drawer>
    </>
  );
};
