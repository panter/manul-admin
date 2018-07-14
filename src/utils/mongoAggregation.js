export default ({ Meteor }, collection, pipeline, options) => {
  const coll = collection.rawCollection();
  return Meteor.wrapAsync(coll.aggregate.bind(coll))(pipeline, options);
};
