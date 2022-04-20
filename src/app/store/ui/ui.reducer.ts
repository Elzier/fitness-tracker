import { AUTH_CHECKED, START_LOADING, STOP_LOADING } from './ui.actions'
import { Action } from '@ngrx/store'

export interface State {
  isLoading: boolean,
  showAuthContent: boolean
}

const initialState: State = {
  isLoading: false,
  showAuthContent: false
}

export function uiReducer(state = initialState, action: Action) {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: true
      }
    case STOP_LOADING:
      return {
        ...state,
        isLoading: false
      }
    case AUTH_CHECKED:
      return {
        ...state,
        showAuthContent: true
      }
    default:
      return state
  }
}

export const getIsLoading = (state: State) => state.isLoading
export const getAuthChecked = (state: State) => state.showAuthContent
