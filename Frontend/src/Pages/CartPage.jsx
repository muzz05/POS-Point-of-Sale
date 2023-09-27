import React, { useEffect, useState } from "react";
import DefaultLayout from "../Components/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Modal, Table, Form, Input, Select } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  // States
  const [subTotal, setSubTotal] = useState(0);
  const [billPopup, setBillPopup] = useState(false);
  const [loyaltyPopup, setLoyaltyPopup] = useState(false);
  const [tax, setTax] = useState(10);
  const { cartItems } = useSelector((state) => state.rootReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // This is to Increase the Quantity of a Product
  const handleIncreementInQuantity = (record) => {
    dispatch({
      type: "Update_Cart",
      payload: { ...record, quantity: record.quantity + 1 },
    });
  };

  // This is to Decrease the Quantity of a Product
  const handleDecreementInQuantity = (record) => {
    if (record.quantity !== 1) {
      dispatch({
        type: "Update_Cart",
        payload: { ...record, quantity: record.quantity - 1 },
      });
    }
  };

  // This is to Delete the Product from the Cart
  const handleDelete = (record) => {
    dispatch({
      type: "Remove_From_Cart",
      payload: record,
    });
  };

  // This is to Generate the Bill in the backend
  const handleBillGeneration = async (value) => {
    const formData = value;
    if (formData.customerId === "") {
      delete formData.customerId;
    }
    const billData = {
      ...formData,
      totalAmount:
        Number(((subTotal / 100) * tax).toFixed(2)) + Number(subTotal),
      tax: Number(((subTotal / 100) * tax).toFixed(2)),
      cartItems,
    };
    const { data } = await axios.post(
      "http://localhost:4000/api/bill/add-bill",
      billData
    );
    if (data.success) {
      dispatch({
        type: "Delete_Cart",
        payload: "",
      });
      navigate("/bills");
    }
  };

  // This is to Generate a Loyalty Customer
  const handleLoyaltyGeneration = async (value) => {
    const { data } = await axios.post(
      "http://localhost:4000/api/customer/add-customer",
      value
    );
    if (data.success) {
      setLoyaltyPopup(false);
      navigate("/customers");
    }
  };

  // This is The Column to show the Table data
  const columns = [
    { title: "Name", dataIndex: "name" },
    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <img
          src={image}
          alt={record.name}
          height={35}
          style={{ borderRadius: "10px" }}
        ></img>
      ),
    },
    { title: "Price", dataIndex: "price" },
    {
      title: "Quantity",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <PlusCircleOutlined
            className="mx-1"
            onClick={() => handleIncreementInQuantity(record)}
          />
          <span className="mx-1">{record.quantity}</span>
          <MinusCircleOutlined
            className="mx-1"
            onClick={() => handleDecreementInQuantity(record)}
          />
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "_id",
      render: (id, record) => (
        <DeleteOutlined onClick={() => handleDelete(record)} />
      ),
    },
  ];

  // This is to Change the total price when the cart is updated
  useEffect(() => {
    let tempTotal = 0;
    cartItems.forEach((item) => {
      tempTotal = tempTotal + item.price * item.quantity;
    });
    setSubTotal(tempTotal);
  }, [cartItems]);

  return (
    <DefaultLayout>
      <h1 className="text-center my-4">Cart Info</h1>
      <div className="container my-4">
        <Table columns={columns} dataSource={cartItems} pagination={false} />
        <div className="d-flex align-items-end flex-column my-4">
          <h5 className="my-2">
            SubTotal : $<b>{subTotal}</b> /-
          </h5>
          <button
            className="btn btn-primary my-3"
            onClick={() => {
              setBillPopup(true);
            }}
          >
            Create Invoice
          </button>
        </div>
      </div>
      <Modal
        footer={false}
        title="Create Invoice"
        open={billPopup}
        onCancel={() => {
          setBillPopup(false);
        }}
      >
        <Form className="mt-4" size="large" onFinish={handleBillGeneration}>
          <Form.Item name="customerName" label="Customer Name">
            <Input />
          </Form.Item>
          <Form.Item name="customerPhone" label="Customer Phone Number">
            <Input />
          </Form.Item>
          <Form.Item name="customerId" label="Loyalty Card Id">
            <Input required={false} />
          </Form.Item>
          <Form.Item name="payment" label="Payment">
            <Select
              options={[
                { value: "cash", label: "Cash" },
                { value: "card", label: "Card" },
              ]}
            />
          </Form.Item>
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <h6>
                Total: $<b>{subTotal}</b> /-
              </h6>
              <h6>
                Tax: $<b>{((subTotal / 100) * tax).toFixed(2)}</b> /-
              </h6>
              <h6>
                Sub Total: $
                <b>
                  {Number(((subTotal / 100) * tax).toFixed(2)) +
                    Number(subTotal)}
                </b>
                /-
              </h6>
            </div>
            <button type="submit" className="btn btn-primary my-2">
              Generate Bill
            </button>
          </div>
        </Form>
        <div className="d-flex align-items-center justify-content-end">
          {subTotal > 1500 ? (
            <button
              className="btn btn-success"
              onClick={() => {
                setLoyaltyPopup(true);
              }}
            >
              Create Loyalty Card
            </button>
          ) : (
            ""
          )}
        </div>
      </Modal>
      <Modal
        open={loyaltyPopup}
        onCancel={() => {
          setLoyaltyPopup(false);
        }}
        footer={false}
        title={<h1>Create Loyalty Card</h1>}
      >
        <Form className="mt-4" size="large" onFinish={handleLoyaltyGeneration}>
          <Form.Item name="name" label="Customer Name">
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Customer Phone Number">
            <Input />
          </Form.Item>
          <Form.Item name="address" label="Customer Address">
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Customer Email">
            <Input />
          </Form.Item>
          <div className="d-flex align-items-center justify-content-end">
            <div>
              <button type="submit" className="btn btn-primary my-2">
                Create Loyalty Card
              </button>
            </div>
          </div>
        </Form>
      </Modal>
    </DefaultLayout>
  );
};

export default CartPage;
