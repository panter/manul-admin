import React from 'react';
import { omit } from 'lodash/fp';

/**
 * Exposes a function taking a component and returning
 * a component wrapper omitting all non-HTML properties provided
 * by hocs/link.js
 */
const LinkWrapper = C => ({ children, ...props }) => {
  const filteredProps = omit(['routeName', 'go', 'context', 'active', 'childActive'], props);
  return (<C {...filteredProps}>{children}</C>);
};

LinkWrapper.displayName = 'LinkWrapper';

export default LinkWrapper;
