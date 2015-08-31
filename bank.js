var helloWorld = function() {
  console.log('Hello World ' + new Date());
}

if (Meteor.isClient) {
  helloWorld();
}

if (Meteor.isServer) {
  helloWorld();
}
