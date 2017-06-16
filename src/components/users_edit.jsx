import { T } from '@panter/manul-i18n';
import React from 'react';
import Button from './button';
import Edit from '../containers/edit';

const UsersEdit = ({
  upgradeToAdmin,
  revokeAdmin,
  isAdmin = false,
  ...props }) => (
    <div >
      <Button
        variant={'danger'}
        black={!isAdmin}
        onClick={() => {
          if (isAdmin) {
            revokeAdmin(props.params._id);
          } else {
            upgradeToAdmin(props.params._id);
          }
        }
        }
      >
        <T>
          {isAdmin ? 'user.admin.actions.revokeAdmin' : 'user.admin.actions.upgradeToAdmin'}
        </T>
      </Button>
      <Edit {...props} />
    </div>
  );

UsersEdit.propTypes = {
};

UsersEdit.defaultProps = {
};

UsersEdit.displayName = 'UsersEdit';

export default UsersEdit;
