const path = require('path');

const app = require(path.resolve(__dirname, '../server/server'));
const ds = app.datasources.accountDS;
ds.automigrate('Account', function(err) {
  if (err) throw err;

  const accounts = [
    {
      email: 'person@mail.com',
      createdAt: new Date(),
      lastModifiedAt: new Date(),
    },
    {
      email: 'person2@mail.com',
      createdAt: new Date(),
      lastModifiedAt: new Date(),
    },
  ];
  let count = accounts.length;
  accounts.forEach(function(account) {
    app.models.Account.create(account, function(err, model) {
      if (err) throw err;

      console.log('Created:', model);

      count--;
      if (count === 0)
        ds.disconnect();
    });
  });
});
