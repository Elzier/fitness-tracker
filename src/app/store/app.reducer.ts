import * as fromUI from './ui/ui.reducer'
import * as fromAuth from './auth/auth.reducer'
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store'

export interface State {
  ui: fromUI.State,
  auth: fromAuth.State
}

export const reducers: ActionReducerMap<State> = {
  ui: fromUI.uiReducer,
  auth: fromAuth.authReducer
}

export const getUiState = createFeatureSelector<fromUI.State>('ui')
export const isLoading = createSelector(getUiState, fromUI.getIsLoading)

export const getIsAuth = createFeatureSelector<fromAuth.State>('auth')
export const isAuthenticated = createSelector(getIsAuth, fromAuth.getIsAuthenticated)
