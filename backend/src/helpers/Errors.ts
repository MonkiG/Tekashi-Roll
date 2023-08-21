export class ParseErrors extends Error {
  name = 'Error parsering data'
  constructor (message: string) {
    super(message)
    delete this.stack
  }
}
