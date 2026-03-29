let form = document.querySelector('.todo-container')
let inputArea = form.querySelector('div')
let input = inputArea.querySelector('div')
 let addBtn = inputArea.querySelector('button')
 let list = form.querySelector('.todo-list')
 let memoryForm = document.querySelector('.memory')
 let clearBtn = memoryForm.querySelector('button')
  let draggedItem = null
let index = Number(localStorage.getItem('index')) || 0

 inputArea.addEventListener('keydown',(e) => {
  if(e.key === 'Enter' && e.shiftKey){
    e.preventDefault()
       document.execCommand("insertHTML", false, "<br><br>");
 
  }if(e.key === 'Enter'){ 
    e.preventDefault()
    let text = input.textContent
    index = index + 1
    createTask(index,text)
    input.textContent = ''
    text = null
  }
})

let order = JSON.parse(localStorage.getItem('order')) || []

if(order.length > 0){
    for(let id of order){
        let idObj = JSON.parse(localStorage.getItem(id))
        if(!idObj) continue
        createTask2(idObj.id,idObj.text)
    }
}

 
    addBtn.addEventListener('click',() => {
        let text = input.textContent
        if(text.trim() === '') return
        index = index + 1
        createTask(index,text)
        input.textContent = ''
        text = null
    })

    clearBtn.addEventListener('click', () => {
        clearAll()
    })

    function createTask(index,text){
        let todoItem = document.createElement('div')
        todoItem.className = 'todo-item'
        let dragBtn = document.createElement('button')
        dragBtn.textContent = '☰'
        dragBtn.className = 'drag-btn'
        let span = document.createElement('span')
        span.id = `id${index}`
        span.textContent = text
        let actionDiv = document.createElement('div')
        actionDiv.className = 'todo-actions'
        let editBtn = document.createElement('button')
        let deleteBtn = document.createElement('button')
        editBtn.className = 'edit-btn'
        deleteBtn.className = 'delete-btn'
        editBtn.setAttribute('type','button')
        deleteBtn.setAttribute('type','button')
        editBtn.textContent = 'Edit'
        deleteBtn.textContent = 'Delete'
        actionDiv.appendChild(editBtn)
        actionDiv.appendChild(deleteBtn)
        todoItem.appendChild(dragBtn)
        todoItem.appendChild(span)
        todoItem.appendChild(actionDiv)
        list.appendChild(todoItem)

        let toDo = {
           id:span.id,
           text
        }
        order.push(`id${index}`)
        localStorage.setItem('order',JSON.stringify(order))
        localStorage.setItem('index',String(index))
        localStorage.setItem(`id${index}`,JSON.stringify(toDo))

        dragBtn.addEventListener('mousedown',() => {
            todoItem.draggable = true
        })
        dragBtn.addEventListener('mouseup',() => {
            todoItem.draggable = false
        })

        todoItem.addEventListener('dragstart',() => {
            draggedItem = todoItem
        })
        todoItem.addEventListener('dragover',(e) => {
            e.preventDefault()
        })
        todoItem.addEventListener('drop',() => {
            if(todoItem !== draggedItem){
                insertAfter(draggedItem,todoItem)
                allignEntries()
            }
        })


    }
    function createTask2(id,text){
        let todoItem = document.createElement('div')
        todoItem.className = 'todo-item'
        let dragBtn = document.createElement('button')
        dragBtn.textContent = '☰'
        dragBtn.className = 'drag-btn'
        let span = document.createElement('span')
        span.id = `${id}`
        span.textContent = text
        let actionDiv = document.createElement('div')
        actionDiv.className = 'todo-actions'
        let editBtn = document.createElement('button')
        let deleteBtn = document.createElement('button')
        editBtn.className = 'edit-btn'
        deleteBtn.className = 'delete-btn'
        editBtn.setAttribute('type','button')
        deleteBtn.setAttribute('type','button')
         editBtn.textContent = 'Edit'
        deleteBtn.textContent = 'Delete'
        actionDiv.appendChild(editBtn)
        actionDiv.appendChild(deleteBtn)
        todoItem.appendChild(dragBtn)
        todoItem.appendChild(span)
        todoItem.appendChild(actionDiv)
        list.appendChild(todoItem)

         dragBtn.addEventListener('mousedown',() => {
            todoItem.draggable = true
        })
        dragBtn.addEventListener('mouseup',() => {
            todoItem.draggable = false
        })

        todoItem.addEventListener('dragstart',() => {
            draggedItem = todoItem
        })
        todoItem.addEventListener('dragover',(e) => {
            e.preventDefault()
        })
        todoItem.addEventListener('drop',() => {
            if(todoItem !== draggedItem){
                insertAfter(draggedItem,todoItem)
                allignEntries()
            }
        })

    }


function insertAfter(childNode,referenceNode){
    referenceNode.parentNode.insertBefore(childNode,referenceNode.nextSibling)
}
function allignEntries(){
    let order = []
    let elements = list.querySelectorAll('.todo-item')
    elements.forEach((item) => {
        let span = item.querySelector('span')
        let id = span.id
        order.push(id)
        span = null
        id = null
    })
    localStorage.setItem('order',JSON.stringify(order))
}

function clearAll(){
   let elements = list.querySelectorAll('.todo-item')
   elements.forEach((item) => {
    let span = item.querySelector('span')
    localStorage.removeItem(`${span.id}`)
    item.remove()
   })
   localStorage.removeItem('order')
   localStorage.removeItem('index')
}





let allowEditing = true
list.addEventListener('click',(e) => {

    if(e.target.classList.contains('delete-btn')){
         let todoItem = e.target.closest('.todo-item')
         let span = todoItem.querySelector('span')
         let id = span.id
         todoItem.remove()
         removeReference(id)
         todoItem = null
         span = null 
         id = null 
    }


    if(!allowEditing) return 
    if(e.target.classList.contains('edit-btn')){
       let todoItem = e.target.closest('.todo-item')
         let span = todoItem.querySelector('span')
         let text = span.textContent
         let id = span.id
         editTask(id,text,todoItem,span)
         todoItem = null
         span = null 
         id = null 
    }
})

function removeReference(id){
   localStorage.removeItem(id)
   allignEntries()
}

function editTask(id,text,item,span){
let todoItem = document.createElement('div')
todoItem.setAttribute('class','edit-container')
let input = document.createElement('div')
input.setAttribute('class','edit-box')
input.setAttribute('contenteditable','true')
input.textContent = text.trim()
let inputBtn = document.createElement('button')
let removeBtn = document.createElement('button')
inputBtn.setAttribute('type','button')
removeBtn.setAttribute('type','button')
inputBtn.setAttribute('class','done-btn')
inputBtn.innerHTML = 'DONE'                                                                                                                                                                                                                                                                                                 
removeBtn.setAttribute('class','remove-btn')
removeBtn.innerHTML = 'REMOVE'                                                                                                                                                                                                                                                                                                 
todoItem.appendChild(input)
todoItem.appendChild(inputBtn)
todoItem.appendChild(removeBtn)

item.appendChild(todoItem)


removeBtn.addEventListener('click',() => {
    todoItem.remove()
    allowEditing = true
    return 
})
inputBtn.addEventListener('click',() => {
    let text = input.textContent.trim()
    if(!text) return 
    allowEditing = true
    span.textContent = text
    let idObj = JSON.parse(localStorage.getItem(id))
    idObj.text = text
    localStorage.setItem(id,JSON.stringify(idObj))
    todoItem.remove()

})

}
