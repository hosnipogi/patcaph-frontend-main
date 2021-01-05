/* eslint-disable no-undef */
const APP_URL = process.env.GATSBY_API_URL || "https://api.patca.ph"
export const HOME_URL = process.env.GATSBY_HOME_URL || "https://patca.ph"
export const API_BASE_URL = `${APP_URL}/v1`
export const SANCTUM = `${APP_URL}/sanctum/csrf-cookie`

export const PROFILE_FIELDS = "profileFields" // GET static fields from api
export const CURRENT_USER = "userAuth"
export const CURRENT_USER_PROFILE = "userProfile" // Store current user profile/membership after registering
export const CURRENT_USER_PHOTO = "userPhoto" // DASHBOARD - GET current user photo

export const ADMIN_GET_ALL_USERS = "users" // Dashboard - GET all users
export const ADMIN_GET_SINGLE_USER = "user" // UserContext - check if user has profile, DASHBOARD - ADMIN -appends with /wiresign/surname params
export const ADMIN_GET_SINGLE_USER_PHOTO = "user/photo" // DASHBOARD - ADMIN - GET selected user photo, appends with /wiresign/surname params
export const ADMIN_DELETE_USER = "user" // DASHBOARD - ADMIN - DELETE selected user, appends with /wiresign/surname params

export const LOGIN = "login" // Auth - Main Login
export const LOGOUT = "logout" // Auth - Main Logout
export const REGISTER = "register" // Auth - Main Register
export const CONTACT = "contact" // POST contact message
export const DASHBOARD = `${APP_URL}/dashboard`
