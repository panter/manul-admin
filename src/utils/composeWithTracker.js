import { setDefaults } from '@storybook/react-komposer';

const myCompose = setDefaults({
  pure: true,
  withRef: false,
});

/* global Tracker, Meteor */

export default function composeWithTracker(reactiveFn, options) {
  const onPropsChange = (props, onData, context) => {
    if (Meteor.isServer) {
      reactiveFn(props, onData, context);
      return () => null
    }
    let trackerCleanup;
    const handler = Tracker.nonreactive(() =>
      Tracker.autorun(() => {
        trackerCleanup = reactiveFn(props, onData, context);
      })
    );

    return () => {
      if (typeof trackerCleanup === 'function') {
        trackerCleanup();
      }
      return handler.stop();
    };

  };

  return myCompose(
    onPropsChange,
    options
  );
}