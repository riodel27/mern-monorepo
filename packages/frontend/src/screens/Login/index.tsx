import React from 'react';
import { Form, Input, Button, Card, Col, Row, Layout } from 'antd';
import { useForm, Controller } from 'react-hook-form';

import useSignIn from 'hooks/auth/useSignIn';

const { Content } = Layout;
export interface Inputs {
   email: string;
   password: string;
}

export const Login: React.FC = () => {
   const { control, handleSubmit, errors } = useForm<Inputs>();

   const [signIn] = useSignIn();

   const onSubmit = (data: Inputs) => signIn(data);

   return (
      <Content>
         <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
            <Col span={6}>
               <Card title="Sign In" style={{ textAlign: 'center' }}>
                  <Form name="basic" onFinish={handleSubmit(onSubmit)}>
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
                           Log In
                        </Button>
                     </Form.Item>
                  </Form>
               </Card>
            </Col>
         </Row>
      </Content>
   );
};
