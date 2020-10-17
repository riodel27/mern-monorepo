import { Form, Input, Button, Card } from 'antd';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Box } from './styled';
import useSignUp from 'hooks/auth/useSignUp';

export interface Inputs {
   name: string;
   email: string;
   password: string;
}

const schema = yup.object().shape({
   name: yup.string().required(),
   email: yup.string().email().required(),
   password: yup.string().required().min(8)
});

export const SignUp: React.FC = () => {
   const [signUp] = useSignUp();

   const { control, handleSubmit, errors } = useForm<Inputs>({
      resolver: yupResolver(schema)
   });

   const onSubmit = (data: Inputs) => signUp(data);

   return (
      <>
         <Box>
            <Card title="Sign Up" style={{ textAlign: 'center', width: '30%' }}>
               <Form name="basic" onFinish={handleSubmit(onSubmit)}>
                  <Form.Item
                     name="name"
                     validateStatus={errors.name?.message && 'error'}
                     help={
                        errors.name?.message && (errors.name?.message || 'name is a require field')
                     }
                     hasFeedback>
                     <Controller
                        as={Input}
                        name="name"
                        control={control}
                        defaultValue=""
                        placeholder="Name"
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
                     />
                  </Form.Item>

                  <Form.Item>
                     <Button type="primary" htmlType="submit">
                        Create my account
                     </Button>
                  </Form.Item>
               </Form>
            </Card>
         </Box>
      </>
   );
};
