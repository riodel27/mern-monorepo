import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Form, Input, Button, Card } from 'antd';
import styled from 'styled-components';

const Box = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   width: 100%;
`;

type Inputs = {
   email: string;
   password: string;
};

/**
 * TODO: refactor for signin or signup authentication flow.
 */
export const UnAuthenticatedApp: React.FC = () => {
   const { control, handleSubmit } = useForm<Inputs>();

   const onSubmit = (data: Inputs) => console.log(data);

   return (
      <Box>
         <Card title="Log Into ..." style={{ textAlign: 'center', width: '30%' }}>
            <Form name="basic" onFinish={handleSubmit(onSubmit)}>
               <Form.Item name="email">
                  <Controller
                     as={Input}
                     name="email"
                     control={control}
                     defaultValue=""
                     placeholder="Email"
                  />
               </Form.Item>

               <Form.Item name="password">
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
                     Log In
                  </Button>
               </Form.Item>
            </Form>
         </Card>
      </Box>
   );
};
