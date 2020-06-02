class UpdateUserCommand {
  constructor(public readonly id: string, public readonly email: string) {}
}

export default UpdateUserCommand;
