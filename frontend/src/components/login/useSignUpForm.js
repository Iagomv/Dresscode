/* useSignUpForm.js */
import { useState } from "react";
import { useFormik } from "formik";
import {ApiConfig} from "../../api/ApiConfig";
import { userRegistrationSchema } from "../../schema/UserRegistrationSchema";
import { useTranslation } from "react-i18next";

export const useSignUpForm = (toggleForm) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [registeredUser, setRegisteredUser] = useState(null);
  const { t } = useTranslation();
  const { t: tLogin } = useTranslation("loginRegister");

const onErrorResponse = (error) => {
    console.log('Error object:', error);
  console.log('Response data:', error.response?.data);
  console.log('Message to show:', message);
  const message = error.response?.data?.message || 
                 error.message || 
                 tLogin("registerErrorMessage");
  toast.error(message); 
};

const onSuccessResponse = (response) => {
  setRegisteredUser(response.data);
  toast.success(tLogin("registerSuccessMessage")); // Use toast.success
  if (typeof toggleForm === "function") {
    // toggleForm();
  }
};

  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: userRegistrationSchema(t),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setErrorMessage(null);

      const userRegistrationData = {
        name: values.name,
        lastName: values.lastName,
        phoneNumber: values.phoneNumber,
        email: values.email,
        password: values.password,
      };

      try {
        const response = await ApiConfig.registerUser(userRegistrationData);
        onSuccessResponse(response);
      } catch (error) {
        onErrorResponse(error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return {
    formik,
    isSubmitting,
    errorMessage,
    showSuccess,
    setShowSuccess,
    registeredUser,
    t,
    tLogin,
  };
};
