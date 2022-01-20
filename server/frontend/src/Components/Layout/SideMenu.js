import React, { useState } from "react";

import { Layout, Menu } from "antd";
import {
  DatabaseOutlined,
  MailOutlined,
  PieChartOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

const { Sider } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const onCollapse = (collapsed) => setCollapsed(collapsed);
  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[location.pathname]}
      >
        <Menu.Item key="/dashboard" icon={<PieChartOutlined />}>
          <span>Dashboard</span>
          <Link to="/app"></Link>
        </Menu.Item>
        <Menu.Item key="/subject" icon={<DatabaseOutlined />}>
          <span>Subject</span>
          <Link to="/app/subject" />
        </Menu.Item>
        <Menu.Item key="/account" icon={<UserOutlined />}>
          <span>Accounts</span>
          <Link to="/app/account" />
        </Menu.Item>
        <Menu.Item key="/mail" icon={<MailOutlined />}>
          <span>Email</span>
          <Link to="/app/mail" />
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default App;
