import React, { useEffect, useState } from "react";
import DefaultLayout from "../Components/DefaultLayout";
import axios from "axios";
import { useDispatch } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Form, Input, Modal, Select, Table } from "antd";

const ItemPage = () => {
  const [itemData, setItemData] = useState([]);
  const dispatch = useDispatch();
  const [popupModal, setPopupModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  // This is to get All items
  const GetAllItems = async () => {
    dispatch({
      type: "Show_Loading",
    });
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/items/get-items"
      );
      dispatch({
        type: "Hide_Loading",
      });
      setItemData(data.items);
    } catch (error) {
      console.log(error);
    }
  };

  // This is to Run the Get all Items Functional when the component mounts
  useEffect(() => {
    GetAllItems();
  }, []);

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
          height={40}
          style={{ borderRadius: "10px" }}
        ></img>
      ),
    },
    { title: "Price", dataIndex: "price" },
    {
      title: "",
      dataIndex: "_id",
      render: (id, record) => (
        <>
          <DeleteOutlined
            onClick={() => {
              handleDelete(record);
            }}
          />
          <EditOutlined
            className="mx-2"
            onClick={() => {
              setEditItem(record);
              setPopupModal(true);
            }}
          />
        </>
      ),
    },
  ];

  // This is to Add or Edit Item
  const handleSubmit = async (value) => {
    if (editItem === null) {
      const { data } = await axios.post(
        "http://localhost:4000/api/items/add-item",
        value
      );
      if (data.success) {
        GetAllItems();
        setPopupModal(false);
      }
    } else {
      const { data } = await axios.put(
        "http://localhost:4000/api/items/edit-item",
        { ...value, _id: editItem._id }
      );
      if (data.success) {
        GetAllItems();
        setPopupModal(false);
      }
    }
  };

  // This is to delete the item
  const handleDelete = async (record) => {
    const { data } = await axios.delete(
      `http://localhost:4000/api/items/delete-item/${record._id}`
    );
    if (data.success) {
      GetAllItems();
    }
  };
  return (
    <DefaultLayout>
      <h1 className=" text-center my-4">Item Page</h1>
      <div className="container">
        <Table columns={columns} dataSource={itemData} />
        <button
          className="btn btn-primary"
          onClick={() => {
            setPopupModal(true);
          }}
        >
          Add Item
        </button>
      </div>
      {popupModal && (
        <Modal
          footer={false}
          title={editItem !== null ? "Edit Item" : "Add Item"}
          open={popupModal}
          onCancel={() => {
            setEditItem(null);
            setPopupModal(false);
          }}
        >
          <div className="container my-4">
            <Form onFinish={handleSubmit} initialValues={editItem}>
              <Form.Item name="name" label="Name">
                <Input />
              </Form.Item>
              <Form.Item name="price" label="Price">
                <Input />
              </Form.Item>
              <Form.Item name="image" label="Image">
                <Input />
              </Form.Item>
              <Form.Item name="category" label="Category">
                <Select
                  options={[
                    { value: "Drinks", label: "Drinks" },
                    { value: "Rice", label: "Rice" },
                    { value: "Noodles", label: "Noodles" },
                  ]}
                />
              </Form.Item>
              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary btn-md">
                  {editItem !== null ? "Edit Item" : "Add Item"}
                </button>
              </div>
            </Form>
          </div>
        </Modal>
      )}
    </DefaultLayout>
  );
};

export default ItemPage;
