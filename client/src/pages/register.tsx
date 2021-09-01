import React from "react";
import { gql, useMutation } from "@apollo/client";
import { Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";

const REGISTER_MUT = gql`
  mutation Register($username: String!, $password: String!) {
    login(options: { username: $username, password: $password }) {
      user {
        id
        username
      }

      errors {
        field
        message
      }
    }
  }
`;

const Register = () => {
  const [registerUser, { loading, error, data }] = useMutation(REGISTER_MUT);

  console.log(data);

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) =>
          registerUser({
            variables: values,
          })
        }
      >
        {() => {
          return (
            <Form>
              <InputField
                name="username"
                placeholder="username"
                label="Username"
              />
              <Box mt={4}>
                <InputField
                  name="password"
                  placeholder="password"
                  label="Password"
                  type="password"
                />
              </Box>
              <Button
                type="submit"
                backgroundColor="teal.400"
                color="white"
                mt={4}
                onSubmit={(values) => console.log(values)}
              >
                Register
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Wrapper>
  );
};

export default Register;
