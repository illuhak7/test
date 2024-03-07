import React, { useEffect, useState } from 'react';

import './CartPage.css'; 

function CartPage() {

  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState('Magazin_1');
  const [selectedMenu, setSelectedMenu] = useState('shop');
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    fetch(`${window.location.protocol}//${window.location.hostname}:5555/stores`)
      .then((response) => response.json())
      .then((data) => setStores(data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (selectedStore) {
      fetch(`${window.location.protocol}//${window.location.hostname}:5555/products/${selectedStore}`)
        .then((response) => response.json())
        .then((data) => setProducts(data))
        .catch((error) => console.error(error));
    }
  }, [selectedStore]);

  const handleStoreClick = (storeName) => {
    setSelectedStore(storeName);
  };

  const handleMenuClick = (menuName) => {
    setSelectedMenu(menuName);
  };

  const handleAddToCart = (product) => {
    const existingCartItem = cartItems.find((item) => item.id === product._id);

    if (existingCartItem) {
      const updatedCartItems = cartItems.map((item) =>
        item.id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      );

      setCartItems(updatedCartItems);
    }
    else {
      const updatedCartItems = [...cartItems, { id: product._id, product, quantity: 1 }];
      setCartItems(updatedCartItems);
    }
  };

  const isProductInCart = (productId) => {
    return cartItems.some((item) => item.id === productId);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems);
  };

  const handleRemoveItem = (productId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCartItems);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const sendData = async () => {
    try {
      if (!name || !email || !phone || !address || !cartItems.length) {
        alert('Please fill in all required fields.');
        return;
      }

      const medicines = cartItems.map(item => ({ id: item.id, qty: item.quantity }));

      const orderData = {
        name,
        email,
        phone,
        address,
        medicines: JSON.stringify(medicines), 
      };

      const response = await fetch(`${window.location.protocol}//${window.location.hostname}:5555/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        alert('Order successfully submitted');
      } else {
        console.error('Failed to submit order');
      }
    } catch (error) {
      console.error('Error submitting order:', error.message);
    }
  };


  return (
    <div className="wrapper">
      <header>
        <button onClick={() => handleMenuClick('shop')} className={selectedMenu === 'shop' ? 'active' : ''}>Shop</button>
        <button onClick={() => handleMenuClick('cart')} className={selectedMenu === 'cart' ? 'active' : ''}>{`My Cart (${cartItems.length})`}</button>
      </header>
      <main>
        {selectedMenu !== 'cart' &&
          <>
            <div className="storePanel">
              <ul>
                {stores.map((store) => (
                  <li key={store} onClick={() => handleStoreClick(store)} className={`store-li ${selectedStore === store ? 'active' : ''}`}>
                    {store}
                  </li>
                ))}
              </ul>
            </div>

            <div className="productWrapper">
              <h2>Products in {selectedStore}</h2>
              <div className="productPanel">
                <ul className='product-list'>
                  {products.map((product) => (
                    <li key={product._id} className="product-item">
                      <div>
                        <img src={product.imageURL} alt={product.title} />
                        <h3>{product.title}</h3>
                        <p>{product.price} UAH</p>
                        <button
                          className={`cartBtn ${isProductInCart(product._id) ? 'disabled' : ''}`}
                          onClick={() => handleAddToCart(product)}
                          disabled={isProductInCart(product._id)}
                        >
                          {isProductInCart(product._id) ? 'Added to Cart' : 'Add to Cart'}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

              </div>

            </div>
          </>}

        {selectedMenu !== 'shop' &&
          <>
            <div className="formPanel">
              <form>
                <label>
                  Name: <br />
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label>
                  Email: <br />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                  Phone:
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </label>
                <label>
                  Address:
                  <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                </label>
              </form>
            </div>

            <div className="cartWrapper">
              <div className="cartItemPanel">

                <ul className='cartItemList'>
                  {cartItems.map((cartItem) => (
                    <li key={cartItem.product._id} className="product-item">
                      <div>
                        <img src={cartItem.product.imageURL} alt={cartItem.product.title} />
                        <h3>{cartItem.product.title}</h3>
                        <p>{cartItem.product.price} UAH</p>
                        <div className='cartItem-operations'>
                          <button onClick={() => handleQuantityChange(cartItem.id, (cartItem.quantity - 1) > 1 ? (cartItem.quantity - 1) : 1)}>-</button>
                          <span>Quantity: {cartItem.quantity}</span>
                          <button onClick={() => handleQuantityChange(cartItem.id, cartItem.quantity + 1)}>+</button>
                          <button onClick={() => handleRemoveItem(cartItem.id)}>Remove</button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

              </div>
              <div className="bottomBlock">
                <p>Total price: {calculateTotal()} UAH</p>
                <button onClick={() => sendData()}>Submit</button>
              </div>

            </div>
          </>
        }

      </main>
    </div >
  );
}

export default CartPage;