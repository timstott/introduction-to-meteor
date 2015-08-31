var helloWorld = function() {
  console.log('Hello World ' + new Date());
}

// NOTE: The Transactions collection is accessible on the client and server
Transactions = new Mongo.Collection('transactions')

Meteor.methods({
  'transactions/duplicate': function (transactionId) {
    check(transactionId, String);
    transaction = Transactions.findOne(transactionId);
    if (!transaction) {
      throw new Meteor.Error('document-not-found', 'Document not found.')
    } else {
      Transactions.update({ _id: transactionId },
                          { $set: { duplicate: !transaction.duplicate } })
    }
  }
});

if (Meteor.isClient) {
  helloWorld();

  Template.transactions.helpers({
    transactions: function () {
      return Transactions.find();
    },
    isDuplicate: function() {
      return this.duplicate ? 'duplicate' : '';
    }
  });

  Template.registerHelper('formatTime', function(context, options) {
    return moment(context).format('MM/DD/YYYY HH:mm');
  });

  Template.transactions.events({
    'click a.duplicate': function (event) {
      // NOTE: Helpers receive the current template context data in `this`
      var transactionId = this._id;

      // NOTE: Meteor method is executed on the client and server (latency compensation).
      Meteor.call('transactions/duplicate', transactionId, function(err) {
        if (err)
          alert(error.message)
      });
      event.preventDefault();
    }
  })
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
