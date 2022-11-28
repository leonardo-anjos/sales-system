import { Button, Layout } from 'antd';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const { Header, Footer, Content } = Layout;

const Home = () => (
  <>
    <Layout>
      <Header>
        <div 
          style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            color: '#e8e8e8',
            fontSize: '20px',
            fontWeight: 'bold' 
          }}>
          Sistema de Vendas
        </div>
      </Header>
      
      <Content style={{ backgroundColor: '#ffff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ position: 'absolute', top: '50%', marginTop: '-25px' }}>
          <Link to={'/customers'}>
            <Button size={'large'}>Clientes</Button>
          </Link>
          <Link to={'/orders'}>
            <Button size={'large'} style={{ marginLeft: '20px' }}>Pedidos</Button>
          </Link>
        </div>
      </Content>
    
      <Footer style={{ 
        borderTop: '1px solid #e8e8e8',
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        Sistemas Distribuidos - FBuni 2022.2
      </Footer>
    </Layout>
  </>
);

export default withRouter(Home);