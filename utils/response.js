// utils/response.js

const successResponse = (data, message = 'Success', statusCode = 200) => {
    return {
      statusCode,
      message,
      data,
    };
  };
  
  const errorResponse = (message = 'Internal Server Error', statusCode = 500) => {
    return {
      statusCode,
      message,
    };
  };
  
  module.exports = {
    successResponse,
    errorResponse,
  };
  