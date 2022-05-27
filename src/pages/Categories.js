import React, {useState} from 'react';
import {CreateCategoryForm} from '../components/Category/CreateCategoryForm';
import {Drawer} from 'antd';
import {useCategoryQuery} from '../http/useCategoryQuery';
import {useRemoveQuery} from '../http/useRemoveQuery';
import {categoryRemoveAPI} from '../http/userAPI';
import {useColorQuery} from '../http/useColorQuery';
import {ListItem} from '../components/ListItem';

export const Categories = () => {
  const {data: category} = useCategoryQuery();
  const {mutate: removeMutate} = useRemoveQuery('categoryList', categoryRemoveAPI);
  const {data: colors} = useColorQuery();

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const actions = [{title: 'Создать категорию', action: showDrawer}];

  return (
    <>
      <ListItem
        data={category}
        titleValue={'title'}
        actions={actions}
        removeAction={removeMutate}
      />

      <Drawer
        title="Создать категорию"
        placement="right"
        onClose={onClose}
        visible={visible}
      >
        <CreateCategoryForm colors={colors}/>
      </Drawer>
    </>
  );
};
