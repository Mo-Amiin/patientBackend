class ApiException extends Error {
    constructor(message, status) {
      super(message);
      this.statusCode = status;
    }
}


export const apiRequestException = (message, status) => {
    throw   new ApiException(message, status);
};
