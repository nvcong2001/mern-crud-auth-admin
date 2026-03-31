import { Avatar, Dropdown, theme, type MenuProps } from "antd";
import { BulbOutlined, MoonOutlined, UserOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Header } from "antd/es/layout/layout";
import { useAuthStore } from "../../stores/useAuthStore";
import { useNavigate } from "react-router-dom";

const { useToken } = theme;

const AppHeader = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const { signOut } = useAuthStore();
  const nav = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      nav("/signin");
    } catch (error) {
      console.error(error);
    }
  };

  const items = [
    {
      key: "profile",
      label: "Profile",
    },
    {
      key: "settings",
      label: "Settings",
    },
    {
      key: "logout",
      label: "Logout",
    },
  ];

  const { token } = useToken();

  const onAvatarMenuClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "logout") {
      handleLogout();
      return;
    }
    nav(`/${key}`);
  };

  return (
    <Header
      className="flex justify-between items-center px-6 shadow-sm"
      style={{ background: token.colorBgContainer }}
    >
      <div></div>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="text-lg cursor-pointer hover:text-blue-500 transition-colors"
        >
          {isDark ? <BulbOutlined /> : <MoonOutlined />}
        </button>

        <Dropdown
          menu={{ items, onClick: onAvatarMenuClick }}
          placement="bottomRight"
        >
          <Avatar
            size={"large"}
            icon={<UserOutlined />}
            className="cursor-pointer"
          />
        </Dropdown>
      </div>
    </Header>
  );
};

export default AppHeader;
