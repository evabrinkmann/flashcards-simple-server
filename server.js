const fs = require('fs')
const express = require('express')
const uid = require('uid')
const cors = require('cors')

const { PORT = 3334 } = process.env //npm run server node instanz wird gestartet, infos aus der shell automatisch, extra Infos können übergeben werden: environment variablen, wenn nichts extra angegeben: port 3334


function saveCards(cards, res, output) {
  fs.writeFile('./cards.json', JSON.stringify(cards, null, 2), err => {
    if (err) {
      res.end('Error: could not write file.')
    } else {
      res.json(output)
    }
  })
}

let cards = require('./cards.json')

const app = express() //express nennt sich app, hier wird express erzeugt, Instanz von express
app.use(express.json()) //app.use ist die allgemeine function, guckt funktionen durch, json dateien erkennen und umwandeln, muss man express beibringen, gibt eine Funktion zurück, resultat middleware, bekommt request, macht was damit, gibt es weiter, Datenstream
app.use(cors()) //cross-origin-resource-sharing,über mehrere server etw. teilen, middleware, standardmäßig kann man nicht von andern server daten abrufen, ist für alle möglich
app.listen(3334, () => console.log('Express ready on port 3334'))//callback mitangeben, wenn server fertig ist wird die funktion ausgeführt
//same as: app.listen(PORT) server starten auf dem port, kann man definieren


app.use((req, res, next) => {
  //logik von express, hilfsfunktion
  // req.method === 'GET'
  // && req.path === '/cards'
  // ? res.json(cards)
  // :
  console.log(req.method, req.path)
  res.send('hi')
  //res.status(404).send()
  next() //app.get sind methoden
})

app.get('/cards', (req, res) => {
  //schreibweise express Route, 2 Obj, schicke als response folgende json datei, Arry von cards soll zurück gegeben werden
  res.json(cards)
})

app.get('/cards/:id', (req, res) => {
  //:id wird noch übergeben, Parameter kann irgendwas sein, steht für etwas, et. soll id heißen, wird aus dem req.params rausgeholt
  const { id } = req.params //id wird rausgeholt
  const card = cards.find(card => card.id === id) //find findet die id (user mit card ersetzen)
  res.json(card)
})

app.post('/cards', (req, res) => {
  const card = { ...req.body, id: uid() } //hier wird die id erzeugt, zufällige id, unter req.body findet man die daten, normalerweise vergibt die Datenbank ids, wenn es eine Datenbank gibt
  cards = [...cards, card] //neue Karte im Array cards, variable mit let, sonst keine neue Zuweisung
  saveCards(cards, res, card) //Kartenspeicher, in der json datei speichern, sorgt dafür das response verschickt wird, übergibt card
})

app.patch('/cards/:id', (req, res) => {
  const id = req.params.id
  const index = cards.findIndex(card => card.id === id) //im request body ist die Änderung drin, index herausfinden, da mittels index die karte verändert wird
  cards[index] = { ...cards[index], ...req.body } // Daten werden im Objekt geändert, danach wird das was im body ist, übergeben, das was später steht überschreibt das vorherige
  saveCards(cards, res, cards[index]) //in json wird das aktuelle cards gespeichert
})

app.delete('/cards/:id', (req, res) => {
  const id = req.params.id
  const index = cards.findIndex(card => card.id === id) //ids werden verglichen
  const cardToDelete = cards[index] // karte raussuchen die man löschen möchte
  cards.splice(index, 1) //mit splice karte löschen
  saveCards(cards, res, cardToDelete)
})
