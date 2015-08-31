var helloWorld = function() {
  console.log('Hello World ' + new Date());
}

// NOTE: The Transactions collection is accessible on the client and server
Transactions = new Mongo.Collection('transactions')

if (Meteor.isClient) {
  helloWorld();

  Template.transactions.helpers({
    transactions: function () {
      return Transactions.find();
    }
  });

  Template.registerHelper('formatTime', function(context, options) {
    return moment(context).format('MM/DD/YYYY HH:mm');
  });
}

if (Meteor.isServer) {
  helloWorld();

  // NOTE: Seed transactions when collection is empty
  if (Transactions.find().count() == 0) {
    [
      { date: new Date(2015, 7, 10, 10), payee: 'Bob', amount: 100 },
      { date: new Date(2015, 7, 15, 12), payee: 'Bob', amount: -50 },
      { date: new Date(2015, 7, 15, 12), payee: 'Bob', amount: -50 },
      { date: new Date(2015, 8, 2, 16), payee: 'Alice', amount: 500 }
    ].forEach(function (transaction) {
      Transactions.insert(transaction)
    });
  }
}
