import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [current, setCurrent] = useState('0')
  const [previous, setPrevious] = useState(null)
  const [operator, setOperator] = useState(null)

  const handleNumberClick = (value) => { //(ต่อสตริง)
    if (['+', '-', '*', '/'].includes(current)) { //ตรวจสอบว่า current มี operator หรือไม่ 
      setCurrent(value); //ถ้าไม่มี operator ให้เปลี่ยนค่า current เป็น value
    } else {
      setCurrent(current === '0' ? value : current + value); //ถ้ามี operator ให้เพิ่มค่า current เช่น พิมพ์ 1,2 = "12"
    }
  };

  const handleOperatorClick = (operator) => { //(ตัวดำเนินการ operator)
    if (operator && previous !== null) {
      calculator(); // เรียกใช้เมื่อ มี operator และมีค่าก่อนหน้า
    }
    setOperator(operator); // ตั้งค่าตัวดำเนินการใหม่
    setPrevious(current); // เก็บค่าปัจจุบันเป็นค่าก่อนหน้า
    setCurrent(operator); // เมื่อกดตัวดำเนินการ ให้เปลี่ยนค่า current เป็นตัวดำเนินการ
  };

  const handleClear = () => { //(เคลียร์)
    setCurrent('0');
    setPrevious(null);
    setOperator(null);
  };

  const calculator = () => { //(คํานวณ)
    if (!operator || previous === null) return;
    const currentt = parseFloat(current); // แปลง current เป็นจํานวนจริง
    const prev = parseFloat(previous); // แปลง previous เป็นจํานวนจริง
    let result = 0; // ตัวแปรสําหรับผลลัพธ์

    switch (operator) {
      case '+':
        result = prev + currentt;
        break;
      case '-':
        result = prev - currentt;
        break;
      case '*':
        result = prev * currentt;
        break;
      case '/':
        result = currentt !== 0 ? prev / currentt : 'Error'; // ตรวจสอบหารด้วย 0
        break;
      default:
        break;
    }
    setCurrent(String(result)); // แปลงผลลัพธ์เป็นสตริง
    setPrevious(null); // เคลียร์ค่าก่อนหน้า
    setOperator(null); // เคลียร์ค่าตัวดำเนินการ
  }

  return (
    <>
      <div className="Card">
        <div className='Container'>
          <div className='Header-Text'>
            Calculator
          </div>
          <div className='Display'>
            {current === 'Error' ? 'Error' : current} {/* ถ้า current เป็น 'Error' ให้แสดง 'Error' */}
          </div>

          <div className='btn-cal'> {/* ตัวดำเนินการ ส่งค่าสตริงไปคำนวณ โดยแปลงค่าเป็นตัวเลข และคำนวณ และส่งกลับมาเป็นสตริง*/}
            <button onClick={() => handleNumberClick('1')}>1</button>
            <button onClick={() => handleNumberClick('2')}>2</button>
            <button onClick={() => handleNumberClick('3')}>3</button>
            <button onClick={() => handleOperatorClick('+')}>+</button> 
          </div>

          <div className='btn-cal'>
            <button onClick={() => handleNumberClick('4')}>4</button>
            <button onClick={() => handleNumberClick('5')}>5</button>
            <button onClick={() => handleNumberClick('6')}>6</button>
            <button onClick={() => handleOperatorClick('-')}>-</button> 
          </div>

          <div className='btn-cal'>
            <button onClick={() => handleNumberClick('7')}>7</button>
            <button onClick={() => handleNumberClick('8')}>8</button>
            <button onClick={() => handleNumberClick('9')}>9</button>
            <button onClick={() => handleOperatorClick('*')}>x</button> 
          </div>

          <div className='btn-cal'>
            <button onClick={() => handleClear()}>C</button>
            <button onClick={() => handleNumberClick('0')}>0</button>
            <button onClick={() => calculator()}>=</button>
            <button onClick={() => handleOperatorClick('/')}>/</button> 
          </div>
          
        </div>
       
        
      </div>
    </>
  )
}

export default App
