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
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
  updatePassword,
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
            password: user.password,
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

  const reauthenticate = (currentPassword) => {
    let credential = EmailAuthProvider.credential(
      userLogged.email,
      currentPassword
    );
    return reauthenticateWithCredential(credential);
  };

  const updateUser = async (uid, user, currentPassword) => {
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
    } else {
      reauthenticate(currentPassword)
        .then(() => {
          const promises = [];
          if (user.email == userLogged.email) {
            setButtonLoading(false);
            setError(true);
            setUpdateSuccess(false);
            setMessage("The email is the same as the current email");
          } else if (user.password == user.repeatPassword) {
            setButtonLoading(false);
            setError(true);
            setUpdateSuccess(false);
            setMessage("The passwords are not the same");
          } else {
            promises.push(updateEmail(user.email));
            promises.push(updatePassword(user.password));
            Promise.all(promises).then(() => {
              updateDoc(doc(database, "/User", uid), {
                fullname: user.fullname,
                email: user.email,
                phone: user.phone,
                password: user.password,
              })
                .then(() => {
                  setButtonLoading(false);
                  setError(false);
                  setUpdateSuccess(true);
                  setMessage("Profile has been updated successfully");
                  setTimeout(() => setRegisterSuccess(false), 3000);
                })
                .catch((err) => {
                  setButtonLoading(false);
                  setError(true);
                  setUpdateSuccess(false);
                  setMessage(err.code);
                });
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const CloseAllSnackbar = () => {
    setError(false);
    setLoginSuccess(false);
    setRegisterSuccess(false);
    setUpdateSuccess(false);
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
