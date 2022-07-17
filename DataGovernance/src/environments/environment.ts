// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // api_base_url: 'http://localhost:49181/dev/voyager/datagov/',
  api_base_url: 'https://api.mvhdg-dev.marsvh.com/dev/voyager/datagov/',
  limit: 100,
  offset: null,
  entityType: 'azure_datalake_gen2_service',
  secret_key: '12345',
  oktaconfig: {
    // issuer: 'https://dev-69384445.okta.com/oauth2/default',
    // clientId: '0oa4jp4vj1nGKQtw45d7',
    issuer: 'https://mars-group.okta.com/oauth2/default',
    // clientId: '0oahhxwchpLmGzP06357', // old client Id Karthik shared
    clientId: '0oailmyuf7rtG0loe357', // client Id Tony shared
    redirectUri: window.location.origin + '/callback',
  },

  dbpath:
    '/azure_storage_account#mvhvoyagerdatastoretest.core.windows.net/azure_datalake_gen2_service#mvhvoyagerdatastoretest.dfs.core.windows.net/azure_datalake_gen2_filesystem#databases',
  resources: [
    {
      image: '../../assets/blob.png',
      name: 'Azure Blob Storage',
      items: 14,
      isDisabled: true,
    },
    {
      image: '../../assets/blob-2.png',
      name: 'Azure Cosmos DB',
      items: 1,
      isDisabled: true,
    },
    {
      image: '../../assets/blob-3.png',
      name: 'Azure Data Lake Storage Gen2',
      items: 0,
      isDisabled: false,
    },
    {
      image: '../../assets/blob-4.png',
      name: 'Azure SQL Database',
      items: 16,
      isDisabled: true,
    },
    {
      image: '../../assets/blob-5.png',
      name: 'Azure SQL Managed instance',
      items: 1,
      isDisabled: true,
    },
    {
      image: '../../assets/blob-4.png',
      name: 'Azure SQL Server',
      items: 15,
      isDisabled: true,
    },
    {
      image: '../../assets/blob-6.png',
      name: 'Azure Storage Account',
      items: 14,
      isDisabled: true,
    },
    {
      image: '../../assets/blob-7.png',
      name: 'Power Bi',
      items: 188,
      isDisabled: true,
    },
  ],
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
