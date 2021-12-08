const array = [
  [1,2,0,0,7,0,5,6,0],
  [5,0,7,9,3,2,0,8,0],
  [0,0,0,0,0,1,0,0,0],
  [0,1,0,2,4,0,0,5,0],
  [3,0,8,0,0,0,4,0,2],
  [0,7,0,0,8,5,0,1,0],
  [0,0,0,7,0,0,0,0,0],
  [0,8,0,4,2,3,7,0,1],
  [0,3,4,0,1,0,0,2,8]
]

const result = []
for (let i = 0; i < 9; i++) {
  const result2 = []
  for (let j = 0; j < 9; j++) {
    result2.push(array[i][j]);
    document.querySelector(`.row-${i} .col-${j}`).textContent = array[i][j]
  }
  result.push(result2)
}

const play = async function() {

let x = 0
let y = 0
let s = 'searching'
while (s === 'searching') {
  if(array[y][x] !== 0) {
    x++;
  } else {
    result[y][x]++
    document.querySelector(`.row-${y} .col-${x}`).textContent = result[y][x]
    if(result[y][x] > 9) {
      result[y][x] = 0
      document.querySelector(`.row-${y} .col-${x}`).textContent = result[y][x]
      x--
      if(x < 0) {
        x = 8
        y--
      }
    
      if(y < 0) {
        s = 'no solution'
      }
      while(array[y][x] !== 0) {
        x--
        if(x < 0) {
          x = 8
          y--
        }
      
        if(y < 0) {
          s = 'no solution'
        }
      }
    }
    else if(ok(y, x, result[y][x])) {
      x++
    }
  }

  if(x >= 9) {
    x = 0
    y++
  }

  if(y >= 9) {
    s = 'found a solution'
  }
  await sleep(100)
}

document.querySelector('#status').textContent = s
}

function ok(y, x, val) {
  for(let a = 0; a < 9; a++) {
    if(a !== x && result[y][a] === val) return false
  }

  for(let a = 0; a < 9; a++) {
    if(a !== y && result[a][x] === val) return false
  }

  for(let a = Math.floor(y/3)*3; a < Math.floor(y/3)*3 + 3; a++) {
    for(let b = Math.floor(x/3)*3; b < Math.floor(x/3)*3 + 3; b++) {
      if(a !== y && b !== x && result[a][b] === val) return false
    }
  }

  return true
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
 
play()