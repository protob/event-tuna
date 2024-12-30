import { BaseEntity } from './base'

export interface User extends BaseEntity {
  username: string
  email: string
  password?: string
  role: string
  active: boolean
  created_at: string
  updated_at: string
}

export interface UserCredentials {
  username: string
  password: string
}

export interface UserRegistration extends UserCredentials {
  email: string
}

export interface UserState {
  currentUser: User | null
}
