import React, { useEffect, useState ,useContext} from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../Common/Layout/Header/Header";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProducts } from "../../../redux/productSlice";
import { FaShoppingCart } from "react-icons/fa";
import { BsLightningFill } from "react-icons/bs";
import { UserContext } from "../../Home/UserLogin/UserContext";
import { addToCartPost } from "../../../redux/addtoCardSlice";

const SingleProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [details, setDetails] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const { id } = useParams();
  const { userDetails } = useContext(UserContext);
  const { wishList } = useSelector((state) => state.wishList);
  const { products } = useSelector((state) => state.products);
  const { addToCart } = useSelector((state) => state.addToCart);

  // Fetch products only if they are empty
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  // Check if product exists and set details
  useEffect(() => {
    if (products.length > 0) {
      const product = products.find((item) => item._id === id);

      if (!product) {
        navigate("/");
      } else {
        setDetails(product);
        setSelectedImage(product.image[0]);
      }
    }
  }, [id, products, navigate]);


  // add to card

   const handleAddToCard = async (id) => {
    console.log(id)
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

  return (
    <div>
      <Header />
      {details ? (
        <div className="container con">
          <div className="row rows">
            <div className="col-12 col-lg-4 image-single">
              <div className="col-12 col-lg-2 thumbnails">
                {details.image.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Thumbnail ${index}`}
                    className={`thumbnail-img ${
                      selectedImage === img ? "active" : ""
                    }`}
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </div>

              <div className="col-12 col-lg-6 image-singles">
                <img
                  src={selectedImage}
                  alt="Main Product"
                  className="main-image"
                />
                <div className="buttons">
                  <button
                 disabled={addToCart?.addToCart?.some(
                    (item) => item.ProductId === details._id
                  )}

                    className={`add-to-cart ${
                      addToCart?.addToCart?.some(
                        (item) => item.ProductId === details._id
                      )
                        ? "button-active"
                        : ""
                    }`}

                    onClick={() => handleAddToCard(details._id)}
                  >
                    <FaShoppingCart /> Add to Cart
                  </button>
                  <button className="buy-now">
                    <BsLightningFill /> Buy Now
                  </button>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-7 content-single">
              <p>{details.productName}</p>
              <p>{details.productName}</p> <p>{details.productName}</p>{" "}
              <p>{details.productName}</p> <p>{details.productName}</p>{" "}
              <p>{details.productName}</p> <p>{details.productName}</p>{" "}
              <p>{details.productName}</p> <p>{details.productName}</p>{" "}
              <p>{details.productName}</p> <p>{details.productName}</p>{" "}
              <p>{details.productName}</p> <p>{details.productName}</p>{" "}
              <p>{details.productName}</p> <p>{details.productName}</p>{" "}
              <p>{details.productName}</p> <p>{details.productName}</p>{" "}
              <p>{details.productName}</p> <p>{details.productName}</p>{" "}
              <p>{details.productName}</p> <p>{details.productName}</p>{" "}
              <p>{details.productName}</p> <p>{details.productName}</p>{" "}
              <p>{details.productName}</p> <p>{details.productName}</p>{" "}
              <p>{details.productName}</p> <p>{details.productName}</p>{" "}
              <p>{details.productName}</p> <p>{details.productName}</p>{" "}
              <p>{details.productName}</p> <p>{details.productName}</p>{" "}
              <p>{details.productName}</p> <p>{details.productName}</p>{" "}
              <p>{details.productName}</p> <p>{details.productName}</p>{" "}
              <p>{details.productName}</p> <p>{details.productName}</p>{" "}
              <p>{details.productName}</p> <p>{details.productName}</p>{" "}
              <p>{details.productName}</p> <p>{details.productName}</p>{" "}
              <p>{details.productName}</p> <p>{details.productName}</p>{" "}
              <p>{details.productName}</p> <p>{details.productName}</p>{" "}
              <p>{details.productName}</p> <p>{details.productName}</p>{" "}
              <p>{details.productName}</p> <p>{details.productName}</p>{" "}
              <p>{details.productName}</p> <p>{details.productName}</p>{" "}
              <p>{details.productName}</p> <p>{details.productName}</p>{" "}
              <p>{details.productName}</p> <p>{details.productName}</p>{" "}
              <p>{details.productName}</p> <p>{details.productName}</p>{" "}
              <p>{details.productName}</p> <p>{details.productName}</p>{" "}
              <p>{details.productName}</p> <p>{details.productName}</p>{" "}
              <p>{details.productName}</p> <p>{details.productName}</p>{" "}
              <p>{details.productName}</p> <p>{details.productName}</p>{" "}
              <p>{details.productName}</p> <p>{details.productName}</p>{" "}
              <p>{details.productName}</p> <p>{details.productName}</p>{" "}
              <p>{details.productName}</p> <p>{details.productName}</p>{" "}
              <p>{details.productName}</p> <p>{details.productName}</p>{" "}
              <p>{details.productName}</p> <p>{details.productName}</p>{" "}
              <p>{details.productName}</p> <p>{details.productName}</p>{" "}
              <p>{details.productName}</p> <p>{details.productName}</p>{" "}
              <p>{details.productName}</p> <p>{details.productName}</p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
};

export default SingleProducts;
