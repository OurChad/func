import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import styled from 'styled-components';

const StyledLink = styled(GatsbyLink)`
    color: var(--primary-color);
    text-decoration: none;
`;

export default function Link({ children, to }) {
  return (
    <StyledLink to={to}>
      {children}
    </StyledLink>
  );
}
