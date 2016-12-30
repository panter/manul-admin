# manul-admin

Admin-Solution for mantra apps.

## Features and Design goals

Provides routes and simple methods to manipulate meteor-collections.

It by design does not provide a full admin-ui but helps to to create one easily.

Every app has a different ui, some use bootstrap, some semantic-ui, others roll their own
ui-kit, ...

Because meteor bundles everything in one bundle at the moment
(incremental loading will probably land in meteor 1.4.3),
every additional ui-kit will bloat your bundle.
So you either have to create a second admin-app or use everything you might already
have (buttons, forms, app-layout) and use it to create an admin interface
into your app.

This is where you can use manul-admin.

**under development, issues, feedback and PRs welcome!**


## Setup

This package provides a client and a server that have both to be set up.

Both share a common adminConfig. The client is additionaly configured with an adminContext
that has to be attached to the mantra-context.

This makes it slightly more complex to setup but allows more flexibility.

### dependencies

make sure you have the following meteor-packages installed:

`mdg:validated-method, aldeed:simple-schema, tmeasday:publish-counts, kadira:flow-router`


### adminConfig

*place this in a common directory*

```

import * as Collections from '/lib/collections';
import { Roles } from 'meteor/alanning:roles';

import React from 'react';

export default {
  // define allowRules. If any rule returns true, any crud-operation is allowed
  // this implementation is very basic atm.
  allowRules: [
    userId => Roles.userIsInRole(userId, 'admin'),
  ],
  collections: {
    // define any collection that should have an admin-interface
    companies: {
      // define the collection (mandatory)
      collection: Collections.Companies,
      // customize allow rules
      allowRules: [
        userId => Roles.userIsInRole(userId, 'companies-admin'),
      ],
      // all additional properties are passed to every admin-component (edit, update, list)
      // E.g. the columns-property is for https://github.com/meteor-utilities/Meteor-Griddle
      title: 'Companies',
      columns: ['name', 'address', 'zipCode', 'city'],
      getPreviewLabel: company => `${company.name}, ${company.canton}`,
    },
    users: {
      collection: Collections.Users,
      title: 'Users',
      columns: ['emails.0.address', 'profile.firstname', 'profile.lastname', 'createdAt', 'companyId'],
      columnMetadata: [
        {
          columnName: 'createdAt',
          customComponent: ({ data }) => <span>{moment(data).format('DD.MM.YYYY HH:mm')}</span>,
        },
        {
          columnName: 'companyId',
          customComponent: ({ data }) => <Preview collectionName="companies" _id={data} />,
        },
      ],
    },
    //...
  },
};


```

### init server

In your server/main.js

```

import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { initAdminServer } from '@panter/manul-admin';

// we have to inject meteor-depencencies atm.
initAdminServer({ Meteor, ValidatedMethod, SimpleSchema, Counts }, adminConfig);

```

### init client mantra adminModule

in you main.js on the client initialize the mantra-admin-module:

```
import { adminModule } from '@panter/manul-admin';

// ...
app.use(adminModule);

```

This will create routes and actions for every collection.

### define client adminContext

The adminContext has to be attached to mantra's context and will contain everything
that needed for the client.

Every container/component will pick up definitions from here like
which component to render and how to navigate between the different components.

In your context.js add adminContext by using `createAdminContext`:


```

import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { FlowRouter } from 'meteor/kadira:flow-router';

// ...

context.adminContext =  createAdminContext({
  // needed
  Meteor,
  ValidatedMethod,
  SimpleSchema,
  Counts,

   // your shared admin config with every collection
  config: adminConfig,

  // provide a FlowRouter-group. Every admin-route will be prefixed with this
  adminRoutes: FlowRouter.group({
    prefix: '/admin',
    name: 'admin'
  }),

  // provide a function to navigate between routes.
  gotoRoute: (route) => FlowRouter.go(route), // or use manulRouter.go

  // you can also provide some functions to show errors and success messages
  // we might change this in future versions and allow to specify mantra-actions
  showError = error => window.alert(`an error occured: ${error.reason || error.message}`),
  showSuccess = message => window.alert(message),

  // component definition, see next section
  components: components,
});

```

