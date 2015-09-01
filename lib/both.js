helloWorld = function() {
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

