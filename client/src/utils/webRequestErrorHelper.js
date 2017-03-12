
export const wrapError = (xhr, status, error) => {
  const json = xhr.responseJSON;
  let result = {
    message: null,
    type: null
  };

  if (json) {
    result.message = json.message || "An unknown error occurred";
    result.title = json.title || "";
  } else {
    console.log("Web service returned improperly formatted error:", xhr);
  }

  return result;
};

export const unwrapErrorMessage = (wrappedError) => {
  if (wrappedError) {
    return wrappedError.message;
  }
  return null;
};

