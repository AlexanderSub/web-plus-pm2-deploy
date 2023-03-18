require('dotenv').config();
require('dotenv').config({ path: '.env.deploy' });

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_REF = 'origin/master',
  DEPLOY_REPO,
  DEPLOY_PATH,
} = process.env;

module.exports = {
  apps: [{
    name: 'mesto-project',
    script: './app.js',
  }],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      'pre-deploy-local': `scp ./.env* ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/backend`,
      'post-deploy': 'cd ~/web-plus-pm2-deploy/backend/ && npm i && npm run build && pm2 restart ecosystem.config.js',
    },
  },
};
