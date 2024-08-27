import { useState } from 'react'
import Form from './component/Form'
import Result from './component/Result'


function App() {  const [totalPayment, setTotalPayment] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [formSubmit, setFormSubmit] = useState(false);

  return (
    <div className='w-full lg:w-4/6  bg-slate-50 rounded-xl flex flex-col sm:flex-row sm:justify-center sm:items-center '>
    <Form setTotalPayment={setTotalPayment} setMonthlyPayment={setMonthlyPayment} setTotalInterest={setTotalInterest} setFormSubmit={setFormSubmit} />
    
    <Result totalPayment={totalPayment} monthlyPayment={monthlyPayment} totalInterest={totalInterest} formSubmit={formSubmit}/>
    </div>
  )
}

export default App
