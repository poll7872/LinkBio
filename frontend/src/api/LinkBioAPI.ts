import { isAxiosError } from "axios"
import api from "../config/axios"
import type { profileForm, User } from "../types"

export async function getUser() {
  try {
    const { data } = await api.get<User>('/user')

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function updateProfile(formData: profileForm) {
  try {
    const { data } = await api.put('/user', formData)

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}
