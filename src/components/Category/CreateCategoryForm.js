import React from 'react';
import {Form, Input, Radio} from 'antd';
import {Container} from '../../HOC/Container';
import {categoryCreateAPI} from '../../http/userAPI';
import {useCreateQuery} from '../../http/useCreateQuery';
import {ButtonPrimary} from '../UIKit';

export const CreateCategoryForm = ({colors}) => {
  const [form] = Form.useForm();

  const {mutate: createMutate} = useCreateQuery('categoryList', categoryCreateAPI);

  const onFinish = (data) => {
    createMutate(data);
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
        <Form.Item name="title" label="категория" rules={[{required: true}]}>
          <Input/>
        </Form.Item>
        <Form.Item name="colorId" label="цвет" rules={[{required: true}]}>
          <Radio.Group size="large" buttonStyle="solid">
            {colors?.map(({color, id}) => <Radio.Button key={id} value={id} style={{background: color, margin: '2px', width: '115px'}}>{color}</Radio.Button>)}
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <ButtonPrimary htmlType="submit" title={'Создать'}/>
        </Form.Item>
      </Form>
    </Container>
  );
};

