import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormGroup, FormLabel, Row, Col } from 'react-bootstrap';
import * as Yup from 'yup';
import { differenceInYears, getISODay } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { createUser } from '../../../actions';

const CreateUserForm = () => {
  const initialValues = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: 'Female',
    joinedDate: '',
    userType: 'Staff',
  };
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading, error } = useSelector((state) => state.createUserReducer);
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required()
      .max(255)
      .test('firstName', 'First name do not include spaces!', (value) => {
        if (value) {
          return !value.includes(' ');
        }
        return true;
      }),
    lastName: Yup.string()
      .required()
      .max(255)
      .test('lastName', 'The end of the last name cannot be a space!', (value) => {
        if (value) {
          return !value.slice(-1).includes(' ');
        }
        return true;
      }),
    dateOfBirth: Yup.date()
      .required()
      .test(
        'dateOfBirth',
        'Date of birth must be after current date!',
        (value) => new Date(value) < new Date()
      )
      .test(
        'dateOfBirth',
        'User is under 18. Please select a different date',
        (value) => differenceInYears(new Date(), new Date(value)) >= 18
      ),
    gender: Yup.string().required().max(10),
    joinedDate: Yup.date()
      .required()
      .min(Yup.ref('dateOfBirth'), 'Joined date is not later than Date of Birth.')
      .test(
        'joinedDate',
        'Difference between DOB and joined date should be greater than 18',
        (value, ctx) => {
          const dob = ctx.parent.dateOfBirth;
          return differenceInYears(new Date(value), dob) >= 18;
        }
      )
      .test(
        'joinedDate',
        'Joined date is Saturday or Sunday. Please select a different date',
        (value) => getISODay(new Date(value)) !== 7 && getISODay(new Date(value)) !== 6
      ),
    userType: Yup.string().required().max(20),
  });
  useEffect(() => {
    if (isSubmitted) {
      if (!loading && error) {
        toast.error(error, {
          position: 'bottom-right',
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      if (!loading && !error) {
        setIsSubmitted(false);
        history.push('/users');
      }
    }
  }, [isSubmitted, loading, error]);
  const onSubmit = (values) => {
    dispatch(createUser({ ...values }));
    setIsSubmitted(true);
  };
  const cancel = () => {
    history.push('/users');
  };
  return (
    <>
      <ToastContainer />
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ isSubmitting, dirty, isValid }) => (
          <Form className="formContainer" autoComplete="off">
            <FormGroup as={Row} className="mb-3">
              <FormLabel htmlFor="firstName" column sm="3">
                First Name
              </FormLabel>
              <Col sm="9">
                <Field
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  className="form-control"
                />
                <ErrorMessage name="firstName" component="span" className="error-message" />
              </Col>
            </FormGroup>

            <FormGroup as={Row} className="mb-3">
              <FormLabel htmlFor="lastName" column sm="3">
                Last Name
              </FormLabel>
              <Col sm="9">
                <Field
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  className="form-control"
                />
                <ErrorMessage name="lastName" component="span" className="error-message" />
              </Col>
            </FormGroup>

            <FormGroup as={Row} className="mb-3">
              <FormLabel htmlFor="dateOfBirth" column sm="3">
                Date Of Birth
              </FormLabel>
              <Col sm="9">
                <Field type="date" id="dateOfBirth" name="dateOfBirth" className="form-control" />
                <ErrorMessage name="dateOfBirth" component="span" className="error-message" />
              </Col>
            </FormGroup>

            <FormGroup as={Row} className="mb-3">
              <FormLabel htmlFor="gender" column sm="3" className="mt-1">
                Gender
              </FormLabel>
              <Col sm="9">
                <Row className="mt-2">
                  <div className="form-check">
                    <Field type="radio" id="female-gender" name="gender" value="Female" />
                    <FormLabel htmlFor="female-gender" className="ml-3 mt-1">
                      Female
                    </FormLabel>
                  </div>

                  <div className="form-check">
                    <Field type="radio" id="male-gender" name="gender" value="Male" />
                    <FormLabel htmlFor="male-gender" className="ml-3 mt-1">
                      Male
                    </FormLabel>
                  </div>
                </Row>

                <ErrorMessage name="gender" component="span" className="error-message" />
              </Col>
            </FormGroup>

            <FormGroup as={Row} className="mb-3">
              <FormLabel htmlFor="joinedDate" column sm="3">
                Joined Date
              </FormLabel>
              <Col sm="9">
                <Field type="date" id="joinedDate" name="joinedDate" className="form-control" />
                <ErrorMessage name="joinedDate" component="span" className="error-message" />
              </Col>
            </FormGroup>

            <FormGroup as={Row} className="mb-3">
              <FormLabel htmlFor="userType" column sm="3">
                Type
              </FormLabel>
              <Col sm="9">
                <Field component="select" id="userType" name="userType" className="custom-select">
                  <option value="Admin">Admin</option>
                  <option value="Staff">Staff</option>
                </Field>
                <ErrorMessage name="userType" component="span" className="error-message" />
              </Col>
            </FormGroup>

            <FormGroup className="text-right mb-0">
              <button
                disabled={!((dirty && isValid) || isSubmitting)}
                type="submit"
                className="btn btn-primary"
              >
                Save
              </button>
              <button type="button" onClick={cancel} className="btn btn-light ml-4">
                Cancel
              </button>
            </FormGroup>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateUserForm;
