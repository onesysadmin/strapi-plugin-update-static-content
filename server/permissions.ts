export default {
  render: (uid: string) => `plugin::update-static-content.${uid}`,
  workflows: {
    trigger: 'trigger',
  },
  settings: {
    access: 'settings',
  },
};
