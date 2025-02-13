import React, { useEffect, useState } from "react";
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

const ProductPage = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("popularity"); 
  const productsPerPage = 6;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  console.log(selectedBrands, selectedCategories);

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
)

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
        <div className="filter" style={{
          padding:"20px 20px 0px 20px"
        }}>
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
            <div key={index} className="product-card">
              <div className="product-image">
                <img src={value.image[0]} alt="Product" />
              </div>
              <div className="product-details">
                <p
                  style={{
                    textAlign: "start",
                  }}
                  className="product-name"
                >
                  {value.productName}...
                </p>
                <p
                  style={{
                    textAlign: "start",
                  }}
                >
                  <span className="offer-price">₹{value.offerPrice}</span>
                  <span className="original-price">₹{value.originalPrice}</span>
                  <span className="discount">
                    {Math.round(value.percentage)}% Off
                  </span>
                </p>
              </div>
              <div className="product-overlay">
                <button className="btn cart-btn">
                  <FaShoppingCart /> Add to Cart
                </button>
                <button className="btn buy-btn">
                  <FaBolt /> Buy Now
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
