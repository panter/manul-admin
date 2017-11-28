import React from 'react';
import { Col } from 'reactstrap';

export default C => (props) => {
  const { xs = 12, sm, md, lg, ...cProps } = props;
  return (
    <Col xs={xs} sm={sm} md={md} lg={lg}>
      <C {...cProps}>{props.children}</C>
    </Col>
  );
};
