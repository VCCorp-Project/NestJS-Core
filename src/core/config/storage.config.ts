import * as path from 'node:path';

export default () => ({
  storage_root: {
    local: {
      path: path.join(process.env.PWD || '', 'src/apps/storage'),
    },

    s3: {
      path: '',
    },
  },
});
