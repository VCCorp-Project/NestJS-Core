import * as path from 'node:path';

export default () => ({
  storage_root: {
    local: {
      path: path.join(process.env.PWD || '', process.env.STORAGE_ROOT || '/'),
    },

    s3: {
      path: '',
    },
  },
});
