# Calcutta Auction

This is the react.js front end for a calcutta auction manager. The auction rules and app instructions are [here](https://calcutta-backend.herokuapp.com/). The app allows you to easily create a pool, invite other users to you pool. Host the auction and track everyone's bids and winnings through out the tournament.

It manages the data by making API calls via SuperAgent to a Ruby Sinatra backend. [Backend Repo](https://github.com/anthonyjlower/calcutta-api).

The bidding and auction is managed using Socket.io that is run on Express.js servers, [Socket Repo](https://github.com/anthonyjlower/calcutta-socket-exp).


## Installation
After cloning the repo simply run `npm install` to and then `npm start` and you should be set

## Future Additions
• Currently the app only supports Men's College Basketball Tournament, in the future we would like to be able to handle other tournaments as well
• More data analytics showing trends in auctions
• Expanded chat functionality 