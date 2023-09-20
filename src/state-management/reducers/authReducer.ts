interface Action {
  type: "LOGIN" | "LOGOUT";
}

interface LoginAction {
  type: "LOGIN";
  name: string;
}

interface LogoutAction {
  type: "LOGOUT";
}
type authAction = LoginAction | LogoutAction;
const authReducer = (state: string, action: authAction): string => {
  switch (action.type) {
    case "LOGIN":
      return action.name;
    case "LOGOUT":
      return "";
  }
};

export default authReducer;
