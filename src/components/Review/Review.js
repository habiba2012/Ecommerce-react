import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from './ReviewItem/ReviewItem';
import orderPlacedImg from '../../images/giphy.gif';

const Review = (props) => {
    const [cart, setCart] = useState([])
    const [orderPlaced, setOrderPlaced] = useState(false)

    const handlePlaceOrder = () =>{
    setCart([]);
    setOrderPlaced(true)
    processOrder(cart)   
 }
    const removeProduct = (productKey)=>{
        console.log('clicked', productKey)
        const newCart = cart.filter(pd => pd.key!== productKey)
        console.log(newCart)
        setCart(newCart)
        removeFromDatabaseCart(productKey)
    }
    useEffect(() =>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart)

        const cartProduct = productKeys.map(key => {
            const product = fakeData.find(pd =>pd.key === key );
            product.quantity = savedCart[key];
            return product;
        }) 
      
          setCart(cartProduct)
    }, [])

    let thankYou;  
    if(orderPlaced){
        thankYou = <img src="https://i.makeagif.com/media/9-20-2014/AHajCI.gif" alt="" />
    }
    return (
        <div  className="container">
           <div className="product-container">
                {
                    cart.map(pd => <ReviewItem removeProduct={removeProduct} key={pd.key} product={pd}></ReviewItem>)
                }
                {
                    thankYou
                }
              
           </div>
           <div className="cart-container">
           <Cart cart={cart}>
               <button onClick={handlePlaceOrder} className="btn-cart">Place Order</button>
           </Cart>
           </div>
        </div>
    );
};

export default Review;