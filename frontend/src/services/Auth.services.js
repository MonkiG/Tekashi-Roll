import axios from 'axios'
import { API_URL } from '../helpers/consts'

export async function signup (data) {
  const response = await axios.post(`${API_URL}/auth/signup`, {
    email: data.mail,
    password: data.password,
    name: `${data.name} ${data.lastName}`,
    role: 'client',
    phone: data.phone
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const token = response.data.token
  window.localStorage.setItem('token', token)
}

export async function login (data) {
  const response = await axios.post(`${API_URL}/auth/login`, {
    email: data.mail,
    password: data.password
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const token = response.data.token
  window.localStorage.setItem('token', token)
}
