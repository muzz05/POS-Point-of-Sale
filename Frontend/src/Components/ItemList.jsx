import React from "react";
import { Card } from "antd";
import { useDispatch, useSelector } from "react-redux";

const ItemList = ({ item }) => {
  const dispatch = useDispatch();
  const { Meta } = Card;
  const { cartItems } = useSelector((state) => state.rootReducer);

  // This is to update the Cart with the item
  const handleUpdateCart = () => {
    // Local Variables
    let doesContain = false;
    let oldQuantity = 0;

    // This is to check if The cart already contains the item
    cartItems.forEach((i) => {
      if (i._id === item._id) {
        doesContain = true;
      }
    });

    // This is to ensure that if the cart has the item already then its quantity is raised if not the item will be added normally
    if (doesContain) {
      cartItems.forEach((e) => {
        if (e._id === item._id) {
          oldQuantity = e.quantity;
        }
      });
      dispatch({
        type: "Update_Cart",
        payload: { ...item, quantity: oldQuantity + 1 },
      });
    } else {
      dispatch({
        type: "Add_To_Cart",
        payload: { ...item, quantity: 1 },
      });
    }
  };
  return (
    <>
      <div>
        <Card
          hoverable
          cover={
            <img
              alt="example"
              src={item.image}
              className="items-image-responsive"
            />
          }
          style={{ margin: "10px" }}
        >
          <Meta title={item.name} />
          <div className="mt-4">
            <button
              className="btn btn-secondary w-100 btn-sm"
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
