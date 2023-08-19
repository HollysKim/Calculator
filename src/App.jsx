import { useEffect, useState } from 'react'
import './index.css'

function App() {

  const [numbers, setNumbers] = useState(['AC', '%', '/',7,8,9,'X',4,5,6,'-',1,2,3,'+','.',0, '-/+' ,'='])
  const [output, setOutput] = useState('')
  const [numArr, setNumArr] = useState([])
  const [numberClicked, setNumberClicked] = useState(false)
  const [operationClicked, setOperationClicked] = useState(false)
  const [result, setResult] = useState(null)
  const [decimalClicked, setDecimalClicked] = useState(false)
  const [multipleDigitNumber, setMultipleDigitNumber] = useState('')
  
  useEffect(()=> {
    console.log(numArr)
  },[numArr])

  const multipleNums = (btn) => {
    if(multipleDigitNumber.length == 0) {
      console.log('hi')
        let a = numArr[numArr.length-1]
        setMultipleDigitNumber(String(a)+String(btn))
        setOutput(multipleDigitNumber.concat(String(a)+String(btn)))
        numArr.splice(numArr.length-1)
        setNumArr(numArr.concat(Number(multipleDigitNumber.concat(String(a)+String(btn)))))
        setOutput(multipleDigitNumber.concat(String(a)+String(btn)))
    }
    else {
        setMultipleDigitNumber(multipleDigitNumber.concat(String(btn)))
        setOutput(multipleDigitNumber.concat(String(btn)))
        if(!multipleDigitNumber.includes('.')) {
          numArr.splice(numArr.length-1)
        }
        else {
          numArr.splice(numArr.length-1)
        }
        setNumArr(numArr.concat(Number(multipleDigitNumber.concat(String(btn)))))
    }
    setOperationClicked(false)
  }

  const btnClicked = (btn) => {
   if(typeof(btn) === 'number' ) {
    if(numberClicked) {
        multipleNums(btn)
    }
    else {
      setNumberClicked(true)
      setOperationClicked(false)
      setOutput(btn)
      setNumArr(numArr.concat(btn))
    }
   }

   else if((btn == '+' || btn == '-' || btn == 'X' || btn == '/' || btn == '%') && numberClicked && !operationClicked) {
    setNumArr(numArr.concat(btn))
    setOutput(btn)
    setOperationClicked(true)
    setNumberClicked(false)
    setDecimalClicked(false)
    setMultipleDigitNumber('')
   }

   else if(btn == '=') {
    doMath(numArr)
   }

   else if(btn == '-/+' && numberClicked && !operationClicked) {
    let val = numArr.pop()
    val = (Math.round(val*10000)/10000)*-1
    setOutput(val)
    numArr.splice(numArr.length)
    setNumArr(numArr.concat(val))
   }
   else if(btn == 'AC') {
    setNumberClicked(false)
    setNumArr([])
    setResult(null)
    setOutput('')
   }

   else if(btn == '.' && !decimalClicked && !String(output).includes('.')) {
    setDecimalClicked(true)
    let a = numArr[numArr.length-1]
    setMultipleDigitNumber(String(a)+'.')
    setOutput(String(a)+'.')
   }
  }

  useEffect(()=> {
    setOutput(result)
    setMultipleDigitNumber('')
  }, [result])

  const doMath = (numArr) => {
    if(numArr.length <= 1) return numArr
    if(numArr.length >= 3) {
      for(let i = 0; i<numArr.length; i++) {
        if(typeof(numArr[i]) === 'string') {
          let arr = numArr.splice(0, i+2)
          let sum = 0
          if(arr.includes('+')) {
            let op = arr.indexOf('+')
            let newarr = arr.splice(op,1)
            arr.forEach(val => sum += val)
          }
          else if(arr.includes('-')) {
            let op = arr.indexOf('-')
            let newarr = arr.splice(op,1)
            sum = arr[0]-arr[1]
          }
          else if(arr.includes('X')) {
            let op = arr.indexOf('X')
            let newarr = arr.splice(op,1)
            sum = arr[0]*arr[1]
          }
          else if(arr.includes('/')) {
            let op = arr.indexOf('/')
            let newarr = arr.splice(op,1)
            sum = arr[0]/arr[1]
          }
          else if(arr.includes('%')) {
            let op = arr.indexOf('%')
            let newarr = arr.splice(op,1)
            sum = arr[0]%arr[1]
          }
          setResult(Math.round(sum*10000)/10000)
          numArr.unshift(sum)
          doMath(numArr)
        }
        }
      }
    }
  
  return (
    <div className='parent-container'>
      <div className='calculator-container' >
        <div className='output-field'>
          <p>{output}</p>
        </div>
        <div className='calculator-buttons-container'>
          {numbers.map(num => 
            <button id={num} key={num} onClick={()=>btnClicked(num)}>{num}</button>
          )}
        </div>
      </div>
    </div>
  )
}
export default App