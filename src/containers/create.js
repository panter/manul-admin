import { useDeps, composeAll } from 'mantra-core';
import { withTranslatedSchema } from '@panter/manul-i18n';
import Create from '../components/create';
import fromContext from '../hocs/component_from_context_or';

export const depsMapper = context => ({
  context: () => context,
});

export default composeAll(
  withTranslatedSchema(({ collectionName }) => ({ schema: collectionName })),
  useDeps(depsMapper),
)(fromContext('views.create', Create));
