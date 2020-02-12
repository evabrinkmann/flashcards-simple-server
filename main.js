const inputId = document.querySelector('[name="id"]')
const inputQuestion = document.querySelector('[name="question"]')
const inputAnswer = document.querySelector('[name="answer"]')
const buttonCreate = document.querySelector('[data-js="create"]')
const buttonRead = document.querySelector('[data-js="read"]')
const buttonUpdate = document.querySelector('[data-js="update"]')
const buttonDelete = document.querySelector('[data-js="delete"]')

buttonRead.addEventListener('click', () => {
  getCards(inputId.value)
})

buttonCreate.addEventListener('click', () => {
  postCard({ question: inputQuestion.value, answer: inputAnswer.value })
  inputAnswer.value = ''
  inputQuestion.value = ''
})

buttonUpdate.addEventListener('click', () => {
  patchCard(inputId.value, {
    question: inputQuestion.value,
    answer: inputAnswer.value,
    id: inputId.value,
  })
})

buttonDelete.addEventListener('click', () => {
  deleteCard(inputId.value)
})

function getCards(id = '') {
  fetchCard({ id })
}
function postCard(data) {
  fetchCard({ data, method: 'POST' })
}
function patchCard(id, data) {
  fetchCard({ id, data, method: 'PATCH' })
}
function deleteCard(id) {
  fetchCard({ id, method: 'DELETE' })
}
function fetchCard({ id = '', method = 'GET', data }) {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }
  fetch('http://localhost:3334/cards/' + id, config)
    .then(res => res.json())
    .then(result => console.log(result))
    .catch(error => console.error(error))
}

// function deleteCard(id) {
//   const config = {
//     method: 'DELETE',
//   }

//   fetch('http://localhost:3334/cards/', +id, config)
//     .then(res => res.json())
//     .then(deleteCard => console.log(deleteCard))
//     .catch(error => console.error(error))
//     .finally(() => console.log('Promise settled'))
// }

// function patchCard(id, data) {
//   //patch erstellen
//   const config = {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   }

//   fetch('http://localhost:3334/cards/', +id, data)
//     .then(res => res.json())
//     .then(editCard => console.log(editCard))
//     .catch(error => console.error(error))
//     .finally(() => console.log('Promise settled'))
// }

// function postCard(data) {
//   //post machen an cards heften
//   const config = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   }

//   fetch('http://localhost:3334/cards/', config)
//     .then(res => res.json())
//     .then(createdCards => console.log(createdCards))
//     .catch(error => console.error(error))
//     .finally(() => console.log('Promise settled'))
// }

// function getCards(id = '') {
//   //returns a promise, fetch automatisch get request
//   fetch('http://localhost:3334/cards/' + id)
//     .catch(error => console.error(error))
//     .then(res => res.json())
//     .then(cards => renderCards(cards)) //function um mit daten weiterzuarbeiten
//     .catch(error => console.error(error))
//     .finally(() => console.log('Promise settled'))
// }

// function renderCards(cards) {
//   //render cards in body
//   console.log(cards)
// }
