import * as React from 'react';
import {Form, Input} from 'antd';
import {useNavigate} from 'react-router-dom';
import {useContext, useEffect} from 'react';
import {Context} from '../App';
import styled from 'styled-components';
import {ButtonPrimary} from '../components/UIKit';

export const Auth = () => {
  const {isAuth, auth} = useContext(Context);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth]);

  const handleSubmit = (values) => {
    auth(values.email, values.password);
  };


  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <StyleContainer>
      <Form
        form={form}
        layout={'vertical'}
        name="basic"
        initialValues={{remember: true}}
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="логин"
          name="email"
          rules={[{required: true, message: 'Введите электронную почту!', type: 'string'}]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="пароль"
          name="password"
          rules={[{required: true, message: 'Введите пароль!'}]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <ButtonPrimary type="primary" htmlType="submit" title={'Войти'} />
        </Form.Item>
      </Form>
    </StyleContainer>
  );
};

const StyleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;
