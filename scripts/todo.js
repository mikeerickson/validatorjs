#!/usr/bin/env node
/*eslint no-console: "off"*/

const { spawnSync } = require('child_process');

spawnSync(
  'leasot',
  [
    '-x',
    './**/*.{ts,js,vue,php,scss}',
    '--ignore',
    './node_modules,./vendor,./public/js',
    '--tags',
    'review',
    '--inline-files'
  ],
  {
    stdio: 'inherit'
  }
);
