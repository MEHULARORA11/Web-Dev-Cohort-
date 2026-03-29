let button = document.querySelector('button')
let body = document.body
let h1 = document.querySelector('h1')

let darkMode = false
button.addEventListener('click' ,() => {
   if(darkMode){
       body.style.background = 'black'
       button.style.background = 'white'
       button.style.color = 'black'
       h1.style.color = 'white' 
       darkMode = false
   }else{
    body.style.background = 'white';
    button.style.background = 'black'
    button.style.color = 'white'
    h1.style.color = 'black'
     darkMode = true
   }
})