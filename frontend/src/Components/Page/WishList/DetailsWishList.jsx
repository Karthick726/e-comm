import React, { use, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserWishList } from "../../redux/userWishListSlice";
import { fetchUser } from "../../redux/userSlice";
import { UserContext } from "../Home/UserLogin/UserContext";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import wish from '../../../Assets/Images/wish.png'
import { fetchProducts } from "../../redux/productSlice";
import { addToCartPost } from "../../redux/addtoCardSlice";
import { FaShoppingCart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { deleteWishList } from "../../redux/wishList";

const DetailsWishList = () => {
    const dispatch = useDispatch();
    const navigate=useNavigate()
    const { userWishList } = useSelector((state) => state.userWishList);
    const { wishList } = useSelector((state) => state.wishList);
    const { products } = useSelector((state) => state.products);
    const { addToCart } = useSelector((state) => state.addToCart);
    const { userDetails } = useContext(UserContext);
    const { user } = useSelector((state) => state.user);
    

    useEffect(()=>{
        const token=Cookies.get("token")
          

            if(token===undefined){
                navigate("/account")
            }else{
                dispatch(fetchUserWishList())
                dispatch(fetchUser())
            }
       
      
        

    },[dispatch])

      // Fetch products only if they are empty
      useEffect(() => {
        if (products.length === 0) {
          dispatch(fetchProducts());
        }
      }, [dispatch, products.length]);


  // add to card

  const handleAddToCard = async (id) => {
    console.log(id);
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


  console.log("wsihlist", wishList?.wishlist.wishlist.map((item) => item.ProductId))
  //wishlist remove

    const handleaddWishList = async (id) => {
        console.log(id);
      if (userDetails === null) {
        navigate("/account");
      } else if (
        wishList?.wishlist.wishlist.some((item) => item.ProductId === id)
      ) {
        try {
          const response = await dispatch(deleteWishList(id));
          window.location.reload()
        } catch (err) {
          console.log(err);
        }
      }
    }

  return (
    <div className="container con  mt-2">
            <div className="row" style={{
              width:"100%"
            }}>
                {userWishList?.length > 0 ? (
                    userWishList.map((item, index) => (
                        <div key={index} className="col-lg-12 mb-4 ">
                            <div className="wishlist shadow-sm">
                                <img
                                onClick={() => handleNavigate(item.product_Info._id)}
                       
                                    src={item.product_Info.image[0]}
                                    alt={item.product_Info.productName}
                                    className="card-img-top"
                                    style={{ cursor:"pointer" }}
                                />
                                <div className="card-body" onClick={() => handleNavigate(item.product_Info._id)}   style={{ cursor:"pointer", width: "50%"  }}>
                                    <h5 className="card-title">{item.product_Info.productName}</h5>
                                    <p className="text-muted">Brand: {item.product_Info.brandName}</p>
                                    <p className="text-danger fw-bold">₹{item.product_Info.offerPrice}</p>
                                   
                                </div>
   
                                  <div className="buttons wish">
           
                                             <button
                                               disabled={addToCart?.addToCart?.some(
                                                 (value) => value.ProductId === item.product_Info?._id
                                               )}
                                               className={`add-to-cart ${
                                                 addToCart?.addToCart?.some(
                                                   (value) => value.ProductId === item.product_Info?._id
                                                 )
                                                   ? "button-active"
                                                   : ""
                                               }`}
                                               onClick={() => handleAddToCard(item.product_Info._id)}
                                             >
                                               <FaShoppingCart /> Add to Cart
                                             </button>
                                             <button className="buy-now"  onClick={() => handleaddWishList(item.product_Info._id)}>
                                               <MdDelete  style={{
                                                fontSize:"30px"
                                               }}/> Remove From WishList
                                             </button>
                                           </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center wishlist" style={{
                        flexDirection:"column"
                    }}>
                        <img src={wish} />
                        <p className="text-muted">Your wishlist is empty.</p>
                        <button className="btn" onClick={() => navigate("/products")} style={{
                            backgroundColor:"#FFC107",
                            color:"#fff",
                            padding:"10px 20px"
                        }}>
                            Start Shopping
                        </button>
                    </div>
                )}
            </div>
        </div>

  )
}

export default DetailsWishList