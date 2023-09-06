export default class AppError {
    constructor(message, name, status) {
      Object.assign(this, { message, name, status });
    }
  }
