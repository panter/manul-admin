import React from 'react';
import { T } from '@panter/manul-i18n';
import AutoForm from './forms/AutoForm';
import Button from './button';

const DocumentEdit = ({ doc, collectionName, schema, title, destroy, gotoList, upsert }) => {
  const formActions = (
    <div>
      <T _id="admin.back-to-list">
        {alt => (
          <Button onClick={() => gotoList(collectionName)}>{alt}</Button>
        )}
      </T>
      <T _id="admin.destroy">
        {alt => (
          <Button color="danger" onClick={() => destroy(collectionName, doc._id)}>{alt}</Button>
        )}
      </T>
    </div>
  );

  return (
    <div>
      <h2>Edit {title}</h2>
      <AutoForm
        model={doc}
        schema={schema}
        onSubmit={changedDoc => upsert(collectionName, changedDoc)}
        additionalActions={formActions}
      />
    </div>
  );
};

DocumentEdit.propTypes = {
};

DocumentEdit.defaultProps = {
};

DocumentEdit.displayName = 'DocumentEdit';

export default DocumentEdit;
