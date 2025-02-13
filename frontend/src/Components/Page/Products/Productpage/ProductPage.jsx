import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../../redux/productSlice'
import { FaShoppingCart, FaBolt } from "react-icons/fa"; 
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Slider from "rc-slider"; // Using rc-slider for better UI
import "rc-slider/assets/index.css"; 
import Pagination from "@mui/material/Pagination"; // Import MUI Pagination
import Stack from "@mui/material/Stack";

const ProductPage = () => {
    const dispatch=useDispatch()
  const { products } = useSelector((state) => state.products);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6



  useEffect(()=>{
    dispatch(fetchProducts())
  },[dispatch]
  )


  const uniqueCategories = [...new Set(products.map((p) => p.category))];

  const filteredBrands = selectedCategories.length !==0
    ? [...new Set(products.filter((p) => selectedCategories.includes(p.category)).map((p) => p.brandName))]
    :[];

  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );

    setCurrentPage(1);
    
   
  };


  const filteredProducts = products
  ?.filter(
    (product) =>
      (!selectedCategories.length ||
        selectedCategories.includes(product.category)) &&
      (!selectedBrands.length || selectedBrands.includes(product.brandName)) &&
      product.offerPrice >= priceRange[0] &&
      product.offerPrice <= priceRange[1]
  );



  const pageCount = Math.ceil(filteredProducts.length / productsPerPage);
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );


  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
    setCurrentPage(1);
  };

  return (
    <div className="product-container">
     <div className='filter-products'>
        <div className='filter'>
            <p  style={{
                textAlign:"start",
                
            }}>FILTER</p>
             <div className="selected-filters">
          {selectedCategories.length > 0 && (
            <p>Selected Categories: {selectedCategories.join(", ")}</p>
          )}
          {selectedBrands.length > 0 && <p>Selected Brands: {selectedBrands.join(", ")}</p>}
        </div>
        </div>
        <div className='filter'>
            <p style={{
                textAlign:"start"
            }}>CATEGORIES</p>
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
        <div className='filter'>
<p  style={{
                textAlign:"start"
            }}>PRICE</p>
<Slider
            range
            min={0}
            max={100000}
            step={1000}
            value={priceRange}
            onChange={(value) => setPriceRange(value)}
           
          />
          <div style={{
            marginTop:"10px"
          }}>
           Min: ₹{priceRange[0]} -  Max :₹{priceRange[1]}
          </div>
        </div>
        <div className='filter'>
            <p  style={{
                textAlign:"start"
            }}>BRAND</p>
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
     <div className='sami'>

     <div className="product-grid">
      {displayedProducts.map((value, index) => (
          <div key={index} className="product-card">
            <div className="product-image">
              <img src={value.image[0]} alt="Product" />
             
            </div>
            <div className="product-details">
              <p style={{
                textAlign:"start"
             }} className="product-name">{value.productName}...</p>
             <p style={{
                textAlign:"start"
             }}>
             <span className="offer-price">₹{value.offerPrice}</span>
              <span className="original-price">₹{value.originalPrice}</span>
              <span className="discount">{Math.round(value.percentage)}% Off</span></p> 
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
      <Stack spacing={2} sx={{ display: "flex", alignItems: "center", margin: "20px 0" }}>
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
  )
}

export default ProductPage