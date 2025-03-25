"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import apiClient from "@/api/client";
import useAuth from "@/auth/useAuth";
import { PuffLoader } from "react-spinners";
import swal from "sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faEnvelope,
  faEye,
  faEyeSlash,
  faLock,
  faMobile,
  faMobileRetro,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { GoogleLogin } from "@react-oauth/google";

const Register = () => {
  const [error, setError] = useState(null);
  const { user, logIn } = useAuth();
  const [loading, isLoading] = useState(false);
  const router = useRouter();
  const [value, setValue] = useState();

  const [passwordType, setPasswordType] = useState("password");
  const [eye, seteye] = useState(true);

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      seteye(false);
      return;
    }
    setPasswordType("password");
    seteye(true);
  };

  const handleSubmit2 = async (credentialResponse) => {
    const result = await apiClient.post("/user/registerGoogle", {
      client_id: credentialResponse.clientId,
      jwtToken: credentialResponse.credential,
    });
    if (result.ok) {
      swal("Register", "You are registered successfully", "success");
      isLoading(false);
      logIn(result.data.token);
      router.push("/");
    } else {
      isLoading(false);
      swal("Register Error!", "Please retry to register.", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    isLoading(true);
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[3].value;
    // const phone = e.target[2].value;

    const result = await apiClient.post("/user/", {
      name,
      email,
      password,
      phone: value,
      // phone,
    });
    if (result.ok) {
      swal("Register", "You are registered successfully", "success");
      isLoading(false);
      logIn(result.data.token);
      router.push("/");
    } else {
      isLoading(false);
      swal("Register Error!", "Please retry to register.", "error");
    }
  };

  return (
    <>
      {loading ? (
        <div className={styles.loaderContainer}>
          <PuffLoader size={100} color="#003580" />
        </div>
      ) : (
        <div className={styles.container}>
          <h2 className={styles.title}>Create an Account</h2>
          <h3 className={styles.subtitle}>
            Please sign up to see the dashboard.
          </h3>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputTxt}>
              <div className={styles.inputIcon}>
                <FontAwesomeIcon icon={faPerson} color="#00000" />
              </div>
              <input
                type="text"
                placeholder="Name"
                required
                className={styles.input}
              />
            </div>
            <div className={styles.inputTxt}>
              <div className={styles.inputIcon}>
                <FontAwesomeIcon icon={faEnvelope} color="#00000" />
              </div>
              <input
                type="email"
                placeholder="Email"
                required
                className={styles.input}
              />
            </div>
            <div className={styles.inputTxt}>
              <PhoneInput country={"us"} value={value} onChange={setValue} />
            </div>
            <div className={styles.inputTxt}>
              <div className={styles.inputIcon}>
                <FontAwesomeIcon icon={faLock} color="#00000" />
              </div>
              <input
                type={passwordType}
                placeholder="Password"
                required
                className={styles.input}
              />{" "}
              <div className={styles.eyeIcon} onClick={togglePassword}>
                {eye ? (
                  <FontAwesomeIcon icon={faEyeSlash} color="#00000" />
                ) : (
                  <FontAwesomeIcon icon={faEye} color="#00000" />
                )}
              </div>
            </div>

            <button className={styles.button}>Register</button>
            {error && "Something went wrong!"}
          </form>
          {/* <GoogleLogin
            onSuccess={(credentialResponse) => {
              handleSubmit2(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          /> */}
          <span className={styles.or}>- OR -</span>
          <Link className={styles.link} href="/login">
            Login with an existing account
          </Link>
        </div>
      )}
    </>
  );
};

export default Register;
