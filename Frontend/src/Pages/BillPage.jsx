import React, { useEffect, useState, useRef } from "react";
import DefaultLayout from "../Components/DefaultLayout";
import { Modal, Table } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import Invoice from "../Components/Invoice";
import { useReactToPrint } from "react-to-print";

const BillPage = () => {
  // States
  const componentRef = useRef();
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [invoicePopup, setInvoicePopup] = useState(false);

  // This is to get all the bills
  const getAllBills = async () => {
    const { data } = await axios.get("http://localhost:4000/api/bill/get-all");
    if (data.success) {
      setBills(data.bills);
    }
  };

  // This is to delete the Bill
  const handleDeleteBill = async (record) => {
    const { data } = await axios.delete(
      `http://localhost:4000/api/bill/delete-bill/${record._id}`
    );
    if (data.success) {
      getAllBills();
    }
  };

  // This is The Column to show the Table data
  const columns = [
    { title: "ID", dataIndex: "_id" },
    { title: "Customer Name", dataIndex: "customerName" },
    { title: "Customer Phone", dataIndex: "customerPhone" },
    { title: "Total Amount", dataIndex: "totalAmount" },
    { title: "Tax", dataIndex: "tax" },
    { title: "Payment Mode", dataIndex: "payment" },
    {
      title: "",
      dataIndex: "_id",
      render: (id, record) => (
        <>
          <EyeOutlined
            onClick={() => {
              setInvoicePopup(true);
              setSelectedBill(record);
            }}
            className="m-2"
          />
          <DeleteOutlined
            onClick={() => {
              handleDeleteBill(record);
            }}
            className="m-2"
          />
        </>
      ),
    },
  ];

  useEffect(() => {
    getAllBills();
  }, []);

  // This is to Print the Invoice
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <DefaultLayout>
      <h1 className="text-center my-4">Invoice List</h1>
      <div className="container my-4">
        <Table columns={columns} dataSource={bills} pagination={false} />
      </div>
      <Modal
        style={{ height: "70vh" }}
        open={invoicePopup}
        title={<h1 className="text-center my-4">Invoice</h1>}
        footer={false}
        onCancel={() => {
          setInvoicePopup(false);
        }}
      >
        <div className="container my-3" ref={componentRef}>
          <Invoice bill={selectedBill} />
        </div>
        <div className="d-flex align-items-center justify-content-end">
          <button className="btn btn-primary" onClick={handlePrint}>
            Print
          </button>
        </div>
      </Modal>
    </DefaultLayout>
  );
};

export default BillPage;
