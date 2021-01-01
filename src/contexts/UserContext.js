import React, { createContext, useReducer, useEffect } from "react"
import PropTypes from "prop-types"
import Api from "../lib/services/api"
import { ADMIN_GET_SINGLE_USER } from "../lib/config/URLs"

const initialState = {
  user: null,
  errors: null,
  isLoggedIn: null, // used in nav, show a flash message when user logs out
}

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload }
    case "SET_ERRORS":
      return { ...state, errors: action.payload }
    case "SET_LOGIN_STATUS":
      return { ...state, isLoggedIn: action.payload }
    default:
      return state
  }
}

export const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const api = React.useMemo(
    () => new Api({ url: ADMIN_GET_SINGLE_USER, method: "get" }),
    []
  )
  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(async () => {
      try {
        const { data } = await api.fetch()
        if (data.email !== undefined) {
          dispatch({
            type: "SET_USER",
            payload: {
              email: data.email,
              hasProfile: data.hasProfile,
            },
          })
          dispatch({
            type: "SET_LOGIN_STATUS",
            payload: true,
          })
        }
      } catch (e) {
        console.log(e.message)
        // eslint-disable-next-line no-undef
        // e.message !== "Unauthenticated." && console.log(e)
      }
    })()
  }, [])
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  )
}

UserProvider.propTypes = {
  children: PropTypes.node,
}
