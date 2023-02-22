let arr = []

let addButton = document.getElementById("addButton")
let cancelButton = document.getElementById("cancelButton")
let editButton = document.getElementById("editButton")

let listOfTasks = document.getElementById("listOfTasks")
let titleTask = document.getElementById("titleTask")
let titleTaskAlert = document.getElementById("titleTaskAlert")
let descriptionTask = document.getElementById("descriptionTask")
let descriptionTaskAlert = document.getElementById("descriptionTaskAlert")


let pendingTasksButton = document.getElementById("pendingTasks")
let completedTasksButton = document.getElementById("completedTasks")
let clearAllButton = document.getElementById("clearAll")
let allTasksButton = document.getElementById("allTasks")

let pTask = document.getElementById('p-task')


addButton.addEventListener('click',addTask)
cancelButton.addEventListener("click",cancelEdit)
pendingTasksButton.addEventListener("click",pendingTasks)
completedTasksButton.addEventListener("click",completedTasks)
clearAllButton.addEventListener("click",clearAll)
allTasksButton.addEventListener("click",allTasks)

getFromLocalStorage()

function addTask () { 
    let verifyInputsResult = verifyInputs()
    if(!verifyInputsResult.status){
        window[verifyInputsResult.input].focus()
        window[verifyInputsResult.input+"Alert"].removeAttribute('hidden')
        return
    }
    titleTaskAlert.setAttribute("hidden","hidden")
    descriptionTaskAlert.setAttribute("hidden","hidden")

    let obj = {
        title: titleTask.value,
        description: descriptionTask.value,
        checked: false
    }   
    arr.push(obj)
    addToLocalStorage(arr)
    listTasks(arr)
    cleanInputs()
}


function listTasks(list){

    // Clean all elements from listOfTasks
    listOfTasks.innerHTML = ""

    if(list.length === 0) {
        pTask.innerHTML = "No tasks to show."
        listOfTasks.appendChild(pTask)
        return
    }   

    // Map arr to create the list of tasks
    list.map((task,ind) => {   

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
        console.log()
        if(task.checked) checkTheBox(ind)
    })
}

function selectTask(id){
    cancelButton.style.display = "block"
    editButton.style.display = "block"
    editButton.setAttribute("onclick",`editTask(${id})`)
    addButton.style.display = "none"
    titleTask.value = arr[id].title
    descriptionTask.value = arr[id].description
}

function cancelEdit(){
    editButton.style.display = "none"
    addButton.style.display = "block"
    cancelButton.style.display = "none"
    cleanInputs()
}

function editTask(id){
    arr[id].title = titleTask.value
    arr[id].description = descriptionTask.value
    cancelEdit()
    addToLocalStorage(arr)
    listTasks(arr)
}

function deleteTask(id){
    arr.splice(id,1)
    addToLocalStorage(arr)
    listTasks(arr)
}

function cleanInputs(){
    titleTask.value = ""
    descriptionTask.value = ""
}

function markCheckBox(e){
    let id = (e.target.id).split('-')
    id = id[1]
    let checkedCheckBoxTemp = document.getElementById(`checkedCheckBox-${id}`)
    let taskCardTemp = document.getElementById(`taskCard-${id}`)

    if(checkedCheckBoxTemp.style.display === "none") {
        checkedCheckBoxTemp.style.display = "block"
        taskCardTemp.classList.add("textMarked")
        arr[id].checked = true
    }else{
        checkedCheckBoxTemp.style.display = "none"
        taskCardTemp.classList.remove("textMarked")
        arr[id].checked = false
    }     
    listTasks(arr)
    addToLocalStorage(arr)
}

function checkTheBox(id){
    let checkedCheckBoxTemp = document.getElementById(`checkedCheckBox-${id}`)
    let taskCardTemp = document.getElementById(`taskCard-${id}`)
    checkedCheckBoxTemp.style.display = "block"
    taskCardTemp.classList.add("textMarked")
}

function pendingTasks(){
    let arrTemp = arr.filter(obj => obj.checked === false)
    listTasks(arrTemp)
}

function completedTasks(){
    let arrTemp = arr.filter(obj => obj.checked === true)
    listTasks(arrTemp)
}

function allTasks(){
    listTasks(arr)
}

function clearAll(){
    arr = []
    addToLocalStorage(arr)
    listTasks(arr)
}

function addToLocalStorage(arr){
    localStorage.setItem('database',JSON.stringify(arr))
}

function verifyLocalStorage(){
    return localStorage.getItem('database') == null ? false : true;
}

function getFromLocalStorage(){
    if(!verifyLocalStorage()){
        return
    }

    arr = JSON.parse(localStorage.getItem('database'))
    listTasks(arr)
}


function verifyInputs(){
    let result = {
        status: true,
        input: "",
        field: ""
    }
    if(titleTask.value == ""){
        return result = {
            status:false,
            field:"Title",
            input: "titleTask"
        }
    }else if(descriptionTask.value == ""){
        return result = {
            status:false,
            field:"Description",
            input: "descriptionTask"
        }
    }
    return result
}