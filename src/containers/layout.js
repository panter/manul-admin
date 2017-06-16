import { useDeps, composeAll, composeWithTracker } from 'mantra-core';
import { get } from 'lodash/fp';
import fromContext from '../hocs/component_from_context_or';
import AdminLayout from '../components/admin_layout';
import restrictToRoles from '../hocs/restrict_to_roles';
import NotAllowed from '../components/not_allowed';

export const composer = ({ context }, onData) => {
  onData(null, {});
};

/**
 * Returns the main layout defined in the admin context.
 * Returns false if not defined.
 * @param {} context
 */
export const mainLayoutMapper = context =>
  get('adminContext.components.views.MainLayout'.split('.'), context);

/**
 * NotAllowed wrapper providing a main layout reference.
 */
const NotAllowedWrapper = useDeps(context => ({
  MainLayout: mainLayoutMapper(context),
}))(NotAllowed);

export const depsMapper = context => ({
  context: () => context,
  MainLayout: mainLayoutMapper(context),
  adminConfig: context.adminContext.config,
});

export default composeAll(
  composeWithTracker(composer),
  restrictToRoles('admin', NotAllowedWrapper),
  useDeps(depsMapper),
)(fromContext('views.layout', AdminLayout));
