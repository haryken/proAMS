/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormGroup } from 'react-bootstrap';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../../../actions/userActions';
import { createToast } from '../../../utils';

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading, error } = useSelector((state) => state.authReducer);

  const [isSubmitted, setIsSubmitted] = useState(false);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (isSubmitted) {
      if (!loading && error) {
        setIsSubmitted(false);
        return createToast(error, 'error');
      }
      if (!loading && !error) {
        setIsSubmitted(false);
        createToast('Welcome back', 'success');
        return history.push('/');
      }
    }
  }, [isSubmitted, loading, error]);

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required().max(255),
    password: Yup.string().required().max(1024),
  });

  const onSubmit = (values) => {
    dispatch(login({ ...values }));
    setIsSubmitted(true);
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ isSubmitting, dirty, isValid }) => (
          <Form className="formContainer" autoComplete="off">
            <FormGroup>
              <label htmlFor="username">Username: </label>
              <ErrorMessage name="username" component="span" className="error-message" />
              <Field
                id="username"
                name="username"
                placeholder="Username"
                className="form-control"
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="password">Password: </label>
              <ErrorMessage name="password" component="span" className="error-message" />
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="form-control"
              />
            </FormGroup>

            <FormGroup className="text-right mb-0">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!((dirty && isValid) || isSubmitting)}
              >
                Login
              </button>
            </FormGroup>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
