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

Meteor.publish('transactions', function () {
  // NOTE: Fields can be selected based on user privilleges
  return Transactions.find({}, { fields: { date: 1, payee: 1, amount: 1 } });
});


var isOwner = function (userId, doc) {
  // NOTE: In this workshop we omit user management therefore doc.userId will
  // always be null. Meteor makes it trivial to add user management
  // (see Meteor/Accounts)
  return userId && userId == doc.userId;
}

Transactions.allow({
  insert: function(userId, doc) {
    return !!userId;
  },
  update: isOwner,
  remove: isOwner
});
