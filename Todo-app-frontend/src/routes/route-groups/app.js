import React from "react"
import { Login } from "../../pages/login"
import { Home } from "../../pages/home"
import { Register } from "../../pages/register"
import { Header } from "../../layout"
export default [
  {
    path: "/",
    exact: true,
    isPrivate: false,
    main: (props) => <Login {...props} />,
    footer: () => null,
    header: () => null
  },
  {
    path: "/home",
    exact: false,
    isPrivate: true,
    main: (props) => <Home {...props} />,
    footer: () => null,
    header: (props) => <Header {...props} />
  },
  {
    path: "/register",
    exact: false,
    isPrivate: false,
    main: (props) => <Register {...props} />,
    footer: () => null,
    header: () => null
  }
]
