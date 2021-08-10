export * from './calculation';
export * from './generateHeaderTitle';
export * from './createAuthorizedRequestHeader';
export * from './createToast';

export const getErrorMessageFromResponse = (error) =>
  error.response && error.response.data.message ? error.response.data.message : error.message;
