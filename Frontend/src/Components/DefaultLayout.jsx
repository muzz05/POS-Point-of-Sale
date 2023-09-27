import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  CopyOutlined,
  UnorderedListOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Badge, Spin } from "antd";
import { Link, redirect, useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;
const DefaultLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { cartItems, loading } = useSelector((state) => state.rootReducer);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (screen.width < 730) {
      setCollapsed(true);
    }
  }, []);
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ margin: "5px", borderRadius: "10px", padding: "5px" }}
      >
        <div className="demo-logo-vertical">
          {collapsed === true ? (
            <h3 className="text-center text-light p-1 py-3">POS</h3>
          ) : (
            <h1 className="text-center text-light p-3">POS</h1>
          )}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={window.location.pathname}
          items={[
            {
              key: "/",
              icon: <HomeOutlined />,
              label: (
                <Link className="Links-of-sidebar" to="/">
                  Home
                </Link>
              ),
            },
            {
              key: "/bills",
              icon: <CopyOutlined />,
              label: (
                <Link className="Links-of-sidebar" to="/bills">
                  Bills
                </Link>
              ),
            },
            {
              key: "/items",
              icon: <UnorderedListOutlined />,
              label: (
                <Link className="Links-of-sidebar" to="/items">
                  Items
                </Link>
              ),
            },
            {
              key: "/customers",
              icon: <UserOutlined />,
              label: (
                <Link className="Links-of-sidebar" to="/customers">
                  Customers
                </Link>
              ),
            },
            {
              key: "/logout",
              icon: <LogoutOutlined />,
              label: (
                <Link
                  className="Links-of-sidebar"
                  onClick={() => {
                    localStorage.removeItem("auth");
                  }}
                  to={"/login"}
                >
                  Logout
                </Link>
              ),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            margin: "5px",
            borderRadius: "10px",
            border: "1px solid #e6e6e6",
          }}
        >
          <div className="d-flex justify-content-between">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <div className="mx-4">
              <Badge count={cartItems.length} color="blue">
                <ShoppingCartOutlined
                  style={{ fontSize: "1.5rem" }}
                  onClick={() => {
                    navigate("/cart");
                  }}
                />
              </Badge>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 10px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: "10px",
            border: "1px solid #e6e6e6",
            overflowY: "auto",
          }}
        >
          {loading ? (
            <div className="text-center">
              <Spin
                size="large"
                style={{ position: "absolute", top: "50vh" }}
              />
            </div>
          ) : (
            children
          )}
        </Content>
      </Layout>
    </Layout>
  );
};
export default DefaultLayout;
