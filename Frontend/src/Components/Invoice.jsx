import React, { forwardRef } from "react";
import CodeWithMuzz from "../Images/Code with Muzz-logos.jpeg";

const Invoice = forwardRef((props, ref) => {
  const { bill } = props;
  return (
    <div
      className="border p-3 rounded"
      style={{
        boxShadow:
          "0 3px 7px 0 rgba(0, 0, 0, 0.2), 0 5px 19px 0 rgba(0, 0, 0, 0.19)",
      }}
      ref={ref}
    >
      <div className="d-flex justify-content-center align-items-center flex-column">
        <img
          src={CodeWithMuzz}
          alt="Logo"
          height={80}
          style={{ borderRadius: "100%", margin: "10px 0px" }}
        />
        <h5>Code With Muzz POS</h5>
        <p>Contact 123456 | Karachi Sindh</p>
      </div>
      <hr />
      <div>
        <p className="my-1" style={{ fontSize: "13px" }}>
          Customer Name: <b>{bill.customerName}</b>
        </p>
        <p className="my-1" style={{ fontSize: "13px" }}>
          Phone Number: <b>{bill.customerPhone}</b>
        </p>
        <p className="my-1" style={{ fontSize: "13px" }}>
          Date: <b>{bill.date.toString().slice(0, 10)}</b>
        </p>
      </div>
      <hr />
      <table className="table" style={{ fontSize: "14px" }}>
        <thead>
          <tr className="table-active">
            <th>Item</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {bill.cartItems.map((item) => {
            return (
              <tr key={`invoice-key-${item._id}`}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>${item.price}</td>
                <td>${Number(item.quantity) * Number(item.price)}</td>
              </tr>
            );
          })}
          <tr className="table-active">
            <td></td>
            <td></td>
            <th>Tax</th>
            <td>${bill.tax}</td>
          </tr>
          <tr className="table-active">
            <td></td>
            <td></td>
            <th>Total Amount</th>
            <td>${bill.totalAmount}</td>
          </tr>
        </tbody>
      </table>
      <p>
        <b>Thank you for your Order!</b> 10% GST applicable on Total Amount.
        Please note that this is non-refundable amount and if you have any query
        please email us on <b>help@mysdomain.com</b>
      </p>
    </div>
  );
});

export default Invoice;
