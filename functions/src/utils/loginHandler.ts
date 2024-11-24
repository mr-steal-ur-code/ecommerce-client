import userLogin from "./login";

export const loginHandler = (username: string, password: string) => {

  try {
    const { login, userObject } = userLogin(username, password);

    if (login) {
      return userObject;
    } else {
      return "Invalid Credentials"
    }
  } catch (error) {
    console.error(`${new Date()} - Error parsing request params:`, error);
  }
  return "Error Logging In"
}
