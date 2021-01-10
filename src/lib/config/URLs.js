/* eslint-disable no-undef */
const APP_URL = process.env.GATSBY_API_URL || "https://api.patca.ph"
export const HOME_URL = process.env.GATSBY_HOME_URL || "https://patca.ph"
export const API_BASE_URL = `${APP_URL}/v1`
export const SANCTUM = `${APP_URL}/sanctum/csrf-cookie`
export const DASHBOARD = `${APP_URL}/dashboard`

/** ------------------------- */

export const AUTH_USER_MAIN = "auth_main" // UserContext - check if user has profile, DASHBOARD - ADMIN
export const AUTH_USER_MAIN_STORE_PROFILE = "auth_profile"

export const PROFILE_FIELDS = "profileFields" // GET static fields from api

export const LOGIN = "login" // Auth - Main Login
export const LOGOUT = "logout" // Auth - Main Logout
export const REGISTER = "register" // Auth - Main Register
export const CONTACT = "contact" // POST contact message
