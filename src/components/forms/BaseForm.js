import BaseForm from 'uniforms-bootstrap4/BaseForm';
import React from 'react';
import { Row } from 'reactstrap';

export default class ManulAdminBaseForm extends BaseForm {
  static ManulAdminBaseForm = ManulAdminBaseForm;
  static displayName = `ManulAdminBaseForm${BaseForm.displayName}`;

  render() {
    const { props, children } = this.getNativeFormProps();
    return (
      <form {...props} className={'Remo'}>
        <Row>
          {children}
        </Row>
      </form>
    );
  }
}
