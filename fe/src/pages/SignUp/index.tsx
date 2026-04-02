import { Button, Form, Input, Divider } from "antd";
import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useAuthStore } from "../../stores/useAuthStore";
import { useNavigate, Link } from "react-router-dom";

const SignUpPage = () => {
  const [form] = Form.useForm();
  const { signUp } = useAuthStore();
  const nav = useNavigate();

  const onFinish = async () => {
    try {
      const values = await form.validateFields();
      await signUp(
        values.username,
        values.password,
        values.email,
        values.firstName,
        values.lastName,
      );
      form.resetFields();
      nav("/signin");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Gradient Background with Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-blue-900 to-blue-600 flex-col justify-center items-center p-12 text-white relative overflow-hidden">
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
          <h1 className="text-5xl font-bold mb-6">Get Started Today</h1>
          <p className="text-lg text-green-100 mb-8 leading-relaxed">
            Create your account and start managing your e-commerce business with
            powerful tools.
          </p>
          <div className="space-y-3 text-sm text-green-100">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
              <span>Free account creation</span>
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
              <span>Instant access to features</span>
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
              <span>24/7 customer support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Create Account
            </h2>
            <p className="text-gray-600">Sign up to start your journey</p>
          </div>

          {/* Form */}
          <Form
            form={form}
            name="register"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
            size="large"
          >
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Form.Item
                name="firstName"
                label={
                  <span className="text-gray-700 font-medium text-sm">
                    First Name
                  </span>
                }
                rules={[{ required: true, message: "Required!" }]}
              >
                <Input
                  prefix={<UserOutlined className="text-gray-400" />}
                  placeholder="First name"
                  className="rounded-lg"
                />
              </Form.Item>
              <Form.Item
                name="lastName"
                label={
                  <span className="text-gray-700 font-medium text-sm">
                    Last Name
                  </span>
                }
                rules={[{ required: true, message: "Required!" }]}
              >
                <Input
                  prefix={<UserOutlined className="text-gray-400" />}
                  placeholder="Last name"
                  className="rounded-lg"
                />
              </Form.Item>
            </div>

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
                placeholder="Choose a username"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="email"
              label={<span className="text-gray-700 font-medium">Email</span>}
              rules={[
                { required: true, message: "Please input your Email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input
                prefix={<MailOutlined className="text-gray-400" />}
                placeholder="Enter your email"
                className="rounded-lg"
                type="email"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={
                <span className="text-gray-700 font-medium">Password</span>
              }
              rules={[
                { required: true, message: "Please input your Password!" },
                { min: 6, message: "Password must be at least 6 characters!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Create a strong password"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label={
                <span className="text-gray-700 font-medium">
                  Confirm Password
                </span>
              }
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your Password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Confirm your password"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item>
              <Button
                block
                type="primary"
                htmlType="submit"
                size="large"
                className=" font-semibold!"
              >
                Create Account
              </Button>
            </Form.Item>
          </Form>

          {/* Divider */}
          <Divider className="my-6">
            <span className="text-gray-500">or</span>
          </Divider>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-gray-700 mb-0">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
