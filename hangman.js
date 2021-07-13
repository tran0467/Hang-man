const net = require("net");
const readline = require("readline");

const client = new net.Socket();
let wordToGuess = "crocodile";

let currentWord = "";
const letterSlot = (letter, guesses) => {
  if (guesses.includes(letter)){
    return letter;
  }
  else
  {
    return "-";
  }

}
const letterSlots = (word, guesses)=>{
  let slots = word.split('').map(letter => letterSlot(letter, guesses));
  console.log(slots);
  
  return slots.join('');
}

require("net")
.createServer((s) => {
  s.on('listen', (data) => {
    console.log('User is connect');
    s.write('Connected');
  });
  s.on("data", (buffer) =>{
    
    if (currentWord == ""){
    currentWord = letterSlots(wordToGuess, buffer);
    }
    else{
      let temp = letterSlots(wordToGuess, buffer)
       var i;
       
       for (i = 0; i < wordToGuess.length; i++){
         if (currentWord[i] != temp[i] && temp[i] != '-'){
          let st = currentWord.split('');
          st[i] = temp[i];
          currentWord = st.join('');
         // currentWord[i] = temp[i];
         }
       }
    }

    //let results = new Array();
    s.write("Word: " + currentWord);
    s.write("\n");
    s.write("Your guess?")
    s.write("\n");
  });
  s.on('error', function(ex){
      console.log(ex);
  })
})
.listen(54321, () => {
    
    console.log('Server is running');
});
client.connect(54321, process.argv[2], () => {
  console.log("Connected to server");
  client.read();
});
client.on("data", (data) => {
  client.write(`${data}`);
  console.log(data.toString("utf-8"));
});

const rl = readline.createInterface({ input: process.stdin });
rl.prompt();
rl.on("line", (line) => {

   client.write(`${line}\n`);
  
});
rl.on("close", () => {
  client.end();
});
 

