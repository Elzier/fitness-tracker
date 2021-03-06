import firebase from 'firebase/compat/app'
import Timestamp = firebase.firestore.Timestamp

export interface User {
  email: string,
  userId: string
}

export interface AuthData {
  email: string,
  password: string
}

export interface Exercise {
  id: string,
  name: string,
  duration: number,
  calories: number,
  date?: Timestamp,
  state?: 'completed' | 'cancelled' | null
}
