"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import apiClient from "@/api/client";
import useAuth from "@/auth/useAuth";
import { PuffLoader } from "react-spinners";
import swal from "sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GoogleLogin } from "@react-oauth/google";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import jwt_decode from "jwt-decode";

const Login = () => {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, isLoading] = useState(false);
  const [email, setEmail] = useState("");

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

  useEffect(() => {
    setError(params.get("error"));
    setSuccess(params.get("success"));
  }, [params]);
  const { user, logIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    isLoading(true);
    const email = e.target[0].value;
    const password = e.target[1].value;

    const result = await apiClient.post("/user/login", {
      email,
      password,
    });
    if (result.ok) {
      logIn(result.data.token);
      isLoading(false);
      router.push("/");
    } else {
      isLoading(false);
      // setError(result.data);
      // console.log("err");
      swal("Login Error!", "You are not authenticated. Please retry.", "error");
    }
  };

  const handleSubmit2 = async (credentialResponse) => {
    const result = await apiClient.post("/user/loginGoogle", {
      client_id: credentialResponse.clientId,
      jwtToken: credentialResponse.credential,
    });
    if (result.ok) {
      swal("Login", "You are logged in successfully", "success");
      logIn(result.data.token);
      isLoading(false);
      router.push("/");
    } else {
      isLoading(false);
      swal("Error!", "Please retry ", "error");
    }
  };

  const resetPW = async () => {
    const result = await apiClient.post("/user/resetPassword", {
      email,
    });

    setEmail("");
    if (!result.ok) {
      swal("Error Occurred", "Please retry", "error");
    } else {
      swal("Password Reset Successfully", "Please check your email", "success");
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
          <h2 className={styles.title}>{success ? success : "Welcome Back"}</h2>
          <h3 className={styles.subtitle}>
            Please sign in to see the dashboard.
          </h3>
          <form onSubmit={handleSubmit} className={styles.form}>
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
              <div className={styles.inputIcon}>
                <FontAwesomeIcon icon={faLock} color="#00000" />
              </div>
              <input
                type={passwordType}
                placeholder="Password"
                required
                className={styles.input}
              />
              <div className={styles.eyeIcon} onClick={togglePassword}>
                {eye ? (
                  <FontAwesomeIcon icon={faEyeSlash} color="#00000" />
                ) : (
                  <FontAwesomeIcon icon={faEye} color="#00000" />
                )}
              </div>
            </div>

            <button className={styles.button}>Login</button>
            {error && error}
          </form>
          {/* <GoogleLogin
            onSuccess={(credentialResponse) => {
              handleSubmit2(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          /> */}
          <Popup
            trigger={
              <button className={styles.ResetBtn}> Reset Password </button>
            }
            modal
            nested
            contentStyle={{ width: "80%" }}
          >
            {(close) => (
              <div className={styles.modal}>
                <button className={styles.close} onClick={close}>
                  &times;
                </button>
                <div className={styles.header}> Reset Password </div>
                <div className={styles.content}>
                  Enter the email address associated with your account and we
                  will send you instructions to reset your password.
                </div>
                <div className={styles.actions}>
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    className={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button
                    className={styles.button1}
                    onClick={() => {
                      close();
                      resetPW();
                    }}
                  >
                    Reset Password
                  </button>
                </div>
              </div>
            )}
          </Popup>
          <span className={styles.or}>- OR -</span>
          <Link className={styles.link} href="/register">
            Create new account
          </Link>
        </div>
      )}
    </>
  );
};

export default Login;
