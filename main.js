/* 
This is a simple rock paper sicssors written in js and using the Finnish language, to change the language, just translate it, simple.

The code can be copied, modified, you can do whatever you really want with it, it's MIT license.

As always, bye,
- NullByte3
*/

const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let combos = {
  kivi: {
    sakset: 'Pelaaja yksi voitti!',
    paperi: 'Pelaaja kaksi voitti!'
  },
  paperi: {
    kivi: 'Pelaaja yksi voitti!',
    sakset: 'Pelaaja kaksi voitti!'
  },
  sakset: {
    kivi: 'Pelaaja kaksi voitti!',
    paperi: 'Pelaaja yksi voitti!'
  }
}

// Do not use a while loop, this is not Python nor Java, this is JavaScript.
// I used a while loop, it spammed and threw random errors, so this is the best.

function loop () {
  rl.question('Pelaaja yksi: ', one => {
    one = one.toLowerCase()
    rl.question('Pelaaja kaksi: ', two => {
      two = two.toLowerCase()
      if (two == one) {
        console.log('Tasa peli! GG')
      } else if (combos[one] && combos[one][two]) {
        console.log(combos[one][two])
      } else {
        throw new Error('What the hell just happened? Learn to type.')
      }
      loop()
    })
  })
}

loop()
