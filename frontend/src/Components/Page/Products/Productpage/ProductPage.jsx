import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../redux/productSlice";
import { FaShoppingCart, FaBolt } from "react-icons/fa";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Pagination from "@mui/material/Pagination";
import { FaGreaterThan } from "react-icons/fa6";
import Stack from "@mui/material/Stack";
import {
  deleteWishList,
  fetchWishList,
  updateWishList,
} from "../../../redux/wishList";
import { FaHeart } from "react-icons/fa";
import { UserContext } from "../../Home/UserLogin/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { addToCartPost, fetchaddToCart } from "../../../redux/addtoCardSlice";
import { fetchUser } from "../../../redux/userSlice";

const ProductPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { wishList } = useSelector((state) => state.wishList);
  const { products } = useSelector((state) => state.products);
  const { addToCart } = useSelector((state) => state.addToCart);
  const { user } = useSelector((state) => state.user);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { userDetails } = useContext(UserContext);
  const [sortBy, setSortBy] = useState("popularity");
  const productsPerPage = 12;

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchWishList());
    dispatch(fetchaddToCart());
    dispatch(fetchUser);
  }, [dispatch]);

  const uniqueCategories = [...new Set(products.map((p) => p.category))];

  const filteredBrands =
    selectedCategories.length !== 0
      ? [
          ...new Set(
            products
              .filter((p) => selectedCategories.includes(p.category))
              .map((p) => p.brandName)
          ),
        ]
      : [];

  const handleCategoryClick = (value) => {
    if (selectedCategories.includes(value)) {
      setSelectedCategories(
        selectedCategories.filter((category) => category !== value)
      );
    } else {
      setSelectedCategories([...selectedCategories, value]);
    }
  };

  const handleBrandClick = (value) => {
    if (selectedBrands.includes(value)) {
      setSelectedBrands(selectedBrands.filter((brand) => brand !== value));
    } else {
      setSelectedBrands([...selectedBrands, value]);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        const updatedCategories = prev.filter((c) => c !== category);

        // Remove brands that belong to the removed category
        const updatedBrands = selectedBrands.filter((brand) =>
          products.some(
            (p) =>
              p.brandName === brand && updatedCategories.includes(p.category)
          )
        );

        setSelectedBrands(updatedBrands);
        return updatedCategories;
      } else {
        return [...prev, category];
      }
    });

    setCurrentPage(1);
  };

  const filteredProducts = products?.filter(
    (product) =>
      (!selectedCategories.length ||
        selectedCategories.includes(product.category)) &&
      (!selectedBrands.length || selectedBrands.includes(product.brandName)) &&
      product.offerPrice >= priceRange[0] &&
      product.offerPrice <= priceRange[1]
  );

  const pageCount = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
    setCurrentPage(1);
  };

  //filter

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "lowToHigh") {
      return a.offerPrice - b.offerPrice;
    }
    if (sortBy === "highToLow") {
      return b.offerPrice - a.offerPrice;
    }
    return 0;
  });

  const displayedProducts = sortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handleaddWishList = async (id) => {
    if (userDetails === null) {
      navigate("/account");
    } else if (
      wishList?.wishlist.wishlist.some((item) => item.ProductId === id)
    ) {
      try {
        const response = await dispatch(deleteWishList(id));
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const response = await dispatch(updateWishList(id));
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
  };

  //add to cart

  const handleAddToCard = async (id) => {
    if (userDetails === null) {
      navigate("/account");
    } else {
      try {
        const response = await dispatch(addToCartPost(id));
        console.log(response);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleNavigate = (id) => {
    navigate(`/product/${id}`);
  };
  return (
    <div className="product-container">
      <div className="filter-products">
        <div className="filter">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <p
              style={{
                textAlign: "start",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              FILTER
            </p>
            {selectedCategories.length > 0 && (
              <p
                style={{
                  color: "blue",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setSelectedCategories([]);
                  setCurrentPage(1);
                  setSelectedBrands([]);
                }}
              >
                CLEAR
              </p>
            )}
          </div>

          <div className="selected-filters">
            {selectedCategories.length > 0 && (
              <p
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                {selectedCategories.map((value, index) => {
                  return (
                    <span
                      key={index}
                      style={{
                        backgroundColor: "#f0f0f0",
                        padding: "10px",
                        marginRight: "10px",
                      }}
                    >
                      <span
                        onClick={() => handleCategoryClick(value)}
                        style={{
                          color: "black",
                          fontSize: "14px",
                          fontWeight: "bold",
                          cursor: "pointer",
                        }}
                      >
                        x
                      </span>{" "}
                      {value}
                    </span>
                  );
                })}
              </p>
            )}

            {selectedBrands.length > 0 && (
              <p>
                {selectedBrands.map((value) => {
                  return (
                    <span
                      style={{
                        backgroundColor: "#f0f0f0",
                        padding: "10px",
                        marginRight: "10px",
                      }}
                    >
                      <span
                        onClick={() => handleBrandClick(value)}
                        style={{
                          color: "black",
                          fontSize: "14px",
                          fontWeight: "bold",
                          cursor: "pointer",
                        }}
                      >
                        x
                      </span>{" "}
                      {value}
                    </span>
                  );
                })}
              </p>
            )}
          </div>
        </div>
        <div className="filter">
          <p
            style={{
              textAlign: "start",
            }}
          >
            CATEGORIES
          </p>
          <FormGroup>
            {uniqueCategories.map((category) => (
              <FormControlLabel
                key={category}
                control={
                  <Checkbox
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                }
                label={category}
              />
            ))}
          </FormGroup>
        </div>
        <div className="filter">
          <p
            style={{
              textAlign: "start",
            }}
          >
            PRICE
          </p>
          <Slider
            range
            min={0}
            max={100000}
            step={1000}
            value={priceRange}
            onChange={(value) => setPriceRange(value)}
          />
          <div
            style={{
              marginTop: "10px",
            }}
          >
            Min: ₹{priceRange[0]} - Max :₹{priceRange[1]}
          </div>
        </div>
        <div className="filter">
          <p
            style={{
              textAlign: "start",
            }}
          >
            BRAND
          </p>
          <FormGroup>
            {filteredBrands.map((brand) => (
              <FormControlLabel
                key={brand}
                control={
                  <Checkbox
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                  />
                }
                label={brand}
              />
            ))}
          </FormGroup>
        </div>
      </div>
      <div className="sami">
        <div
          className="filter"
          style={{
            padding: "20px 20px 0px 20px",
          }}
        >
          <p
            style={{
              textAlign: "start",
              fontWeight: "normal",
              fontSize: "12px",
            }}
          >
            Home{" "}
            <FaGreaterThan
              style={{
                textAlign: "start",
                fontWeight: "normal",
                fontSize: "9px",
              }}
            />{" "}
            Products
          </p>
          <div className="about-products">
            <p>
              Explore our wide range of high-quality electronics and gadgets at
              unbeatable prices. Whether you're looking for a powerful laptop, a
              feature-packed smartphone, a high-resolution camera, or premium
              earphones, we’ve got you covered.
            </p>
            <div className="about-products-list">
              <ul>
                <li>
                  💻 Laptops – Work and play seamlessly with top brands like HP,
                  Dell, and Asus.
                </li>
                <li>
                  📱 Smartphones – Stay connected with the latest Apple,
                  Samsung, and OnePlus models.
                </li>
                <li>
                  📷 Cameras – Capture life’s best moments with high-quality
                  DSLR and mirrorless cameras.
                </li>
                <li>
                  🎧 Earphones – Experience crystal-clear sound with wireless
                  and noise-canceling options.
                </li>
              </ul>
            </div>
            <div className="filter-products-sort">
              <p>Sort By</p>
              <p
                className={sortBy === "popularity" ? "active" : ""}
                onClick={() => setSortBy("popularity")}
              >
                Popularity
              </p>
              <p
                className={sortBy === "lowToHigh" ? "active" : ""}
                onClick={() => setSortBy("lowToHigh")}
              >
                Price -- Low to High
              </p>
              <p
                className={sortBy === "highToLow" ? "active" : ""}
                onClick={() => setSortBy("highToLow")}
              >
                Price -- High to Low
              </p>
            </div>
          </div>
        </div>

        <div className="product-grid">
          {displayedProducts.map((value, index) => (
            <div className="card" key={index}>
              <div className="image-container">
                <img src={value.image[0]} alt="Product Image" />
                <div className="price">
                  {Math.round(value.percentage)} % Offer
                </div>
              </div>
              <label className={`favorite `}>
                <FaHeart
                  className={`fav-icons ${
                    wishList?.wishlist.wishlist.some(
                      (item) => item.ProductId === value._id
                    )
                      ? "active"
                      : ""
                  }`}
                  onClick={() => handleaddWishList(value._id)}
                />
                {/* <input  type="checkbox"  onClick={()=>handleaddWishList(value._id)}/>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000">
                <path d="M12 20a1 1 0 0 1-.437-.1C11.214 19.73 3 15.671 3 9a5 5 0 0 1 8.535-3.536l.465.465.465-.465A5 5 0 0 1 21 9c0 6.646-8.212 10.728-8.562 10.9A1 1 0 0 1 12 20z" />
              </svg> */}
              </label>
              <div className="content">
                <div className="brand">{value.brandName}</div>
                <div className="product-name mt-2">
                  {value.productName.slice(0, 90)}...
                </div>
                <div className="color-size-container">
                  <div class="offer-price ">
                    ₹ {value.offerPrice}
                    <span className="original-price">
                      {" "}
                      ₹ {value.originalPrice}
                    </span>
                  </div>
                </div>
                <div class="rating">Free delivery</div>
              </div>
              <div className="button-container">
                <button
                  className="buy-button button"
                  onClick={() => handleNavigate(value._id)}
                >
                  View Product
                </button>
                <button
                  disabled={addToCart?.addToCart?.some(
                    (item) => item.ProductId === value._id
                  )}
                  className={`cart-button button ${
                    addToCart?.addToCart?.some(
                      (item) => item.ProductId === value._id
                    )
                      ? "button-active"
                      : ""
                  }`}
                  onClick={() => handleAddToCard(value._id)}
                >
                  <svg
                    viewBox="0 0 27.97 25.074"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0,1.175A1.173,1.173,0,0,1,1.175,0H3.4A2.743,2.743,0,0,1,5.882,1.567H26.01A1.958,1.958,0,0,1,27.9,4.035l-2.008,7.459a3.532,3.532,0,0,1-3.4,2.61H8.36l.264,1.4a1.18,1.18,0,0,0,1.156.955H23.9a1.175,1.175,0,0,1,0,2.351H9.78a3.522,3.522,0,0,1-3.462-2.865L3.791,2.669A.39.39,0,0,0,3.4,2.351H1.175A1.173,1.173,0,0,1,0,1.175ZM6.269,22.724a2.351,2.351,0,1,1,2.351,2.351A2.351,2.351,0,0,1,6.269,22.724Zm16.455-2.351a2.351,2.351,0,1,1-2.351,2.351A2.351,2.351,0,0,1,22.724,20.373Z"
                      id="cart-shopping-solid"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        <Stack
          spacing={2}
          sx={{ display: "flex", alignItems: "center", margin: "20px 0" }}
        >
          <Pagination
            count={pageCount}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
          />
        </Stack>
      </div>
    </div>
  );
};

export default ProductPage;
