import React from "react";
import { Card } from "antd";
import { useDispatch } from "react-redux";

const ItemList = ({ item }) => {
  const dispatch = useDispatch();
  const { Meta } = Card;

  // This is to update the Cart with the item
  const handleUpdateCart = () => {
    dispatch({
      type: "Add_To_Cart",
      payload: { ...item, quantity: 1 },
    });
  };
  return (
    <>
      <div>
        <Card
          hoverable
          cover={<img alt="example" src={item.image} />}
          style={{ margin: "10px" }}
        >
          <Meta title={item.name} />
          <div className="mt-4">
            <button
              className="btn btn-secondary w-100"
              onClick={() => {
                handleUpdateCart();
              }}
            >
              Add to Cart
            </button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default ItemList;
