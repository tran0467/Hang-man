# Hang-man introduction
A simple network programme in JavaScript that listens on port 54321 and implements a simple game.

# Hang-man description
On receiving a connection, the server programme should send back the a simple
hang-man display, with -’s representing letters that still need to be guessed. The word to guessed
will be ‘crocodile’ every time, to keep things simple. Thus it should show the following
when it receives a connection:

Word: ---------

Your guess?

It should read input from the client, and based on that input, progressively populate the word as
letters are guessed.
The game does not need to implement any other logic, just the updating and re-display of the
message.

For example, if the client were to send l, then c, and then o, the server would send the following:

Word: -------l

Your guess?

then,

Word: c--c---l

Your guess?

and then,

Word: c-oco--l

Your guess?

Finally, when all letters have been guessed, it will close the connection. 
It should be runable using a command line line:

node unit2-hangman.js

And should be able to test it with a command like:

nc 127.0.0.1 54321
