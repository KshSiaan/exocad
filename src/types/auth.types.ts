


export interface RegisterPayload {
    role:string
    full_name:string
    email:string
    password:string
    password_confirmation:string
    address?:string
    contact_email_address:string
    clinic_name?:string
    proffesional_title?:string
    bio?:string
}
export interface LoginPayload {
    email:string
    password:string
}



export interface RegisterResponse{
  full_name: string
  role: string
  email: string
  otp: number
  otp_expires_at: string
  updated_at: string
  created_at: string
  id: number
  avatar_url: string
}
export interface LoginResponse{
  token: string
  token_type: string
  expires_in: string
  user: Omit<User["user"], "profile">
}


export interface User {
  user: {
    id: number
    full_name: string
    role: string
    email: string
    email_verified_at: string
    status: string
    otp_verified_at?: Date
    otp?: string
    otp_expires_at: Date
    avatar?: string
    stripe_connect_id?: string
    is_trail_used: number
    google_id?: string
    timezone?: Date
    login_status: number
    last_active?: Date
    created_at: Date
    updated_at: Date
    deleted_at?: Date
    avatar_url: string
    profile: {
      id: number
      user_id: number
      professional_title?: string
      specializations: any
      availability: boolean
      level: any
      bio?: string
      clinic_name?: string
      about_for_designer?: string
      wallet_balance: string
      contact_email_address?: string
      address?: string
      phone_number?: string
      created_at: Date
      updated_at: Date
    }
  }
}