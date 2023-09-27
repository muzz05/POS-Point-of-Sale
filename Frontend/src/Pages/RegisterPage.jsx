import React, { useEffect } from "react";
import { Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const navigate = useNavigate();

  // This is to Register the user
  const handleRegister = async (value) => {
    const { data } = await axios.post(
      "http://localhost:4000/api/user/register",
      value
    );
    if (data.success) {
      console.log(data.user);
      navigate("/login");
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
            Register
          </h1>
          <Form className="mt-4" size="large" onFinish={handleRegister}>
            <Form.Item name="name" label=" Full Name">
              <Input />
            </Form.Item>
            <Form.Item name="userId" label="UserId">
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input.Password />
            </Form.Item>
            <p>
              If You have already Registered{" "}
              <Link to="/login">Login Here!</Link>
            </p>
            <button type="submit" className="btn btn-primary my-2">
              Register
            </button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
