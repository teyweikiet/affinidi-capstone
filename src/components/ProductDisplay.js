import React, { useContext } from 'react'
import './ProductDisplay.css'
import UserContext from '../contexts/UserContext'

const ProductDisplay = ({ addToCart }) => {
  const { profile } = useContext(UserContext)
  const products = [
    { id: 1, name: 'Hoodie', price: 10, imageUrl: 'hoodie.png' },
    { id: 2, name: 'T-Shirt', price: 15, imageUrl: 'tee.png' }
  ]

  return (
    <div className="ProductDisplay">
      {products.map((product) => (
        <div key={product.id} className="ProductItem">
          <img src={product.imageUrl} alt={product.name} />
          <h2>{product.name}</h2>
          <p>{product.price}&nbsp;{profile?.currency ?? 'USD'}</p>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  )
}

export default ProductDisplay
