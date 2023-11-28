export default class ResponseDto {
  public message: string
  public data?: any

  constructor ({ message, data }: { message: string, data?: any }) {
    this.message = message
    this.data = data
  }
}
