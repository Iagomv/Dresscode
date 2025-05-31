import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import {ApiConfig} from "../../api/ApiConfig";
import { useAuth } from "../../context/AuthContext";
import { getUserLoginSchema } from "../../schema/UserLoginSchema";
import { useTranslation } from "react-i18next";

export const useLoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useTranslation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = async (response) => {
    if (!response?.data?.token || response?.status !== 200) {
      setErrorMessage(t("loginRegister:invalidServerResponse") || "Invalid response from server.");
      return;
    }
    login(response.data.token);
    navigate("/home", { replace: true });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: getUserLoginSchema(t),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setErrorMessage(null);

      try {
        const response = await ApiConfig.loginUser({
          email: values.email,
          password: values.password,
        });
        await handleLogin(response);
      } catch {
        setErrorMessage(t("loginRegister:invalidCredentials") || "Invalid email or password.");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  return { formik, isSubmitting, errorMessage };
};
