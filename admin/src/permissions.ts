import permissions from '../../server/permissions';

export default {
  trigger: [
    { action: permissions.render(permissions.workflows.trigger), subject: null },
  ],
  settings: [
    { action: permissions.render(permissions.settings.access), subject: null },
  ],
};
