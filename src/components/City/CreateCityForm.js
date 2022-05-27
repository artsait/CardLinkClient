import React from 'react';
import {Form, Input} from 'antd';
import {Container} from '../../HOC/Container';
import {cityCreateAPI} from '../../http/userAPI';
import {useCreateQuery} from '../../http/useCreateQuery';
import {ButtonPrimary} from '../UIKit';

export const CreateCityForm = () => {
  const [form] = Form.useForm();
  const {mutate: createMutate} = useCreateQuery('cityList', cityCreateAPI);

  const onFinish = (data) => {
    createMutate(data);
  };

  return (
    <Container>
      <Form
        form={form}
        layout="vertical"
        name="control-hooks"
        onFinish={onFinish}
        style={{width: '300px'}}
      >
        <Form.Item
          name="name"
          label="название города"
          rules={[{required: true}]}
        >
          <Input/>
        </Form.Item>
        <Form.Item>
          <ButtonPrimary title={'создать город'} />
        </Form.Item>
      </Form>
    </Container>
  );
};
