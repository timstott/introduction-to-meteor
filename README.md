# Introduction to Meteor

Introduction to Meteor [slides](https://docs.google.com/presentation/d/1rEkZYE6CuxQmnPCdTq8k-9F_wXo2eEHXbuD627buw-Y) supporting material.

## Workshop Requirements

- Clone this repository  
- Install Meteor

```
git clone git@github.com:timstott/introduction-to-meteor.git
curl https://install.meteor.com/ | sh
cd introduction-to-meteor
```

## Missions

The workshop is made up a set of missions. They cover specific Meteor
functionalities. They build on each other to go home with a basic application.

Missions are often under 50LOC and kept as atomic as possible.
Each mission lives on its own branch and is prefixed with `/m\d\d/`.

Begin the first mission with `git checkout m00`

### 00 Everything in order?
- Start the application with the `meteor` command and
browse to *http://localhost:3000*.
- The application is made of 3 files:
  - *bank.css*, css declarations
  - *bank.html*, html templates
  - *bank.js*, application code
- Observe the `helloWorld` function is computed on the server and browser
consoles.

### 01 Database everywhere
- In *bank.js* we create a new collection, seed new records, create
a transactions template to display all transactions.
- Insert a new record server side and observe the changes in the UI.  
Start the Meteor shell with `meteor shell` command
```javascript
Transactions.insert({date: new Date(), payee: 'Eve', amount: 50})
```
- Insert a new record client side and find the record
server side  
```javascript
// Chrome console
Transactions.insert({date: new Date(), payee: 'Eve', amount: -50})
// Copy the id returned from the insert
```  
```javascript
// Meteor shell
Transactions.findOne('idFromInsert')
```

By default Meteor publishes and subscribes to all collections and allows
unsecure document inserts fromt the client.

In this mission we also:
- Defined the `formatTime` Template helper to format dates
- Installed the Moment.js Meteor smart package

### 02 Meteor methods (a.k.a RPC)
- In *bank.js* we define a Meteor method `transactions/duplicate`. It allows to
toggle transactions as duplicates.
- Toogle the duplicate link and observe the changes in the UI.

The duplicate link event helper calls the Meteor method which executes both
on the client and the server. Data on the client can be updated immidiatly and
updated with data from the server when it returns.

## Credits/Resources

- Meteor [Documentation](http://docs.meteor.com/#/full/)
- MeteorHacks [Blog](https://meteorhacks.com/)
- Discover Meteor [Book](https://www.discovermeteor.com/)
- Sacha Greif Introduction to Meteor [Talk](https://www.youtube.com/watch?v=q9pA2xApdY0)
