/* eslint-disable no-undef */

const APP_URL = process.env.GATSBY_APP_URL || "http://localhost:8000"
export const [PROTOCOL, DOMAIN] = APP_URL.split("://")
export const API_BASE_URL = `${PROTOCOL}://${DOMAIN}/v1`
export const SANCTUM = `${APP_URL}/sanctum/csrf-cookie`

export const PROFILE_FIELDS = "profileFields"
export const CURRENT_USER = "userAuth"
export const CURRENT_USER_PROFILE = "userProfile"
export const CURRENT_USER_PHOTO = "userPhoto"
export const ADMIN_GET_ALL_USERS = "users"
export const ADMIN_GET_SINGLE_USER = "user"
export const ADMIN_GET_SINGLE_USER_PHOTO = "user/photo"
export const ADMIN_DELETE_USER = "user"

export const LOGIN = "login"
export const LOGOUT = "logout"
export const REGISTER = "register"
export const CONTACT = "contact"
// export const DASHBOARD = `${PROTOCOL}://dashboard.${DOMAIN}`
export const DASHBOARD = `${PROTOCOL}://${DOMAIN}/dashboard`
