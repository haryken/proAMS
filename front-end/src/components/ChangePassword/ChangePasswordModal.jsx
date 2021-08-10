import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormGroup, Modal, FormLabel } from 'react-bootstrap';
import * as Yup from 'yup';
import { createToast } from '../../utils';

const ChangePasswordModal = ({ isShow }) => {
  const [show, setShow] = useState(isShow || false);

  const handleClose = () => setShow(false);

  const initialValues = {
    password: '',
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string().required().max(1024),
  });

  const onSubmit = (values) => {
    createToast(
      'This feature has yet to be implemented. But you are free to continue. The modal will continue to show whenever you hit the home page'
    );
    setShow(false);
    // eslint-disable-next-line no-console
    console.log(values);
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>This is the first time you login you must change your password to continue</p>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ isSubmitting, dirty, isValid }) => (
            <Form className="formContainer" autoComplete="off">
              <FormGroup>
                <FormLabel htmlFor="password">Password: </FormLabel>
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
                  Change Password
                </button>
              </FormGroup>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default ChangePasswordModal;
