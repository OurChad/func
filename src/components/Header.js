import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import styled from 'styled-components';

const StyledHeader = styled.header`
  background: var(--primary-color);
  margin-bottom: 1.5rem;
`;

const HeaderContentContainer = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.5rem 1rem;
`;

const AppName = styled.h1`
  margin: 0;
`;

const StyledLink = styled(Link)`
  color: var(--primary-light);
  text-decoration: none;
`;

const Header = ({ siteTitle }) => (
  <StyledHeader>
    <HeaderContentContainer>
      <AppName>
        <StyledLink to="/">
          {siteTitle}
        </StyledLink>
      </AppName>
    </HeaderContentContainer>
  </StyledHeader>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
