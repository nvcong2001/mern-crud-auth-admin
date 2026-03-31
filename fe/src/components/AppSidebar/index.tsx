import { Menu, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { DashboardOutlined, ShoppingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { useToken } = theme;

const AppSidebar = () => {
  const { token } = useToken();
  const nav = useNavigate();

  const items = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "products",
      icon: <ShoppingOutlined />,
      label: "Products",
    },
    {
      key: "category",
      icon: <ShoppingOutlined />,
      label: "Category",
    },
  ];

  const handleNavigate = (e: any) => {
    nav(`/${e.key}`);
  };

  return (
    <Sider trigger={null} collapsible style={{ background: token.colorBgContainer }}>
      <div className="text-xl font-bold text-blue-600 text-center py-5">
        ADMIN PANEL
      </div>

      <Menu
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={items}
        className="h-screen"
        onClick={handleNavigate}
      />
    </Sider>
  );
};

export default AppSidebar;
