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
  const [message, setMessage] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const commonRegister = async (path, item) => {
    setButtonLoading(true);
    if (item.fullname == "") {
      setButtonLoading(false);
      setError(true);
      setRegisterSuccess(false);
      setMessage("The fullname input is empty");
    } else if (item.password !== item.repeatPassword) {
      setButtonLoading(false);
      setError(true);
      setRegisterSuccess(false);
      setMessage("Passwords are not the same");
    } else {
      await createUserWithEmailAndPassword(auth, item.email, item.password)
        .then((res) => {
          const uid = res.user.uid;
          setDoc(doc(database, path, uid), {
            fullname: item.fullname,
            email: item.email,
            phone: item.phone,
            password: item.password,
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
          console.log(err.code);
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
        setTimeout(() => setLoginSuccess(false), 500);
      })
      .catch((err) => {
        setButtonLoading(false);
        setError(true);
        setLoginSuccess(false);
        console.log(err.code);
      });
  };

  const googleLogin = async () => {
    setGoogleLoading(true);
    const googleProvider = new GoogleAuthProvider();
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
        console.log(err.code);
      });
  };

  const commonResetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
  };

  const logOut = () => {
    signOut(auth);
    setLoginSuccess(false);
  };

  const getUserById = async (id) => {
    return await getDoc(doc(database, "/User", id));
  };

  const updateUser = async (uid, user) => {
    return await updateDoc(doc(database, "/User", uid), user);
  };

  const CloseAllSnackbar = () => {
    setError(false);
    setLoginSuccess(false);
    setRegisterSuccess(false);
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
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
