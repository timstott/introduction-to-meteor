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
});

Meteor.subscribe('transactions');

