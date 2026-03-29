let format = document.querySelector('#format')
let tone = document.querySelector('#tone')
let generateBtn = document.querySelector('#generateBtn')

let palleteList = document.querySelectorAll('.sub-pallete')


generateBtn.addEventListener('click',() => {
    let formatValue = format.value
    let toneValue = tone.value
//  
   palleteList.forEach((pallete) => {
      let color = generateColor(formatValue,toneValue)
    pallete.style.backgroundColor = color
    toneValue === 'light'? pallete.style.color = 'black':pallete.style.color = 'white'
    if(toneValue === 'all') pallete.style.color = 'black'
    pallete.textContent = color
   })

})



function generateColor(formatType,toneType){

     let colorObj = null;
        let color = null;

    if(formatType === 'rgb'){
        if(toneType === 'light'){
        colorObj = light()
        color = `rgb(${colorObj.r},${colorObj.g},${colorObj.b})`
        }else if(toneType === 'dark'){
          colorObj = dark()
        color = `rgb(${colorObj.r},${colorObj.g},${colorObj.b})`
        }else{
             colorObj = all()
        color = `rgb(${colorObj.r},${colorObj.g},${colorObj.b})`
        }
    }else{
         if(toneType === 'light'){
        colorObj = light()
        color = rgb_to_hex(colorObj.r,colorObj.g,colorObj.b)
        }else if(toneType === 'dark'){
          colorObj = dark()
       color = rgb_to_hex(colorObj.r,colorObj.g,colorObj.b)
        }else{
             colorObj = all()
       color = rgb_to_hex(colorObj.r,colorObj.g,colorObj.b)
        }
    }
    return color

}










function light(){
    let r = Math.floor(Math.random()*(255-190) + 190)
    let g = Math.floor(Math.random()*(255-190) + 190)
    let b = Math.floor(Math.random()*(255-190) + 190)
    return {r,g,b}
}

function dark(){
    let r = Math.floor(Math.random()*130)
    let g = Math.floor(Math.random()*130)
    let b = Math.floor(Math.random()*130)
    return {r,g,b}
}

function all(){
    let r = Math.floor(Math.random()*255)
    let g = Math.floor(Math.random()*255)
    let b = Math.floor(Math.random()*255)
    return {r,g,b}
}

function rgb_to_hex(r,g,b){
  let hex = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`
  return hex
}

