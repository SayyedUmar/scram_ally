export class UserDetails {
  constructor(userDetails?: any) {
    if (userDetails) {
      Object.assign(this, userDetails);
    }
  }

  public name: string;
  public nickname: string;
  public email: string;
  public emailVerified: boolean;
  public picture: string;

}
