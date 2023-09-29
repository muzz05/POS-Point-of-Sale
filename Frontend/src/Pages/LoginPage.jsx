import React, { useEffect } from "react";
import { Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();

  // This is to Login the user
  const handleLogin = async (value) => {
    const { data } = await axios.post(
      "http://localhost:4000/api/user/login",
      value
    );
    if (data.success) {
      localStorage.setItem("auth", JSON.stringify(data.user));
      navigate("/");
    }
  };

  // This is to check if the user is already Logged in
  useEffect(() => {
    if (localStorage.getItem("auth")) {
      localStorage.getItem("auth");
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <div
        className="d-flex align-items-center flex-column"
        style={{ backgroundColor: "#F0F0F0", height: "100vh" }}
      >
        <div className="container" style={{ margin: "40px 0px" }}>
          <h1 className="text-center" style={{ fontSize: "3rem" }}>
            POS User Authentication
          </h1>
        </div>
        <div
          className="container border"
          style={{
            borderRadius: "10px",
            padding: "40px",
            width: "30vw",
            minWidth: "270px",
            backgroundColor: "whitesmoke",
          }}
        >
          <h1 className="text-center" style={{ marginBottom: "40px" }}>
            Login
          </h1>
          <Form className="mt-4" size="large" onFinish={handleLogin}>
            <Form.Item name="cashierId" label="Cashier Id">
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input.Password />
            </Form.Item>
            <p>
              If You have Not Registered{" "}
              <Link to="/register">Register Here!</Link>
            </p>
            <button type="submit" className="btn btn-primary my-2">
              Login
            </button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
