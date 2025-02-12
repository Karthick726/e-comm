import React, { useEffect } from 'react'
import Header from '../../Common/Layout/Header/Header'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../redux/productSlice'

export const Product = () => {
  const dispatch=useDispatch()
  const { products } = useSelector((state) => state.products);

  
  useEffect(()=>{
    dispatch(fetchProducts())
  },[dispatch]
  )


  console.log("products",products)
  return (
    <div>
      <Header/>
    </div>
  )
}
