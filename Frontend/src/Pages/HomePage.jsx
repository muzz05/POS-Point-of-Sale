import React, { useEffect, useState } from "react";
import DefaultLayout from "../Components/DefaultLayout";
import axios from "axios";
import { Col, Row } from "antd";
import ItemList from "../Components/ItemList";
import { useDispatch } from "react-redux";

const HomePage = () => {
  const [itemData, setItemData] = useState([]);
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(null);

  // These are the Categories
  const categories = [
    {
      name: "Drinks",
      image:
        "https://hips.hearstapps.com/hmg-prod/images/apple-cider-spritz1-1663882620.jpg?crop=0.668xw:1.00xh;0.167xw,0&resize=640:*",
    },
    {
      name: "Rice",
      image:
        "https://static01.nyt.com/images/2023/02/25/multimedia/Sushi-Rice-lcfv/Sushi-Rice-lcfv-mediumSquareAt3X.jpg",
    },
    {
      name: "Noodles",
      image:
        "https://www.whiskaffair.com/wp-content/uploads/2021/04/Cantonese-Pan-Fried-Noodles-2-3.jpg",
    },
  ];

  // This is to get All items
  const getAllItems = async () => {
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

  useEffect(() => {
    getAllItems();
  }, []);
  return (
    <DefaultLayout>
      <div className="d-flex justify-content-center align-items-center my-3">
        {categories.map((category) => {
          return (
            <div
              className={`d-flex jusitfy-content-center align-items-center flex-column m-3 border p-3 category-box ${
                selectedCategory === category.name && "category-box-active"
              }`}
              style={{ borderRadius: "10px", cursor: "pointer" }}
              onClick={() => {
                setSelectedCategory(category.name);
              }}
              key={`Home-Page-Categories-${category.name}`}
            >
              <img
                src={category.image}
                alt={category.name}
                style={{ width: "100px", borderRadius: "100%" }}
              />
              <h5>{category.name}</h5>
            </div>
          );
        })}
      </div>
      <button
        className="btn btn-primary my-4"
        onClick={() => {
          setSelectedCategory(null);
        }}
      >
        Reset Filter
      </button>
      <Row>
        {itemData
          .filter((i) => {
            if (selectedCategory !== null) {
              return i.category === selectedCategory;
            } else {
              return true;
            }
          })
          .map((item) => {
            return (
              <Col
                xs={24}
                sm={12}
                md={8}
                lg={4}
                key={`home-page-item-list-${item._id}`}
              >
                <ItemList item={item} />
              </Col>
            );
          })}
      </Row>
    </DefaultLayout>
  );
};

export default HomePage;
