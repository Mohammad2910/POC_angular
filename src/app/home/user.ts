export class User {

  private _username: string;

  constructor(username: string) {
    this._username = username;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

}
