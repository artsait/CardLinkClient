import * as React from 'react';
import {Form, Input, Select, DatePicker} from 'antd';
import {useCityQuery} from '../../http/useCityQuery';
import {CARD_CITY, CARD_DATE, CARD_TITLE} from '../../utils/validation';
import moment from 'moment';
import 'moment/locale/ru';
import {cardCreateAPI} from '../../http/userAPI';
import {useCategoryQuery} from '../../http/useCategoryQuery';
import {useMutation} from 'react-query';
import {useCreateQuery} from '../../http/useCreateQuery';
import {ButtonPrimary} from '../UIKit';

const {Option} = Select;
const {RangePicker} = DatePicker;

export const CreateNewCardForm = () => {
  const [form] = Form.useForm();
  const {data: dataCity} = useCityQuery();
  const {data: category} = useCategoryQuery();
  const {mutate: createMutate} = useCreateQuery('cardList', cardCreateAPI);

  const mutation = useMutation(async (data) =>
    await createMutate(data),
  );

  const onFinish = async (values) => {
    const dateStart = moment(values.date[0]).format();
    const dateEnd = moment(values.date[1]).format();

    mutation.mutate({
      title: values.title,
      cityId: values.cityId,
      dateStart,
      dateEnd,
      categoryId: values.categoryId,
    });

    form.resetFields();
  };

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        name="control-hooks"
        onFinish={onFinish}
      >
        <Form.Item name="title" label="Название" rules={CARD_TITLE} >
          <Input />
        </Form.Item>
        <Form.Item name="categoryId" label="Категория" rules={CARD_CITY}>
          <Select
            placeholder="Выберите категорию"
            allowClear
          >
            {category?.map(({id, title})=> <Option key={id} value={id}>{title}</Option>)}
          </Select>
        </Form.Item>
        <Form.Item name="cityId" label="Город" rules={CARD_CITY}>
          <Select
            placeholder="Выберите город"
            allowClear
          >
            {dataCity?.map(({id, name})=> <Option key={id} value={id}>{name}</Option>)}
          </Select>
        </Form.Item>
        <Form.Item name="date" label="укажите даты" rules={CARD_DATE} >
          <RangePicker style={{width: '100%'}}/>
        </Form.Item>

        <Form.Item>
          <ButtonPrimary htmlType="submit" title={'Создать'} />
        </Form.Item>
      </Form>
    </>
  );
};
