export default class ApiError extends Error {
  status: number;
  message!: string;
  constructor(status: number, message: string, public errors: string[] = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new ApiError(401, "User not authorized");
  }

  static BadRequest(message: string) {
    return new ApiError(400, message);
  }

  static Blocked() {
    return new ApiError(403, "You don't have access");
  }
}
