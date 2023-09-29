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
        "https://hips.hearstapps.com/hmg-prod/images/delish-210525-peachmargarita-10-landscape-jg-1623188075.jpg",
    },
    {
      name: "Fries",
      image:
        "https://www.corriecooks.com/wp-content/uploads/2021/05/french-fries-instant-pot.jpg",
    },
    {
      name: "Burgers",
      image:
        "https://www.tastingtable.com/img/gallery/what-makes-restaurant-burgers-taste-different-from-homemade-burgers-upgrade/l-intro-1662064407.jpg",
    },
    {
      name: "Broast",
      image:
        "https://savyour.com.pk/products/wp-content/uploads/2023/01/karachi-broast-banner.jpg",
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
      <div
        className="d-flex align-items-center my-3"
        style={{ overflowX: "auto" }}
      >
        {categories.map((category) => {
          return (
            <div
              className={`d-flex jusitfy-content-center align-items-center flex-column m-3 border p-3 category-box ${
                selectedCategory === category.name && "category-box-active"
              }`}
              style={{
                borderRadius: "10px",
                cursor: "pointer",
              }}
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
                lg={6}
                xl={4}
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