#### Components definition

Because manu-admin does not provide an ui,
you have to provide it for it.

But no worries, manul-admin provides everything you need.

In your adminContext, you can define
components for create, list, edit:

```

const components = {
  layout: AdminLayout,
  create: AdminCreate,
  list: AdminList,
  preview: AdminPreview,
  // you can also define collection-specific components
  edit: {
    pages: PagesEdit,
    users: UsersEdit,
    companies: CompaniesEdit,
    default: AdminEdit, // will be used for every other collection
  },
};

context.adminContext = createAdminContext({
  components,
  //...
});

```

### layout

`layout` should be a component that receives a function `content`.
It will wrap all admin-components.

```

const AdminLayout = ({content}) => (
  <div>
    <h1>Admin</h1>
    <div>{content()}</div>
  </div>
)
```

### CRUD components

Every component will receive the following props:

- `collection`
- `collectionName`
- `schema`: either `adminConfig[collectionName].schema` if defined, or collection.simpleSchema() if available
- `publications`: an object with `list`, `edit`, `counts` keys with the names of the publications where you can subscribe to
- every property that is defined for this collection in the adminConfig

also every component will receive the following actions:

- `gotoCreate(collectionName)`, `gotoEdit(collectionName, documentId)`, `gotoList(collectionName)`: call these actions to jump to the corresponding route (pass _id to `gotoEdit`)
- `create(collectionName, doc)`: create a document
- `update(collectionName, newProps)`: update a document
- `destroy(collectionName, _id)`: delete a document


**create**

This will receive all properties above. Use it
to show a create-form or similar.
We highly recommend to use https://github.com/vazco/uniforms/ for this:

```
import AutoForm from 'uniforms-bootstrap4/AutoForm';

const AdminCreate = ({create, gotoList, collectionName, doc}) => (
(
  <div>
    <h1>Create {collectionName}</h1>
    <AutoForm schema={schema} onSubmit={doc => create(collectionName, doc)} />
    <button onClick={() => gotoList(collectionName)}>Back to list</button>
  </div>
)
```

**update**

This will receive all properties and additionally the following:

- `docId`: the document._id
- `doc`: the document to edit
- `docLoaded`: is true when the document has been loaded

example:

```
import AutoForm from 'uniforms-bootstrap4/AutoForm';

const AdminEdit = ({update, collectionName, doc}) => (
(
  <div>
    <AutoForm model={doc} schema={schema} onSubmit={doc => update(collectionName, doc)} />
  </div>
)
```

**list**

The list-component does not receive additional properties at the moment.
In future versions we might inject the list of documents.

You have to do this yourself at the moment, but you can use
https://github.com/meteor-utilities/Meteor-Griddle

This makes it simple to implement a list-component:

```
// remember: you can define additional properties for every collection in your adminConfig.
// you can use this to define individual columns and columnMetadata for each collection
const AdminList = ({gotoEdit, collectionName, publications, columns, columnMetadata}) => (
(
  <div>
    <MeteorGriddle
      columns={columns}
      columnMetadata={columnMetadata}
      publication={publications.list}
      collection={collection}
      matchingResultsCount={publications.counts}
      onRowClick={event => gotoEdit(collectionName, event.props.data._id)}
      showFilter
    />
  </div>
)


```

**preview**

This is experimental at the moment.
it has no route yet, but can be used to display a preview of a document
(title, logo, you name it)

It receives the same properties as `edit`.


### Use components standalone

You can use every list-, create-, edit- and preview-component everywhere
you need:


```

import { Edit, List, Create, Preview } from '@panter/manul-admin/dist/containers';

<Preview
  params={{ _id: userId }}
  collectionName="users"
/>


<Edit
  params={{ _id: userId }}
  collectionName="users"
/>

<List
  collectionName="users"
/>

<Create
  collectionName="users"
/>

```
