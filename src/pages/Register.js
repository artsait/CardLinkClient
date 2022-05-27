import * as React from 'react';
import {Form, Input, notification, Typography} from 'antd';
import styled from 'styled-components';
import {ButtonLink, ButtonPrimary} from '../components/UIKit';
import {registrationAPI} from '../http/userAPI';
import {useContext, useState} from 'react';
import {Context} from '../App';

const {Text} = Typography;

export const Register = () => {
  const {switchUser} = useContext(Context);
  const [regStatus, setRegStatus] = useState(1);
  const [userData, setUserData] = useState(null);

  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    setUserData({email: values?.email, password: values?.password});
    try {
      const {data} = await registrationAPI(values.email, values.password);
      setRegStatus(3);
      notification.success({
        message: data?.message,
      });
    } catch (e) {
      setRegStatus(4);
      notification.error({
        message: 'ошибка регистрации',
        description: e?.response?.data?.message,
      });
    }
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const loginNewUser = () => {
    switchUser(userData.email, userData.password);
  };


  return (
    <StyleContainer>

      {regStatus === 3 && <BoxContainer>
        <Text type="success" style={{textAlign: 'center'}}>Пользователь {userData.email} успешно создан</Text>
        <ButtonLink type="link" title={'Вход под новым аккаунтом'} action={loginNewUser}/>
        <ButtonLink type="link" title={'Создать еще одного пользователя'} action={()=>setRegStatus(1)}/>
      </BoxContainer>}

      {regStatus === 4 && <BoxContainer>
        <Text type="danger" style={{textAlign: 'center'}}>Произошла ошибка</Text>
        <ButtonLink type="link" title={'Повторить попытку'} action={()=>setRegStatus(1)}/>
      </BoxContainer>}

      {regStatus === 1 && <Form
        form={form}
        name="basic"
        labelCol={{span: 8}}
        wrapperCol={{span: 16}}
        initialValues={{remember: true}}
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="логин"
          name="email"
          rules={[{required: true, message: 'Введите электронную почту!', type: 'email'}]}
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

        <Form.Item wrapperCol={{offset: 8, span: 16}}>
          <ButtonPrimary type="primary" htmlType="submit" title={'Создать пользователя'} />
        </Form.Item>
      </Form>}
    </StyleContainer>
  );
};

const StyleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;
  max-width: 400px;
  height: 100vh;
  margin: 100px auto 0;
`;

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto ;
`;
