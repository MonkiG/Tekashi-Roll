import Utils from '../../helpers/Utils'

export default class UserLoginRequestDto {
  public password
  public email

  constructor ({ password, email }: { password: string, email: string }) {
    this.password = Utils.parsePassword(password)
    this.email = Utils.parseEmail(email)
  }
}
