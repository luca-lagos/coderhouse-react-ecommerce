import { createContext } from "react";
import { auth, database } from "../data/Firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userLogged, setUserLogged] = useState(null);
  const [error, setError] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const commonRegister = async (path, user) => {
    setButtonLoading(true);
    if (user.fullname == "") {
      setButtonLoading(false);
      setError(true);
      setUpdateSuccess(false);
      setMessage("The fullname input is empty");
    } else if (user.phone == "") {
      setButtonLoading(false);
      setError(true);
      setUpdateSuccess(false);
      setMessage("The phone input is empty");
    } else if (user.email == "") {
      setButtonLoading(false);
      setError(true);
      setUpdateSuccess(false);
      setMessage("The email input is empty");
    } else if (user.password == "") {
      setButtonLoading(false);
      setError(true);
      setUpdateSuccess(false);
      setMessage("The password input is empty");
    } else if (user.repeatPassword == "") {
      setButtonLoading(false);
      setError(true);
      setUpdateSuccess(false);
      setMessage("The repeat password input is empty");
    } else if (user.password !== user.repeatPassword) {
      setButtonLoading(false);
      setError(true);
      setRegisterSuccess(false);
      setMessage("Passwords are not the same");
    } else {
      await createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((res) => {
          const uid = res.user.uid;
          setDoc(doc(database, path, uid), {
            fullname: user.fullname,
            email: user.email,
            phone: user.phone,
          }).then(() => {
            setButtonLoading(false);
            setError(false);
            setRegisterSuccess(true);
            setMessage(
              "The account has been created successfully, please login"
            );
            logOut();
            setTimeout(() => setRegisterSuccess(false), 3000);
          });
        })
        .catch((err) => {
          setButtonLoading(false);
          setError(true);
          setRegisterSuccess(false);
          switch (err.code) {
            case "auth/invalid-email":
              setMessage("Please, input a valid email");
              break;
            case "auth/invalid-password":
              setMessage("Please, input a valid password");
              break;
            case "auth/missing-email":
              setMessage("The email input is empty");
              break;
            case "auth/missing-password":
              setMessage("The password input is empty");
              break;
            case "auth/email-already-in-use":
              setMessage("Email already exists");
              break;
          }
        });
    }
  };

  const commonLogin = async (item) => {
    setButtonLoading(true);
    await signInWithEmailAndPassword(auth, item.email, item.password)
      .then(() => {
        setButtonLoading(false);
        setError(false);
        setLoginSuccess(true);
        setRegisterSuccess(false);
        setUpdateSuccess(false);
        setTimeout(() => setLoginSuccess(false), 500);
      })
      .catch((err) => {
        setButtonLoading(false);
        setError(true);
        setLoginSuccess(false);
        switch (err.code) {
          case "auth/wrong-password":
            setMessage("The password is incorrect");
            break;
          case "auth/user-not-found":
            setMessage("The user is not registered");
            break;
          case "auth/missing-email":
            setMessage("The email input is empty");
            break;
          case "auth/missing-password":
            setMessage("The password input is empty");
            break;
          case "auth/email-already-in-use":
            setMessage("Email already exists");
            break;
        }
      });
  };

  const googleLogin = async () => {
    setGoogleLoading(true);
    const googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({
      prompt: "select_account",
    });
    await signInWithPopup(auth, googleProvider)
      .then(() => {
        setGoogleLoading(false);
        setError(false);
        setLoginSuccess(true);
        setTimeout(() => setLoginSuccess(false), 500);
      })
      .catch((err) => {
        setError(true);
        setLoginSuccess(false);
        setGoogleLoading(false);
        setMessage(err.code);
      });
  };

  const commonResetPassword = async (email) => {
    setButtonLoading(true);
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        setButtonLoading(false);
        setError(false);
        setForgotSuccess(true);
        setMessage("Please check your email to reset your password");
        setTimeout(() => setForgotSuccess(false), 3000);
      })
      .catch((err) => {
        setButtonLoading(false);
        setError(true);
        setForgotSuccess(false);
        switch (err.code) {
          case "auth/user-not-found":
            setMessage("The user is not registered");
            break;
        }
      });
  };

  const logOut = () => {
    signOut(auth);
    setLoginSuccess(false);
  };

  const getUserById = async (id) => {
    return await getDoc(doc(database, "/User", id));
  };

  const reauthenticateUser = async (currentPassword) => {
    const credential = EmailAuthProvider.credential(
      userLogged.email,
      currentPassword
    );
    return await reauthenticateWithCredential(userLogged, credential);
  };

  const updateUserPassword = async (user) => {
    setButtonLoading(true);
    if (user.currentPassword == "") {
      setButtonLoading(false);
      setError(true);
      setUpdateSuccess(false);
      setMessage("The current password input is empty");
    } else if (user.newPassword == "") {
      setButtonLoading(false);
      setError(true);
      setUpdateSuccess(false);
      setMessage("The new password input is empty");
    } else if (user.repeatNewPassword == "") {
      setButtonLoading(false);
      setError(true);
      setUpdateSuccess(false);
      setMessage("The repeat new password input is empty");
    } else if (user.newPassword != user.repeatNewPassword) {
      setButtonLoading(false);
      setError(true);
      setUpdateSuccess(false);
      setMessage("The new passwords are not the same");
    } else {
      await reauthenticateUser(user.currentPassword)
        .then(() => {
          updatePassword(userLogged, user.newPassword)
            .then(() => {
              setButtonLoading(false);
              setError(false);
              setUpdateSuccess(true);
              setMessage("The password has been updated successfully");
              logOut();
              setTimeout(() => setUpdateSuccess(false), 3000);
            })
            .catch((err) => {
              setButtonLoading(false);
              setError(true);
              setUpdateSuccess(false);
              setMessage(err.code);
            });
        })
        .catch(() => {
          setButtonLoading(false);
          setError(true);
          setUpdateSuccess(false);
          setMessage("The current password is incorrect");
        });
    }
  };

  const updateUserProfile = async (uid, user) => {
    setButtonLoading(true);
    if (user.fullname == "") {
      setButtonLoading(false);
      setError(true);
      setUpdateSuccess(false);
      setMessage("The fullname input is empty");
    } else if (user.phone == "") {
      setButtonLoading(false);
      setError(true);
      setUpdateSuccess(false);
      setMessage("The phone input is empty");
    } else {
      await updateDoc(doc(database, "/User", uid), {
        fullname: user.fullname,
        phone: user.phone,
      })
        .then(() => {
          setButtonLoading(false);
          setError(false);
          setUpdateSuccess(true);
          setMessage("Profile has been updated successfully");
          setTimeout(() => setUpdateSuccess(false), 3000);
        })
        .catch((err) => {
          setButtonLoading(false);
          setError(true);
          setUpdateSuccess(false);
          setMessage(err.code);
        });
    }
  };

  const CloseAllSnackbar = () => {
    setError(false);
    setLoginSuccess(false);
    setRegisterSuccess(false);
    setUpdateSuccess(false);
    setForgotSuccess(false);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUserLogged(currentUser);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        error,
        loginSuccess,
        registerSuccess,
        updateSuccess,
        forgotSuccess,
        message,
        buttonLoading,
        googleLoading,
        userLogged,
        CloseAllSnackbar,
        commonRegister,
        commonLogin,
        googleLogin,
        commonResetPassword,
        logOut,
        getUserById,
        updateUserProfile,
        updateUserPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
