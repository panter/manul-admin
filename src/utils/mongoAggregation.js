export default async (collection, pipeline, options) => {
  const coll = collection.rawCollection();
  return await coll.aggregate(pipeline, options);
};
