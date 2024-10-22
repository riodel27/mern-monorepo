import React from 'react';
import { Form, Input, Button, Card, Col, Row, Layout } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import useSignUp from 'hooks/auth/useSignUp';

const { Content } = Layout;

const schema = yup.object().shape({
   name: yup.string().required(),
   email: yup.string().email().required(),
   password: yup.string().required().min(8)
});

export interface Inputs {
   name: string;
   email: string;
   password: string;
}

export const SignUp: React.FC = () => {
   const { control, handleSubmit, errors } = useForm<Inputs>({
      resolver: yupResolver(schema)
   });
   const [signUp] = useSignUp();

   const onSubmit = (data: Inputs) => signUp(data);

   return (
      <Content>
         <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
            <Col span={6}>
               <Card title="Sign Up" style={{ textAlign: 'center' }}>
                  <Form name="basic" onFinish={handleSubmit(onSubmit)}>
                     <Form.Item
                        name="name"
                        validateStatus={errors.name?.message && 'error'}
                        help={
                           errors.name?.message &&
                           (errors.name?.message || 'name is a require field')
                        }
                        hasFeedback>
                        <Controller
                           as={Input}
                           name="name"
                           control={control}
                           defaultValue=""
                           placeholder="Name"
                           size="large"
                        />
                     </Form.Item>

                     <Form.Item
                        name="email"
                        validateStatus={errors.email?.message && 'error'}
                        help={errors.email?.message && errors.email?.message}
                        hasFeedback>
                        <Controller
                           as={Input}
                           name="email"
                           control={control}
                           defaultValue=""
                           placeholder="Email"
                           size="large"
                        />
                     </Form.Item>

                     <Form.Item
                        name="password"
                        validateStatus={errors.password?.message && 'error'}
                        help={errors.password?.message && errors.password?.message}
                        hasFeedback>
                        <Controller
                           as={Input}
                           name="password"
                           control={control}
                           defaultValue=""
                           placeholder="Password"
                           size="large"
                           type="password"
                        />
                     </Form.Item>

                     <Form.Item>
                        <Button type="primary" htmlType="submit">
                           Create my account
                        </Button>
                     </Form.Item>
                  </Form>
               </Card>
            </Col>
         </Row>
      </Content>
   );
};
