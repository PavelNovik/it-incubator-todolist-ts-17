import { Dispatch } from "redux"
import { authAPI } from "api/todolists-api"
// import { setIsLoggedInAC } from "../features/Login/auth-reducer"
import { setIsLoggedIn } from "features/Login/auth-reducer"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
  status: "idle",
  error: null,
  isInitialized: false,
}
// export type InitialStateType = {
//   // происходит ли сейчас взаимодействие с сервером
//   status: RequestStatusType
//   // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
//   error: string | null
//   // true когда приложение проинициализировалось (проверили юзера, настройки получили и т.д.)
//   isInitialized: boolean
// }

export type AppState = ReturnType<typeof slice.getInitialState>

const slice = createSlice({
  name: "app",
  initialState: {
    status: "idle" as RequestStatusType,
    error: null as string | null,
    isInitialized: false,
  },
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error
    },
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status
    },
    setAppIsInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized
    },
  },
})

export const appReducer = slice.reducer

export const appActions = slice.actions

// export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
//   switch (action.type) {
//     case "APP/SET-STATUS":
//       return { ...state, status: action.status }
//     case "APP/SET-ERROR":
//       return { ...state, error: action.error }
//     case "APP/SET-IS-INITIALIZED":
//       return { ...state, isInitialized: action.value }
//     default:
//       return { ...state }
//   }
// }

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

// export const setAppErrorAC = (error: string | null) => ({ type: "APP/SET-ERROR", error }) as const
// export const setAppStatusAC = (status: RequestStatusType) => ({ type: "APP/SET-STATUS", status }) as const
// export const setAppInitializedAC = (value: boolean) => ({ type: "APP/SET-IS-INITIALIZED", value }) as const

export const initializeAppTC = () => (dispatch: Dispatch) => {
  authAPI.me().then((res) => {
    if (res.data.resultCode === 0) {
      // dispatch(setIsLoggedInAC(true))
      dispatch(setIsLoggedIn({ isLoggedIn: true }))
    } else {
    }

    // dispatch(setAppInitializedAC(true))
    dispatch(appActions.setAppIsInitialized({ isInitialized: true }))
  })
}
//
// export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
// export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
//
// type ActionsType = SetAppErrorActionType | SetAppStatusActionType | ReturnType<typeof setAppInitializedAC>
