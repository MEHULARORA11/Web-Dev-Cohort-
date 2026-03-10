/**
 * 🎨 Holi Color Mixer - Pure Functions
 *
 * Holi ka festival hai! Rang mix karne hain. Lekin PURE FUNCTIONS use
 * karne hain — matlab:
 *   1. Input ko KABHI modify mat karo (no mutation)
 *   2. Same input pe HAMESHA same output aaye
 *   3. Koi side effects nahi (no console.log, no external state changes)
 *
 * Har color object: { name: string, r: number, g: number, b: number }
 *   where r, g, b are 0-255 (RGB values)
 *
 * Functions:
 *
 *   1. mixColors(color1, color2)
 *      - Mix two colors by averaging their RGB values
 *      - New name: `${color1.name}-${color2.name}`
 *      - Round RGB values to integers
 *      - MUST NOT modify color1 or color2
 *      - Agar either color null/invalid, return null
 *
 *   2. adjustBrightness(color, factor)
 *      - Multiply each RGB by factor, clamp to 0-255 range
 *      - Round to integers using Math.round
 *      - Name stays same
 *      - MUST NOT modify original color
 *      - Agar color null or factor not number, return null
 *
 *   3. addToPalette(palette, color)
 *      - Return NEW array with color added at end
 *      - MUST NOT modify original palette array
 *      - Agar palette not array, return [color]
 *      - Agar color null/invalid, return copy of palette
 *
 *   4. removeFromPalette(palette, colorName)
 *      - Return NEW array without the color with that name
 *      - MUST NOT modify original palette
 *      - Agar palette not array, return []
 *
 *   5. mergePalettes(palette1, palette2)
 *      - Merge two palettes into NEW array
 *      - No duplicate names (keep first occurrence)
 *      - MUST NOT modify either original palette
 *      - Agar either not array, treat as empty array
 *
 * Hint: Use spread operator [...arr], Object spread {...obj} to create
 *   copies. NEVER use push, splice, or direct property assignment on inputs.
 *
 * @example
 *   const red = { name: "red", r: 255, g: 0, b: 0 };
 *   const blue = { name: "blue", r: 0, g: 0, b: 255 };
 *   mixColors(red, blue)
 *   // => { name: "red-blue", r: 128, g: 0, b: 128 }
 *   // red and blue objects are UNCHANGED
 */
export function mixColors(color1, color2) {
  // Your code here
  if(!color1 || !color2) return null
  let obj = {}
  obj.name = `${color1.name}-${color2.name}`
  obj.r = Math.round((color1.r + color2.r)/2)
  obj.g = Math.round((color1.g + color2.g)/2)
  obj.b = Math.round((color1.b + color2.b)/2)
  return obj
}

export function adjustBrightness(color, factor) {
  // Your code here
  if(!color || typeof(factor) !== 'number') return null

  let obj = {}
  obj.name = color.name
  let r = color.r*factor
  let g = color.g*factor
  let b = color.b*factor
  if(r>255) r = 255
  if(g>255) g = 255
  if(b>255) b = 255
  if(r<0) r = 0
  if(g<0) g = 0
  if(b<0) b = 0
  obj.r = r
  obj.g = g
  obj.b = b
  return obj
}

export function addToPalette(palette, color) {
  // Your code here
  if(!color) return [...palette]
  if(!Array.isArray(palette)) return [color]
  let arr = [...palette]
  arr.push(color)
  return arr
}

export function removeFromPalette(palette, colorName) {
  // Your code here
  if(!Array.isArray(palette)) return []
  let arr = []
  for(let item of palette){
    if(item.name === colorName) continue
    arr.push(item)
  }
  return arr
}

export function mergePalettes(palette1, palette2) {
  // Your code here
  if(!Array.isArray(palette1)){
    palette1 = []
  }
  if(!Array.isArray(palette2)){
    palette2 = []
  }
  let arr = [...palette1,...palette2]
  let arr2 = []
  for(let item of arr){
    if(arr2.some(item2 => item2.name === item.name)) continue
    arr2.push(item)
  }
  return arr2
  
}
