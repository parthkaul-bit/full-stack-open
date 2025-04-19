import React from "react";
import { useFormik } from "formik";
import { TextField, Button, Typography, Box } from "@mui/material";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";
import AuthStorage from "../utils/authStorage";
import { replace, useNavigate } from "react-router-native";

const initialValues = {
  username: "",
  password: "",
};
const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      console.log("signIn", username, password);
      await signIn({ username, password });
      navigate("/", replace);
    } catch (e) {
      console.log(e);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ mt: 4 }}
    >
      <Typography variant="h5" gutterBottom>
        Sign In
      </Typography>
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        margin="normal"
        value={formik.values.username}
        onChange={formik.handleChange("username")}
      />
      {formik.touched.username && formik.errors.username && (
        <Typography variant="body" style={{ color: "red" }}>
          {formik.errors.username}
        </Typography>
      )}
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={formik.values.password}
        onChange={formik.handleChange("password")}
      />
      {formik.touched.password && formik.errors.password && (
        <Typography variant="body" style={{ color: "red" }}>
          {formik.errors.password}
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={() => formik.handleSubmit()}
        sx={{ mt: 2 }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default SignIn;
