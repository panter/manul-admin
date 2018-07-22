export default ({ Meteor }, collection, pipeline, options) => {
  const coll = collection.rawCollection();
  return Meteor.wrapAsync(coll.aggregate.bind(coll))(pipeline, options);
};

export const cursorToArray = ({ Meteor }, cursorOrArray) => {
  if (!cursorOrArray || !cursorOrArray.toArray) {
    return cursorOrArray;
  }
 
  return Meteor.wrapAsync(cursorOrArray.toArray.bind(cursorOrArray))();
  
};
