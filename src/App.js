import { useEffect, useState } from "react";
import { json, useNavigate, useRoutes } from 'react-router-dom'
import routes from './routes'
import { AuthContext } from "./Context/AuthContext";
import { CartContext } from "./Context/CartContext";

function App() {
  const router = useRoutes(routes)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState(null)
  const [userInfo, setUserInfo] = useState(null)


  const [cartItem, setCartItem] = useState(null)
  const [cartType, setCartType] = useState(null)

  const baseUrl = process.env.REACT_APP_BASE_URL;



  useEffect(() => {
    const userTokenLS = JSON.parse(localStorage.getItem('user'))
    if (userTokenLS) {
      fetch(`${baseUrl}me`, {
        headers: {
          Accept: 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
          Authorization: `Bearer ${userTokenLS.token}`
        }
      })
        .then(response => {
          if (!response.ok) {
            return response.json().then(error => {
              throw new Error('توکن معتبر نیست');
            })
          } else return response.json();
        }
        )
        .then(res => {
          setIsLoggedIn(true)
          setUserInfo(res)
          setToken(userTokenLS.token)
        }).catch(err => {
        })
    }
  }, [token]);


  function login(token) {
    localStorage.setItem('user', JSON.stringify({ token }))
    setToken(token)
  }


  // function logout() {
  //   const userTokenLS = JSON.parse(localStorage.getItem('user'))
  //   if (userTokenLS) {
  //     fetch(`${baseUrl}logout`, {
  //       method: 'POST',
  //       headers: {
  //         'Accept': 'application/vnd.api+json',
  //         'Content-Type': 'application/vnd.api+json',
  //         Authorization: `Bearer ${userTokenLS.token}`
  //       }
  //     }).then(response => {
  //       return response.json();
  //     }
  //     )
  //       .then(res => {
  //         localStorage.removeItem('user')
  //         setToken(null)
  //         setUserInfo({})
  //         setIsLoggedIn(false)
  //         navigate('/')
  //       }).catch(err => {
  //       })
  //   }


  // }



  //cart
  function addToCart(newItem, itemtype) {
    if (cartItem !== newItem) {
      setCartItem(newItem)
      setCartType(itemtype)
      localStorage.setItem('cart', JSON.stringify([newItem, itemtype]))
    }
  }
  function removeFromCart(newItem) {
    setCartItem(null)
    localStorage.removeItem('cart')
  }

  // function getCartItems() {
  //   const cartItems = courseIds.map((id) => {
  //     return courses.filter(course => course.id === id)[0]
  //   })
  //   return cartItems;
  // }
  // function getTotalPrice() {
  //   return getCartItems().reduce((acc, item) => acc + item.price, 0)
  // }


  return (
    <>
      <AuthContext.Provider value={{
        isLoggedIn,
        token,
        userInfo: userInfo,
        login: login,
        // logout: logout
      }}>
        <CartContext.Provider value={{
          cartItem: cartItem,
          cartType: cartType,
          addToCart: addToCart,
          removeFromCart: removeFromCart,
        }}>
          {router}
        </CartContext.Provider>
      </AuthContext.Provider>

    </>
  );
}

export default App;
