import React, { useEffect, useState } from "react";
import DefaultLayout from "../Components/DefaultLayout";
import {
  IdcardOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { Form, Input, Modal, Table } from "antd";
import LoyaltyCard from "../Components/LoyaltyCard";

const CustomerPage = () => {
  // States
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [editPopup, setEditPopup] = useState(false);
  const [selectedLoyaltyCard, setSelectedLoyaltyCard] = useState(null);
  const [loyaltyCardPopup, setLoyaltyCardPopup] = useState(false);

  // This is to get All the customers
  const getAllCustomers = async () => {
    const { data } = await axios.get(
      "http://localhost:4000/api/customer/get-all"
    );
    if (data.success) {
      setCustomers(data.customers);
    }
  };

  // This is to delete the Customer
  const deleteCustomer = async (record) => {
    const { data } = await axios.delete(
      `http://localhost:4000/api/customer/delete-customer/${record._id}`
    );
    if (data.success) {
      getAllCustomers();
    }
  };

  // This is to edit the Customer
  const handleEditCustomer = async (value) => {
    const { data } = await axios.put(
      `http://localhost:4000/api/customer/edit-customer/${selectedCustomer._id}`,
      value
    );
    if (data.success) {
      setEditPopup(false);
      getAllCustomers();
    }
  };

  // This is to fetch all the customers when the page is redirected
  useEffect(() => {
    getAllCustomers();
  }, []);

  const columns = [
    { title: "ID", dataIndex: "_id" },
    { title: "Name", dataIndex: "name" },
    { title: "Phone Number", dataIndex: "phone" },
    { title: "Address", dataIndex: "address" },
    { title: "Email", dataIndex: "email" },
    {
      title: "",
      dataIndex: "_id",
      render: (id, record) => (
        <>
          <IdcardOutlined
            className="m-2"
            onClick={() => {
              setSelectedLoyaltyCard(record);
              setLoyaltyCardPopup(true);
            }}
          />
          <EditOutlined
            className="m-2"
            onClick={() => {
              setSelectedCustomer(record);
              setEditPopup(true);
            }}
          />
          <DeleteOutlined
            className="m-2"
            onClick={() => {
              deleteCustomer(record);
            }}
          />
        </>
      ),
    },
  ];
  return (
    <DefaultLayout>
      <h1 className="text-center my-3">Customers Page</h1>
      <Table
        className="my-3"
        columns={columns}
        dataSource={customers}
        pagination={false}
      />
      <Modal
        onCancel={() => {
          setEditPopup(false);
        }}
        open={editPopup}
        footer={false}
        title={<h1>Edit Customer</h1>}
      >
        <Form initialValues={selectedCustomer} onFinish={handleEditCustomer}>
          <Form.Item name="name" label="Name">
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone">
            <Input />
          </Form.Item>
          <Form.Item name="address" label="Address">
            <Input />
          </Form.Item>
          <button className="btn btn-primary" type="submit">
            Edit Customer
          </button>
        </Form>
      </Modal>
      <Modal
        open={loyaltyCardPopup}
        onCancel={() => {
          setLoyaltyCardPopup(false);
        }}
        footer={false}
        title={<h1>Loyalty Card</h1>}
      >
        <div className="d-flex align-items-center justify-content-center my-4">
          <LoyaltyCard customer={selectedLoyaltyCard} />
        </div>
      </Modal>
    </DefaultLayout>
  );
};

export default CustomerPage;
