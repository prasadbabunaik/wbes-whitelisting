//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
// import { postJwtLogin } from "../../../helpers/fakebackend_helper";

import Cookies from "js-cookie";

import {
  loginSuccess,
  logoutUserSuccess,
  apiError,
  reset_login_flag,
} from "./reducer";

// export const loginUser = (user: any, router: any) => async (dispatch: any) => {
//   try {
//     // Determine authentication method
//     const defaultAuth =
//       process.env.NEXT_PUBLIC_DEFAULT_AUTH ||
//       process.env.NEXT_PUBLIC_DEFAULTAUTH;
//     let response;
//     if (defaultAuth === "firebase") {
//       const fireBaseBackend: any = getFirebaseBackend();
//       response = fireBaseBackend.loginUser(user.email, user.password);
//     } else {
//       // JWT or fake auth use the same JWT login endpoint (mocked by fake backend)
//       response = postJwtLogin({
//         email: user.email,
//         password: user.password,
//       });
//     }

//     const data = await response;

//     if (data) {
//       // Store in cookie for persistence
//       Cookies.set("authUser", JSON.stringify(data), { expires: 1 }); // 1 day
//       // Dispatch login success and redirect
//       dispatch(loginSuccess(data));
//       router.push("/dashboard");
//     }
//   } catch (error) {
//     dispatch(apiError(error));
//   }
// };

// Disabled Velzon auth
export const loginUser = () => {
  throw new Error("Use API-based login instead");
};


export const logoutUser = () => async (dispatch: any) => {
  try {
    Cookies.remove("authUser");
    let fireBaseBackend: any = getFirebaseBackend();
    if (process.env.NEXT_PUBLIC_DEFAULTAUTH === "firebase") {
      const response = fireBaseBackend.logout;
      dispatch(logoutUserSuccess(response));
    } else {
      dispatch(logoutUserSuccess(true));
    }
  } catch (error) {
    dispatch(apiError(error));
  }
};

export const socialLogin =
  (type: any, history: any) => async (dispatch: any) => {
    try {
      let response;

      if (process.env.NEXT_PUBLIC_DEFAULTAUTH === "firebase") {
        const fireBaseBackend: any = getFirebaseBackend();
        response = fireBaseBackend.socialLoginUser(type);
      }

      const socialData = await response;
      if (socialData) {
        Cookies.set("authUser", JSON.stringify(socialData), { expires: 1 });
        dispatch(loginSuccess(socialData));
        history("/dashboard");
      }
    } catch (error) {
      dispatch(apiError(error));
    }
  };

export const resetLoginFlag = () => async (dispatch: any) => {
  try {
    const response = dispatch(reset_login_flag());
    return response;
  } catch (error) {
    dispatch(apiError(error));
  }
};
