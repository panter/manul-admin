import { composeAll } from '@storybook/mantra-core';
import React from 'react';

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
    className,
    style,
    ...props
  }) => (
    <span className={className} style={style}>
      <Modal
        restoreLastFocus={false}
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
    </span>
  )
);
