import React from "react";
import CodeWithMuzz from "../Images/Code with Muzz-logos_white.png";
import { QRCode } from "antd";

const LoyaltyCard = (props) => {
  const { customer } = props;
  return (
    <>
      <div
        className="border p-3 rounded my-2"
        style={{
          boxShadow:
            "0 3px 7px 0 rgba(0, 0, 0, 0.2), 0 5px 19px 0 rgba(0, 0, 0, 0.19)",
          height: "200px",
          width: "400px",
          backgroundColor: "#224487",
          color: "#d8d1d1",
        }}
      >
        <div className="d-flex justify-content-center align-items-center">
          <img
            src={CodeWithMuzz}
            alt="Logo"
            height={70}
            style={{ borderRadius: "100%", margin: "0px 10px" }}
          />
          <h6>
            <b>CWM Loyalty Card</b>
          </h6>
        </div>
        <div className="d-flex justify-content-center align-items-center my-1">
          <div className="mx-2">
            <QRCode size={90} value={customer._id} color="#d8d1d1" />
          </div>
          <div className="mx-2">
            <p style={{ margin: "5px" }}>
              Name: <b>{customer.name}</b>
            </p>
            <p style={{ margin: "5px" }}>
              Phone: <b>{customer.phone}</b>
            </p>
            <p style={{ margin: "5px" }}>
              Expires:{" "}
              <b>
                {Number(customer.date.toString().slice(0, 4)) +
                  3 +
                  customer.date.toString().slice(4, 10)}
              </b>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoyaltyCard;
