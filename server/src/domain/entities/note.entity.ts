import IsRequiredError from '../errors/is-required.error';

class NoteDomainEntity {
  private _id: string;
  private _userId: string;
  private _text: string;

  /**
   *
   */
  constructor(id: string, userId: string, text: string) {
    this.validateId(id);
    this.validateUserId(userId);
    this.validateText(text);

    this._id = id;
    this._userId = userId;
    this._text = text;
  }

  public get id() {
    return this._id;
  }

  public get userId() {
    return this._userId;
  }

  public get text() {
    return this._text;
  }

  public update(text: string) {
    this.validateText(text);

    this._text = text;
  }

  private validateId(value: string) {
    if (value === undefined || value === null || value.trim() === '') {
      throw new IsRequiredError('Id');
    }
  }

  private validateUserId(value: string) {
    if (value === undefined || value === null || value.trim() === '') {
      throw new IsRequiredError('User Id');
    }
  }

  private validateText(value: string) {
    if (value === undefined || value === null || value.trim() === '') {
      throw new IsRequiredError('Text');
    }
  }
}

export default NoteDomainEntity;
