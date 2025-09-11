export type User = {
  handle: string
  name: string
  email: string
  _id: string
  description: string
  url_image: string
  links: string
}

export type UserHandle = Pick<User, 'description' | 'handle' | 'name' | 'url_image' | 'links'>

export type RegisterForm = Pick<User, 'name' | 'email' | 'handle'> & {
  password: string
  password_confirmation: string
}

export type LoginForm = Pick<User, 'email'> & {
  password: string
}

export type profileForm = Pick<User, 'handle' | 'description'>

export type SocialNetwork = {
  id: number
  name: string
  url: string
  enabled: boolean
}

export type LinkTree = Pick<SocialNetwork, 'name' | 'url' | 'enabled'>

export type SearchResponse = {
  message: string
}
