module.exports = {
  apps : [{
    name: 'app',
    script: 'npm run start',
    args: '',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],
  deploy : {
    production : {
      user : 'node',
      host : '10.10.16.92',
      ref  : 'origin/theme01',
      repo : 'https://github.com/jundat95/streams.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
