/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { userData } = useSelector((state) => state.authReducer);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!userData) {
          // not logged in so redirect to login page with the return url
          return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
        }

        // authorised so return component
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
