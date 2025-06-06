import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import {ApiConfig} from "../../../api/ApiConfig";
import { useAuth } from "../../../context/AuthContext";
import { getUserLoginSchema } from "../../../schema/UserLoginSchema";
import { PATHS } from "../../../constants/routes";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export const useLoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useTranslation("loginRegister");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleLogin = async (response) => {
    toast.success(t("loginSuccessful"));
    console.log(response.token);
    login(response.token);
    setTimeout(() => {
      navigate(PATHS.dresscode.home, { replace: true });
    }, 1000);
  };

  const formik = useFormik({
    initialValues: {
      email: "iagomartinezv@gmail.com",
      password: "Passw0rd",
    },
    validationSchema: getUserLoginSchema(t),
    onSubmit: async (values) => {
      setIsSubmitting(true);

      try {
        const response = await ApiConfig.loginUser({
          email: values.email,
          password: values.password,
        });
        await handleLogin(response);
      } catch (error) {
        console.error("Login error:", error);
        toast.error(t("invalidCredentials"));
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return { formik, isSubmitting};
};
