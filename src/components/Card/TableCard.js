import React from 'react';
import {Space, Table, Tag} from 'antd';
import {NavLink} from 'react-router-dom';
import {useRemoveQuery} from '../../http/useRemoveQuery';
import {cardRemoveAPI} from '../../http/userAPI';
import {getNormalData} from '../../utils/timeUtils';
import {theme} from '../../utils/uiConst';
import styled from 'styled-components';

export const TableCard = ({data}) => {
  const {mutate: removeMutate} = useRemoveQuery('cardList', cardRemoveAPI);

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Название',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => <NavLink to={`/card/${record.id}`} style={{color: theme.default.greyBlue}}>{text}</NavLink>,
    },
    {
      title: 'город',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'дата начала',
      dataIndex: 'dateStart',
      key: 'dateStart',
      render: (date) => getNormalData(date),
    },
    {
      title: 'дата окончания',
      dataIndex: 'dateEnd',
      key: 'dateEnd',
      render: (date) => getNormalData(date),
    },
    {
      title: 'категория',
      key: 'category',
      dataIndex: 'category',
      render: (category, record) =>
        <Tag color={record.color} key={category}>
          {category?.toUpperCase()}
        </Tag>,
    },
    {
      title: '',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={()=>removeMutate(record.id)} style={{color: theme.default.greyBlue}}>Удалить</a>
        </Space>
      ),
    },
  ];


  return (
    <StyledTableMobileContainer>
      <Table columns={columns} dataSource={data} />
    </StyledTableMobileContainer>
  );
};

const StyledTableMobileContainer = styled.div`
  overflow-y: scroll;
`;
