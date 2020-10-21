/* eslint-disable react/display-name */
import React, { useState } from 'react';
import { Table, Space, Layout, Row, Col, Drawer, Card } from 'antd';
import useGetUsers from 'hooks/user/useGetUsers';

const { Content } = Layout;

export const User: React.FC = () => {
   const [visible, setVisible] = useState(false);
   const { data: users, isLoading } = useGetUsers();

   const onClose = () => setVisible(false);
   const handleShowDrawer = () => setVisible(true);

   const columns = [
      {
         title: 'Name',
         width: 100,
         dataIndex: 'name',
         key: 'name',
         fixed: 'left' as const
         //  render: (text: string) => <a onClick={handleShowDrawer}>{text}</a>
      },
      {
         title: 'Age',
         width: 100,
         dataIndex: 'age',
         key: 'age',
         fixed: 'left' as const
      },
      {
         title: 'City',
         dataIndex: 'city',
         key: 'city',
         width: 150
      },
      {
         title: 'Country',
         dataIndex: 'country',
         key: 'country',
         width: 150
      },
      {
         title: 'Birth Day',
         dataIndex: 'birthday',
         key: 'birthday',
         width: 150
      },
      {
         title: 'Message',
         dataIndex: 'message',
         key: 'message',
         width: 150
      },
      {
         title: 'Position',
         dataIndex: 'position',
         key: 'position',
         width: 150
      },
      {
         title: 'Department',
         dataIndex: 'department',
         key: 'department',
         width: 150
      },
      {
         title: 'Supervisor',
         dataIndex: 'supervisor',
         key: 'supervisor',
         width: 150
      },
      { title: 'Phone #', dataIndex: 'phone_number', key: 'phone_number', width: 150 },
      { title: 'Github', dataIndex: 'github', key: 'github', width: 150 },
      {
         title: 'Action',
         key: 'operation',
         fixed: 'right' as const,
         width: 150,
         render: () => {
            return (
               <>
                  <Row justify="center" align="middle">
                     <Col>
                        <Space>
                           <a onClick={handleShowDrawer}>Edit</a>
                           <a>Delete</a>
                        </Space>
                     </Col>
                  </Row>
               </>
            );
         }
      }
   ];

   return (
      <Content>
         <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
            <Col span={18}>
               <Card title="Users">
                  <Table
                     columns={columns}
                     dataSource={users}
                     scroll={{ x: 1500, y: 600 }}
                     sticky
                     loading={isLoading}
                     pagination={{ total: 20 }}
                  />
               </Card>
            </Col>
         </Row>
         <Drawer width={640} placement="right" closable={false} onClose={onClose} visible={visible}>
            <p className="site-description-item-profile-p" style={{ marginBottom: 24 }}>
               Edit User
            </p>
         </Drawer>
      </Content>
   );
};
