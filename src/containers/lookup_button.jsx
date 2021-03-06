import { composeAll } from '@storybook/mantra-core';
import React, { Fragment } from 'react';

import List from './list';
import withDeps from '../hocs/with_deps';
import withLookupButtonProps from '../hocs/with_lookup_button_props';

export default composeAll(withLookupButtonProps(), withDeps())(
  ({
    LookupButton,
    Modal,
    showLookupModal,
    setShowLookupModal,
    onChange,
    value,
    ...props
  }) => (
    <Fragment>
      <Modal
        restoreLastFocus={false}
        autoFocus={false}
        show={showLookupModal}
        onHide={() => setShowLookupModal(false)}
      >
        <List
          {...props}
          isLookup
          onSelect={(...args) => {
            onChange(...args);
            setShowLookupModal(false);
          }}
          selected={value}
        />
      </Modal>
      <LookupButton onClick={() => setShowLookupModal(true)} {...props} />
    </Fragment>
  )
);
