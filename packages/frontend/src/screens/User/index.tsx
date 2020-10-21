/* eslint-disable react/display-name */
import React, { useCallback, useState } from 'react';
import { Table, Space, Layout, Row, Col, Drawer, Card, Result, Button } from 'antd';
import { usePaginatedQuery, useQueryCache } from 'react-query';

import { axiosInstance } from 'util/base';

const { Content } = Layout;

export const User: React.FC = () => {
   const cache = useQueryCache();

   const [visible_drawer, setVisibleDrawer] = useState(false);
   const [page, setPage] = useState(0);

   const fetchUsers = useCallback(async (key, page = 0) => {
      const { data } = await axiosInstance.get('/v1/users?page=' + page);
      return data;
   }, []);

   const {
      status,
      resolvedData: resolved_data,
      latestData: latest_data,
      isFetching
   } = usePaginatedQuery(['users', page], fetchUsers);

   // Prefetch the next page!
   React.useEffect(() => {
      if (latest_data?.has_more) {
         cache.prefetchQuery(['users', page + 1], fetchUsers);
      }
   }, [latest_data, fetchUsers, page]);

   const onClose = () => setVisibleDrawer(false);
   const handleShowDrawer = () => setVisibleDrawer(true);

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
                  {status === 'error' ? (
                     <Result
                        status="500"
                        title="500"
                        subTitle="Sorry, something went wrong."
                        extra={
                           <Button type="primary" href="/">
                              Back Home
                           </Button>
                        }
                     />
                  ) : (
                     <Table
                        columns={columns}
                        dataSource={resolved_data?.users}
                        scroll={{ x: 1500, y: 600 }}
                        sticky
                        loading={isFetching}
                        pagination={{ total: resolved_data?.meta?.count }}
                        rowKey={(record) => record._id}
                        onChange={(pagination: any) => setPage(pagination.current)}
                     />
                  )}
               </Card>
            </Col>
         </Row>
         <Drawer
            width={640}
            placement="right"
            closable={false}
            onClose={onClose}
            visible={visible_drawer}>
            <p className="site-description-item-profile-p" style={{ marginBottom: 24 }}>
               Edit User
            </p>
         </Drawer>
      </Content>
   );
};
