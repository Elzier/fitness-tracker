import { IS_AUTHENTICATED, IS_UNAUTHENTICATED, authAction } from './auth.actions'
import { Action } from '@ngrx/store'

export interface State {
  isAuthenticated: boolean
}

const initialState: State = {
  isAuthenticated: false
}

export function authReducer(state = initialState, action: Action) {
  switch (action.type) {
    case IS_AUTHENTICATED:
      return {isAuthenticated: true}
    case IS_UNAUTHENTICATED:
      return {isAuthenticated: false}
    default:
      return state
  }
}

export const getIsAuthenticated = (state: State) => state.isAuthenticated
