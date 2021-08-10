import React from 'react';
import { Container, Dropdown, DropdownButton } from 'react-bootstrap';
import './header.scss';
import { useSelector } from 'react-redux';
import { generateHeaderTitle } from '../../utils';

const Header = () => {
  const { headerTitle } = useSelector((state) => state.headerTitleReducer);
  const { userData } = useSelector((state) => state.authReducer);

  const getUsername = () => userData.user.username;

  const renderUserDropdownButton = () => {
    if (userData) {
      return (
        <div className="header__user">
          <DropdownButton id="dropdown-item-button" title={getUsername()}>
            <Dropdown.ItemText>Hello, {getUsername()}</Dropdown.ItemText>
            {/* <Dropdown.Item as="button">Change Password</Dropdown.Item> */}
            <Dropdown.Item as="button">Logout</Dropdown.Item>
          </DropdownButton>
        </div>
      );
    }

    return <></>;
  };

  return (
    <div id="header">
      <Container>
        <div className="row">
          <div className="header__title">{generateHeaderTitle(headerTitle)}</div>

          {renderUserDropdownButton()}
        </div>
      </Container>
    </div>
  );
};

export default Header;
