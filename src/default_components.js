import React from 'react';

const Layout = ({ content }) => <div>{content()}</div>;
const List = ({ docs }) => <pre>{JSON.stringify(docs)}</pre>;
const Create = () => <p>Please specify components.create in adminContext</p>;
const Edit = () => <p>Please specify components.edit in adminContext</p>;
const Preview = ({ doc: { _id } }) => <span>{_id}</span>;
const LookupButton = ({ onClick }) => (
  <button onClick={onClick} type="button">
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13">
      <g fill="none" stroke="#6c6c6c" strokeWidth="2">
        <path d="M11.3 11.7l-4-4" />
        <circle cx="5" cy="5" r="4" />
      </g>
    </svg>
  </button>
);
const Modal = () => (
  <p>Please specify components.modal in adminContext if you want to use lookup feature</p>
);

export default {
  layout: Layout,
  list: List,
  create: Create,
  edit: Edit,
  preview: Preview,
  lookupButton: LookupButton,
  modal: Modal,
};
