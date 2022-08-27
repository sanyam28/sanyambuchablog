import Navbar from '../components/Navbar'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import NextNProgress from "nextjs-progressbar";
import '../styles/globals.css'
import '../styles/login.css'
import '../styles/adminblog.css'
import '../styles/admin.css'
import '../public/prism.js'
import '../public/prism.css'
import { toast } from 'react-toastify';
var jwt = require('jsonwebtoken');

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [user, setUser] = useState({ value: null })
  const [key, setKey] = useState(0)
  const [token, settoken] = useState({ value: null })


  const logout = async () => {
    const logouttoken = localStorage.getItem('token')
    if (logouttoken) {
      const sessiontoken = JSON.parse(logouttoken).token
      const data = { sessiontoken }
      let res = await fetch(`${process.env.NEXT_BASE_PUBLIC_URL}/api/user/deletesession`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      let response = await res.json()
      if(response.success){
        localStorage.removeItem('token')
        setUser({ value: null })
        settoken({ value: null })
        setKey(Math.random())
        router.push("/")
      }
      else{
        router.push("/")
      }
    }
    else {
      return "error"
    }
  }
  // const logout = async () => {
  //   const logouttoken = localStorage.getItem('token')
  //   if (logouttoken) {
  //       localStorage.removeItem('token')
  //       setUser({ value: null })
  //       settoken({ value: null })
  //       setKey(Math.random())
  //       router.push("/")
  //   }
  // }


  useEffect(() => {
    const cdtoken = localStorage.getItem('token')
    if (cdtoken) {
        const ctoken = JSON.parse(cdtoken).token

        if (ctoken) {
          settoken({ value: ctoken })
          setUser({ value: ctoken })
          setKey(Math.random())
        }
    }
    const isAuthenicated = async () => {
      const checktoken = localStorage.getItem('token')
      if (checktoken) {
        const userdata = JSON.parse(checktoken)

        if (userdata) {
          try {
            const verifyjwt = jwt.verify(userdata.token, process.env.SECRET_KEY)
            if (verifyjwt) {
              const jwttoken = userdata.token
              const data = { verifyjwt, jwttoken }
              let res = await fetch(`${process.env.NEXT_BASE_PUBLIC_URL}/api/getuser`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
              })
              let response = await res.json()
              if (response.error) {
                logout()
              }

            }
          } catch (err) {
            logout()
          }
        }
      }
    }

    isAuthenicated()

  }, [router.query])

  return <>
    <NextNProgress
      options={{ showSpinner: false }}
    />
    <Navbar user={user} adminuser={{ user }} key={key} logout={logout} />
    <Component {...pageProps} logout={logout} token={token} />
  </>
}

export default MyApp
