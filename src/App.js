import { useEffect, useState } from "react";
import { json, useNavigate, useRoutes } from 'react-router-dom'
import routes from './routes'
import { AuthContext } from "./Context/AuthContext";
import { CartContext } from "./Context/CartContext";
import swal from "sweetalert";

function App() {
  const router = useRoutes(routes)
  const [isLoggedIn, setIsLoggedIn] = useState(null)
  const [token, setToken] = useState(null)
  const [userInfo, setUserInfo] = useState(null)
  const navigate = useNavigate();

  const [cartItem, setCartItem] = useState([])

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
        .then(response => response.json())
        .then(res => {
          if (res.status == true) {
            setIsLoggedIn(true)
            setUserInfo(res)
            setToken(userTokenLS.token)
          } else {
            localStorage.removeItem('user')
            setToken(null)
            setUserInfo({})
            setIsLoggedIn(false)
            navigate('/')
          }

        })
    } else {
      setIsLoggedIn(false)
    }
  }, [token]);



  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem('cart'))
    const cartunits = localCart === null ? [] : localCart;
    setCartItem(localCart)
  }, [])

  function login(token) {
    localStorage.setItem('user', JSON.stringify({ token }))
    setToken(token)
    setIsLoggedIn(true)
  }


  function logout() {
    const userTokenLS = JSON.parse(localStorage.getItem('user'))
    if (userTokenLS) {
      fetch(`${baseUrl}logout`, {
        method: 'POST',
        headers: {
          'Accept': 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
          Authorization: `Bearer ${userTokenLS.token}`
        }
      }).then(response => {
        return response.json();
      }
      )
        .then(res => {
          if (res.status != false) {
            localStorage.removeItem('user')
            setToken(null)
            setUserInfo({})
            setIsLoggedIn(false)
            navigate('/')
            swal({
              title: res.message[0],
              icon: "success",
              buttons: 'باشه'
            })
          } else {
            swal({
              title: res.message[0],
              icon: "success",
              buttons: 'باشه'
            })
          }

        }).catch(err => {
        })
    }


  }



  //cart
  function addToCart(newItem) {
    setCartItem(newItem)
    localStorage.setItem('cart', JSON.stringify(newItem))
  }
  function removeFromCart(newItem) {
    setCartItem(null)
    localStorage.removeItem('cart')
  }

  return (
    <>
      <AuthContext.Provider value={{
        isLoggedIn,
        token,
        userInfo: userInfo,
        login: login,
        logout: logout
      }}>
        <CartContext.Provider value={{
          cartItem: cartItem,
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
