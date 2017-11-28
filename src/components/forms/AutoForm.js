import AutoForm from 'uniforms-bootstrap4/AutoForm';

import ValidatedQuickForm from './ValidatedQuickForm';

const Auto = parent => class extends AutoForm.Auto(parent) {
  static Auto = Auto;

  getChildContext() {
    const uniformsContext = super.getChildContext();
    return {
      uniforms: {
        ...uniformsContext.uniforms,
        action: this.props.action,
      },
    };
  }
};

export default Auto(ValidatedQuickForm);
