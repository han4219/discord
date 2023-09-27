import axios, { AxiosInstance } from 'axios'

class Http {
  private instance: AxiosInstance
  constructor() {
    this.instance = axios.create({})
  }
}
