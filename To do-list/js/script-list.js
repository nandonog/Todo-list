const inputText = document.querySelector('#text-input')
const btnList = document.querySelector('#btn-input')
const ulList = document.querySelector('#ul-list')



const createLi = () => {
    const li = document.createElement('li')
    li.setAttribute('class', 'li-list')
    return li;
}
const createList = (textInput) => {
    const li = createLi()
    ulList.appendChild(li)
    li.innerText = textInput
    createBtndelete(li)
    saveTask()
}

const createBtndelete = (li) => {
    const btnDelete = document.createElement('button')
    
    li.btnDelete += ' '
    btnDelete.innerHTML = 'delete'
    btnDelete.setAttribute('class', 'button-list material-symbols-outlined')
    btnDelete.setAttribute('title', 'Apagar Tarefa')
    li.appendChild(btnDelete)

}

const addList = () => {
    createList(inputText.value)
    clearList()
    saveTask()
}

const clearList = () => {
    inputText.focus()
    inputText.value = ''
}

const saveTask = () => {
    const lisTask = ulList.querySelectorAll('li')
    const saveLi = []

    for(listLi of lisTask) {
        let taskText = listLi.innerText;
        taskText = taskText.replace('delete', '').trim()
        saveLi.push(taskText)
    }

    const taskJSON = JSON.stringify(saveLi)
    localStorage.setItem('Task', taskJSON)
}

const addTaskSave = () => {
    const tasks = localStorage.getItem('Task')
    const listOfTask = JSON.parse(tasks)

    for(let task of listOfTask) {
        createList(task)
    }
}
    
    addTaskSave()



btnList.addEventListener('click', () => {
    if(!inputText.value) return;
    addList()
})

document.addEventListener('keypress', (e) => {
    if(e.keyCode === 13) {
        addList()
    }
})

document.addEventListener('click', (e) => {
    const elemento = e.target
    if(elemento.classList.contains('button-list')) {
        elemento.parentElement.remove()
        saveTask()
    }
})