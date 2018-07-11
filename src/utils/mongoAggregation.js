export default ({ Meteor }, collection, pipeline, options) =>
  Meteor.wrapAsync(collection.rawCollection().bind(collection))(
    pipeline,
    options
  );
