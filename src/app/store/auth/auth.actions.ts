import { Action } from '@ngrx/store'

export const IS_AUTHENTICATED = '[AUTH] Is authenticated'
export const IS_UNAUTHENTICATED = '[AUTH] Is unauthenticated'

export class IsAuthenticated implements Action {
  readonly type = IS_AUTHENTICATED
}

export class IsUnAuthenticated implements Action {
  readonly type = IS_UNAUTHENTICATED
}


export type authAction = IsAuthenticated | IsUnAuthenticated
