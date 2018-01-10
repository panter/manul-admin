import { setDefaults } from '@storybook/react-komposer';

const myCompose = setDefaults({ withRef: false });

export default function composeWithTracker(reactiveFn, L, E, options) {
  const onPropsChange = (props, onData, context) => {
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

  return myCompose(onPropsChange, L, E, options);
}
