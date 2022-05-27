import React from 'react';
import {Form, Input, Select} from 'antd';
import {Container} from '../../HOC/Container';
import {linkCreateAPI} from '../../http/userAPI';
import {ButtonPrimary} from '../UIKit';
import {useCreateQuery} from '../../http/useCreateQuery';
const {Option} = Select;

export const CreateLinkForm = ({typesLink, id}) => {
  const [form] = Form.useForm();
  const {mutate: createMutate} = useCreateQuery(['link', id], linkCreateAPI);

  const onFinish = async ({link, typeLinkId}) => {
    createMutate({url: link, typeLinkId, cardId: id});
    onReset();
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Container>
      <Form
        layout={'vertical'}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        style={{width: '100%'}}
      >
        <Form.Item name="link" label="Ссылка" rules={[{required: true}]}>
          <Input/>
        </Form.Item>
        <Form.Item name="typeLinkId" label="Категория" rules={[{required: true}]}>
          <Select
            placeholder="выберите категорию"
            allowClear
          >
            {typesLink?.map(({id, title})=> <Option key={id} value={id}>{title}</Option>)}
          </Select>
        </Form.Item>
        <Form.Item >
          <ButtonPrimary htmlType="submit" title={'Создать'} />
        </Form.Item>
      </Form>
    </Container>
  );
};
