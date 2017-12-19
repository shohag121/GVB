// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBu9FHGOyOS_V-tHNOo3Ccqjz1oXzZjYfQ',
    authDomain: 'getvirtualbooks.firebaseapp.com',
    databaseURL: 'https://getvirtualbooks.firebaseio.com',
    projectId: 'getvirtualbooks',
    storageBucket: '',
    messagingSenderId: '342334744149'
  },
  aws: {
    awsId: 'AKIAI3O2KXHP66MJJ5IQ',
    awsSecret: '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',
    awsTag: 'coderexpo02-20'
  }

};
