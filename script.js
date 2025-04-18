let users = JSON.parse(localStorage.getItem("users")) || []

let tbody = document.querySelector("tbody")
let nameInput = document.querySelectorAll("input")[0]
let ageInput = document.querySelectorAll("input")[1]
let addBtn = document.querySelector(".add_btn")

function save() {
  localStorage.setItem("users", JSON.stringify(users))
}

function render() {
  tbody.innerHTML = ""
  users.forEach((el, i) => {
    let tr = document.createElement("tr")
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${el.name}</td>
      <td>${new Date().getFullYear() - el.age}</td>
      <td>
        <button class="del" data-id="${i}">delete</button>
        <button class="edit" data-id="${i}">edit</button>
      </td>
    `
    tbody.append(tr)
  })
  save()
}

addBtn.onclick = (e) => {
  e.preventDefault()
  let name = nameInput.value.trim()
  let age = +ageInput.value.trim()
  if (name && age) {
    users.push({ name, age })
    nameInput.value = ""
    ageInput.value = ""
    render()
  }
}

tbody.onclick = (e) => {
  let id = e.target.dataset.id
  if (e.target.className === "del") {
    users.splice(id, 1)
    render()
  } else if (e.target.className === "edit") {
    openModal(id)
  }
}

let modal = document.createElement("div")
modal.className = "modal"
modal.innerHTML = `
  <div class="modal-content">
    <input id="modalName" placeholder="Имя">
    <input id="modalAge" placeholder="Возраст">
    <button id="saveEdit">Сохранить</button>
  </div>
`
document.body.append(modal)

function openModal(id) {
  let modalName = document.getElementById("modalName")
  let modalAge = document.getElementById("modalAge")
  let saveBtn = document.getElementById("saveEdit")

  modal.style.display = "flex"
  modalName.value = users[id].name
  modalAge.value = users[id].age

  saveBtn.onclick = () => {
    users[id].name = modalName.value
    users[id].age = +modalAge.value
    modal.style.display = "none"
    render()
  }
}

window.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = "none"
  }
}

render()
