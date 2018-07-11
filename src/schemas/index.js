import SimpleSchema from 'simpl-schema';

/* eslint import/prefer-default-export: 0*/

export const ListSchema = new SimpleSchema({
  filter: {
    type: Object,
    optional: true,
    blackbox: true
  },
  searchTerm: {
    type: String,
    optional: true
  },
  sortProperties: {
    type: Array,
    optional: true
  },
  'sortProperties.$': {
    type: Object,
    optional: true,
    blackbox: true
  },
  pageProperties: {
    type: Object,
    optional: true,
    blackbox: true
  }
});
