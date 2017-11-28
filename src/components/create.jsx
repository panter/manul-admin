import React from 'react';
import { Button } from 'reactstrap';
import AutoForm from './forms/AutoForm';

const Create = ({ collectionName, schema, create, title, gotoList }) => {
  const backToCollectionButton = (
    <Button onClick={() => gotoList(collectionName)}>Back to list</Button>
  );
  return (
    <div >
      <h2>Create {title}</h2>
      <AutoForm
        action={'create'}
        schema={schema}
        onSubmit={doc => create(collectionName, doc)}
        additionalActions={backToCollectionButton}
      />
    </div>
  );
};

Create.propTypes = {

};

Create.defaultProps = {
};

Create.displayName = 'Admin.Create';

export default Create;
