import EMAIL_REGEXP from '../../constants/email.regex';
import IsRequiredError from '../errors/is-required.error';

class UserDomainEntity {
  private static readonly _regExp = new RegExp(EMAIL_REGEXP);

  private constructor(private _email: string, private _id: string) {}

  public get id() {
    return this._id;
  }

  public get email() {
    return this._email;
  }

  public static create(email: string) {
    UserDomainEntity.validateEmail(email);

    return new UserDomainEntity(email, null);
  }

  public static update(email: string, id: string) {
    UserDomainEntity.validateId(id);
    UserDomainEntity.validateEmail(email);

    return new UserDomainEntity(email, id);
  }

  public static readFromDatabase(email: string, id: string) {
    return new UserDomainEntity(email, id);
  }

  private static validateId(value: string) {
    if (value === undefined || value === null || value.trim() === '') {
      throw new IsRequiredError('Id');
    }
  }

  private static validateEmail(value: string) {
    if (value === undefined || value === null || value.trim() === '') {
      throw new IsRequiredError('Email');
    }

    const valueContainsExpression = this._regExp.test(value);

    if (valueContainsExpression === false) {
      throw new Error('The email provided is not valid.');
    }
  }
}

export default UserDomainEntity;
