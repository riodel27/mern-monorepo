import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Form, Input, Button } from 'antd';

type Inputs = {
   email: string;
   password: string;
};

export const UnAuthenticatedApp: React.FC = () => {
   const { control, handleSubmit, errors } = useForm<Inputs>();

   const onSubmit = (data: Inputs) => console.log(data);

   return (
      <Form name="basic" onFinish={handleSubmit(onSubmit)}>
         <Form.Item
            label="Email"
            name="email"
            validateStatus={errors.email?.message ? 'error' : 'success'}
            help={errors.email?.message && errors.email.message}
            // hasFeedback={errors.email?.message ? true: false}
         >
            <Controller as={Input} name="email" control={control} defaultValue="" />
         </Form.Item>

         <Form.Item label="Password" name="password">
            <Controller as={Input} name="password" control={control} defaultValue="" />
         </Form.Item>

         <Form.Item>
            <Button type="primary" htmlType="submit">
               Submit
            </Button>
         </Form.Item>
      </Form>
   );
};

//TODO: Login or SignUp Form...
