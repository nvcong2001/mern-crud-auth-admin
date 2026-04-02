import { Button, Checkbox, Form, Input, Divider } from "antd";
import {
  LockOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useAuthStore } from "../../stores/useAuthStore";
import { useNavigate, Link } from "react-router-dom";

const SignInPage = () => {
  const [form] = Form.useForm();
  const { signIn } = useAuthStore();
  const nav = useNavigate();

  const onFinish = async () => {
    try {
      const values = await form.validateFields();
      await signIn(values.username, values.password);
      nav("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Gradient Background with Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-blue-600 to-blue-900 flex-col justify-center items-center p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-40 h-40 bg-white rounded-full"></div>
          <div className="absolute bottom-40 right-20 w-64 h-64 bg-white rounded-full"></div>
        </div>

        <div className="relative z-10 text-center max-w-md">
          <div className="flex justify-center mb-8">
            <div className="bg-white bg-opacity-20 p-6 rounded-full backdrop-blur-md">
              <ShoppingCartOutlined
                style={{ fontSize: "48px" }}
                className="text-white"
              />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-6">Welcome Back</h1>
          <p className="text-lg text-blue-100 mb-8 leading-relaxed">
            Sign in to access your dashboard and manage your e-commerce platform
            with ease.
          </p>
          <div className="space-y-3 text-sm text-blue-100">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
              <span>Manage your products and inventory</span>
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
              <span>Track orders and sales analytics</span>
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
              <span>Secure account management</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
            <p className="text-gray-600">
              Enter your credentials to access your account
            </p>
          </div>

          {/* Form */}
          <Form
            form={form}
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="username"
              label={
                <span className="text-gray-700 font-medium">Username</span>
              }
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="Enter your username"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={
                <span className="text-gray-700 font-medium">Password</span>
              }
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Enter your password"
                className="rounded-lg"
              />
            </Form.Item>

            <div className="flex justify-between items-center mb-6">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox className="text-gray-700">Remember me</Checkbox>
              </Form.Item>
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Forgot password?
              </a>
            </div>

            <Form.Item>
              <Button
                block
                type="primary"
                htmlType="submit"
                size="large"
                className="font-semibold! h-12"
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>

          {/* Divider */}
          <Divider className="my-6">
            <span className="text-gray-500">or</span>
          </Divider>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-gray-700 mb-0">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Sign up now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
