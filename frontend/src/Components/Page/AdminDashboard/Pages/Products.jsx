import React from 'react'
import Header from '../Common/Layout/Header/Header'
import { Link } from 'react-router-dom'

const Products = () => {
  return (
    <div>
        <Header/>
        <div className="container"></div>
        <main id="main" className="main">
        <div className="pagetitle">
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/admin">Home</Link>
              </li>
              <li className="breadcrumb-item active">Add Products</li>
            </ol>
          </nav>
        </div>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-10 offset-md-1">
                </div>
                </div>
                </div>
        </main>
    </div>
  )
}

export default Products