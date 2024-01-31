import { AppRootStateType } from "app/store"

export const isInitializedSelector = (state: AppRootStateType) => state.app.isInitialized
export const statusSelector = (state: AppRootStateType) => state.app.status
