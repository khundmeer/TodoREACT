# Glassmorphism style to-do list with drag and drop
![todolist](https://user-images.githubusercontent.com/118204748/228327496-448934f4-d325-4e24-a60e-59eba98bc3ab.png)

### [CLICK HERE TO TEST!](https://natansalgado.github.io/todo-list/)

## New item addition
![new item](https://user-images.githubusercontent.com/118204748/228307092-9e67964e-8e54-442a-bee2-4afd563ac6a7.gif)

## Drag and drop system
![drag and drop](https://user-images.githubusercontent.com/118204748/228309063-b3b9f7ca-d411-43a6-ab2d-333ca8e15c53.gif)

## Edit item system
![edit item](https://user-images.githubusercontent.com/118204748/228309337-86888256-6540-497c-90a5-294769f53916.gif)

## Delete item system
![delete item](https://user-images.githubusercontent.com/118204748/228309526-0ca75554-c6a8-4cc1-b23b-5e71d8c94211.gif)

## Color theme change
![color theme](https://user-images.githubusercontent.com/118204748/228309843-fc4dee9d-c534-42f5-a8d6-46f66dbad8aa.gif)

## Responsive
![responsive](https://user-images.githubusercontent.com/118204748/228314186-2de0e901-af7c-401a-8114-83a6b25b8eba.gif)

## Technologies used
`react`
`vite`
`typescript`
`html`
`react-redux`
`react-beautiful-dnd`
`react-icons`
`styled-components`
`git & github`





#LOGIC STORE

let sss = {"lists":[{"title":"todo","items":[{"id":"08a9UZQy","content":"First Task"}]},{"title":"doing","items":[]},{"title":"done","items":[]}]}


var defaultobj = {"lists":[{"title":"todo","items":[]},{"title":"doing","items":[]},{"title":"done","items":[]}]}

console.log(defaultobj)


let newList = [];
var respo = [
  {
    "id": "642f06b1c52a69899f9c7607",
    "title": "Donate New Clothes",
    "description": "Go to the army store.",
    "status": "todo",
    "list_index": 0
  },
  {
    "id": "642f0706c52a69899f9c7608",
    "title": "Drive to the local store and get eggs",
    "description": "Only spend $10.",
    "status": "doing",
    "list_index": 1
  }
]
let statarray = ["todo","doing","done" ]
statarray.map((status)=>{
   let obj = defaultobj.lists.filter(x=> x.title == status) 
   
   let array = [];
   let respResult = respo.filter(resp=> resp.status == status )
   array = respResult.map((todo)=>{
       return {id:todo.id, content:todo.description, title:todo.title }
   })
  
  
   obj = {...obj[0],items:array }
   newList.push(obj)
  
})

console.log(newList)

