//All Actions for Reducer


function SetEmail(value) {
  return {
    type: "UserSet",
    payload: value,
  };
}

export {SetEmail}
