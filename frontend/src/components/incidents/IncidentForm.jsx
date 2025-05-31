import React from "react";
import { Formik, Form } from "formik";
import { Button, Form as BootstrapForm } from "react-bootstrap";
import { ApiConfig } from "../../api/ApiConfig";
import IncidentRegistrationSchema from "../../schema/IncidentRegistrationSchema";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const IncidentForm = () => {
  const { auth } = useAuth();

  const initialValues = {
    title: "",
    description: "",
    category: "",
    priority: "LOW",
    status: "OPEN",
    userId: auth.user.id,
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await toast.promise(ApiConfig.createIncident(values), {
        pending: "Creando incidente...",
        success: "Incidente creado exitosamente",
        error: "Error al crear incidente",
      });
      resetForm();
    } catch (error) {
      console.error("Error creating incident:", error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={IncidentRegistrationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleChange, handleBlur, values, touched, errors }) => (
        <Form>
          <BootstrapForm.Group className="mb-3">
            <BootstrapForm.Label htmlFor="title">Título</BootstrapForm.Label>
            <BootstrapForm.Control
              id="title"
              name="title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.title && !!errors.title}
            />
            <BootstrapForm.Control.Feedback type="invalid">
              {errors.title}
            </BootstrapForm.Control.Feedback>
          </BootstrapForm.Group>

          <BootstrapForm.Group className="mb-3">
            <BootstrapForm.Label htmlFor="description">
              Descripción
            </BootstrapForm.Label>
            <BootstrapForm.Control
              id="description"
              as="textarea"
              rows={3}
              name="description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.description && !!errors.description}
            />
            <BootstrapForm.Control.Feedback type="invalid">
              {errors.description}
            </BootstrapForm.Control.Feedback>
          </BootstrapForm.Group>

          <BootstrapForm.Group className="mb-3">
            <BootstrapForm.Label htmlFor="category">
              Categoría
            </BootstrapForm.Label>
            <BootstrapForm.Select
              id="category"
              name="category"
              value={values.category}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.category && !!errors.category}
            >
              <option value="">Seleccione una categoría</option>
              <option value="HARDWARE">Hardware</option>
              <option value="SOFTWARE">Software</option>
              {/* <option value="OTHER">Otro</option> */}
            </BootstrapForm.Select>
            <BootstrapForm.Control.Feedback type="invalid">
              {errors.category}
            </BootstrapForm.Control.Feedback>
          </BootstrapForm.Group>

          <BootstrapForm.Group className="mb-3">
            <BootstrapForm.Label htmlFor="priority">
              Prioridad
            </BootstrapForm.Label>
            <BootstrapForm.Select
              id="priority"
              name="priority"
              value={values.priority}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.priority && !!errors.priority}
            >
              <option value="LOW">Baja</option>
              <option value="MEDIUM">Media</option>
              <option value="HIGH">Alta</option>
            </BootstrapForm.Select>
            <BootstrapForm.Control.Feedback type="invalid">
              {errors.priority}
            </BootstrapForm.Control.Feedback>
          </BootstrapForm.Group>

          <Button type="submit" variant="primary">
            Crear Incidente
          </Button>
        </Form>
      )}
    </Formik>
  );
};
