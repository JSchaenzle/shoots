import * as ErrorMessages from './errorMessages.js';

export const required = (text) => {
  if (text) {
    return null;
  } else {
    return ErrorMessages.isRequired;
  }
};

export const mustMatch = (field, fieldName) => {
  return (text, state) => {
    return state[field] === text ? null : ErrorMessages.mustMatch(fieldName);
  };
};

export const minLength = (length) => {
  return (text) => {
    console.log("Checking for length greater than ", length);
    return text.length >= length ? null : ErrorMessages.minLength(length);
  };
};


