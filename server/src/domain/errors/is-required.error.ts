class IsRequiredError {
  /**
   *
   */
  constructor(propertyName: string) {
    throw new Error(`${propertyName} is required.`);
  }
}

export default IsRequiredError;
