let vetor = []
let addButton = document.getElementById("addButton")
let cancelButton = document.getElementById("cancelButton")
let editButton = document.getElementById("editButton")

let listOfTasks = document.getElementById("listOfTasks")
let titleTask = document.getElementById("titleTask")
let descriptionTask = document.getElementById("descriptionTask")

addButton.addEventListener('click',addTask)
cancelButton.addEventListener("click",cancelEdit)

function addTask () { 
    let obj = {
        title: titleTask.value,
        description: descriptionTask.value,
        checked: false
    }   
    vetor.push(obj)
    listTasks()
    cleanInputs()
}

function listTasks(){
    // Clean all elements from listOfTasks
    listOfTasks.innerHTML = ""

    // Map vetor array to create the list of tasks
    vetor.map((task,ind) => {   

        // Create taskCard div, define a css Class and put into listOfTasks
        let taskCard = document.createElement("div")
        let checkboxDiv = document.createElement("div")
        let unCheckedCheckBox = document.createElement("div")
        let checkedCheckBox = document.createElement("div")
        let titleDiv = document.createElement("div")
        let titleId = document.createElement("p")
        let descriptionDiv = document.createElement("div")
        let descriptionIdP = document.createElement("p")
        let taskButtonsDiv = document.createElement("div")
        let editButton = document.createElement("input")
        let deleteButton = document.createElement("input")
        let selectButton = document.createElement("input")

        taskCard.classList.add(`taskCard`)
        taskCard.id = `taskCard-${ind}`
        checkboxDiv.classList.add("checkboxDiv")
        checkboxDiv.id = `checkboxDiv-${ind}`
        checkboxDiv.addEventListener('click',markCheckBox)

        
        unCheckedCheckBox.classList.add("unCheckedCheckBox")
        unCheckedCheckBox.id = `unCheckedCheckBox-${ind}`

        checkedCheckBox.classList.add("checkedCheckBox")
        checkedCheckBox.id = `checkedCheckBox-${ind}`
        checkedCheckBox.style.display = "none"

        titleDiv.classList.add("titleDiv")
        titleId.id = "titleId"
        descriptionDiv.classList.add("descriptionDiv")
        descriptionIdP.id = "descriptionIdP"
        taskButtonsDiv.classList.add("taskButtonsDiv")
        selectButton.id = "selectButton"
        selectButton.type = "button"
        selectButton.value = "Select"
        selectButton.setAttribute("onclick",`selectTask(${ind})`)
        editButton.id = "editButton"
        editButton.type = "button"
        editButton.value = "Edit"
        deleteButton.id = "deleteButton"
        deleteButton.type = "button"
        deleteButton.value = "Delete"
        deleteButton.setAttribute("onclick",`deleteTask(${ind})`)

        checkboxDiv.appendChild(unCheckedCheckBox)
        checkboxDiv.appendChild(checkedCheckBox)
        taskCard.appendChild(checkboxDiv)
        titleDiv.appendChild(titleId)
        taskCard.appendChild(titleDiv)
        descriptionDiv.appendChild(descriptionIdP)
        taskCard.appendChild(descriptionDiv)
        taskButtonsDiv.appendChild(selectButton)
        taskButtonsDiv.appendChild(deleteButton)
        taskCard.appendChild(taskButtonsDiv)
        listOfTasks.appendChild(taskCard)
        titleId.innerHTML = task.title
        descriptionIdP.innerHTML = task.description

        if(vetor[ind].checked) checkUncheck(ind)
    })
}

function selectTask(id){
    cancelButton.style.display = "block"
    editButton.style.display = "block"
    editButton.setAttribute("onclick",`editTask(${id})`)
    addButton.style.display = "none"
    titleTask.value = vetor[id].title
    descriptionTask.value = vetor[id].description
}

function cancelEdit(){
    editButton.style.display = "none"
    addButton.style.display = "block"
    cancelButton.style.display = "none"
    cleanInputs()
}

function editTask(id){
    vetor[id].title = titleTask.value
    vetor[id].description = descriptionTask.value
    cancelEdit()
    listTasks()
}

function deleteTask(id){
    vetor.splice(id,1)
    listTasks()
}

function cleanInputs(){
    titleTask.value = ""
    descriptionTask.value = ""
}

function markCheckBox(e){
    let id = (e.target.id).split('-')
    id = id[1]
    checkUncheck(id)
    listTasks()
}

function checkUncheck(id){
    let checkedCheckBoxTemp = document.getElementById(`checkedCheckBox-${id}`)
    let taskCardTemp = document.getElementById(`taskCard-${id}`)
    if(checkedCheckBoxTemp.style.display === "none") {
        checkedCheckBoxTemp.style.display = "block"
        taskCardTemp.classList.add("textMarked")
        vetor[id].checked = true
        console.log(vetor)
    }else{
        checkedCheckBoxTemp.style.display = "none"
        taskCardTemp.classList.remove("textMarked")
        vetor[id].checked = false
    }   
}