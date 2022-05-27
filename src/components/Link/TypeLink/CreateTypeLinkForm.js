import React from 'react';
import {Form, Input} from 'antd';
import {Container} from '../../../HOC/Container';
import {typeLinkCreateAPI} from '../../../http/userAPI';
import {useCreateQuery} from '../../../http/useCreateQuery';
import {ButtonPrimary} from '../../UIKit';

export const CreateTypeLinkForm = () => {
  const {mutate: createMutate} = useCreateQuery('typeLink', typeLinkCreateAPI);

  const [form] = Form.useForm();

  const onFinish = (data) => {
    createMutate(data);
    form.resetFields();
  };

  return (
    <Container>
      <Form
        form={form}
        layout={'vertical'}
        name="control-hooks"
        onFinish={onFinish}
        style={{width: '100%'}}
      >
        <Form.Item name="title" label="Тип ссылки" rules={[{required: true}]}>
          <Input/>
        </Form.Item>
        <Form.Item>
          <ButtonPrimary htmlType="submit" title={'Создать'} />
        </Form.Item>
      </Form>
    </Container>
  );
};

