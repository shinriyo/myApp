import { createAction } from "typesafe-actions";
import { authFirebase } from "./actions/login";

export const sawTutorial = createAction("user/SAW_TUTORIAL", resolve => () => resolve(true));

export const logIn = createAction("user/LOG_IN", resolve => () => resolve(true));

export const logOut = createAction("user/LOG_OUT", resolve => () => resolve(false));

export const updateUserPicture = createAction("user/UPDATE_PICTURE", resolve => (pictureLocation: string) =>
  resolve(pictureLocation)
);

export const setUsername = createAction("user/SET_USERNAME", resolve => (username: string) => resolve(username));

// export const runAuthFirebase = createAction("user/AUTH_FIREBASE", resolve => () => resolve(authFirebase));
export const runAuthFirebase = createAction("user/AUTH_FIREBASE", resolve => (name: string, pass: string) =>
  resolve({ name, pass })
);
