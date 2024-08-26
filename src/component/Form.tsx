import {  useRef, useState } from "react";
import calcimg from "../assets/icon-calculator.svg";

const inputClass = "bg-white p-3 w-full focus:outline-none";
const labelClass = "text-left text-slate-600 font-normal pt-3";
const radioLabel = "font-bold text-base p-2 cursor-pointer";
const radioInput = "appearance-none cursor-pointer bg-slate-100 rounded-full border border-slate-900 h-4 w-4 text-blue-900 checked:border-slate-50 checked:border-2 checked:bg-yellow-400 checked:ring-2 checked:ring-yellow-400";
const spanClass = "px-4  py-3 text-lg  text-gray-700 cursor-default";
const divClass = "flex items-center p-2 border border-gray-200 hover:border-yellow-300 rounded "
const shortDivClass = "flex items-center border border-black rounded"

type FormProps = {
  setMonthlyPayment: (payment: number) => void;
  setTotalPayment: (payment: number) => void;
  setTotalInterest: (payment: number) => void;
};

type ErrorState = {
  mortgageAmount?: string;
  mortgageTerm?: string;
  interestRate?: string;
  mortgageType?: string;
};

function Form({setMonthlyPayment, setTotalPayment,setTotalInterest}: FormProps) {
  const mortgageAmountRef = useRef<HTMLInputElement>(null);
  const mortgageTermRef = useRef<HTMLInputElement>(null);
  const interestRateRef = useRef<HTMLInputElement>(null);
  const repaymentRef = useRef<HTMLInputElement>(null);
  const interestOnlyRef = useRef<HTMLInputElement>(null);
  const [activeState, setActiveState] = useState("");
  const [error, setError] = useState<ErrorState> ({});
  const [formSubmit, setFormSubmit] = useState(false);

  const handleInputChange =(max: number) =>(e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (Number(value) >= 0) {
        if (Number(value) >= max) {
           e.target.value=max.toString();
        }}if(Number(value)<0) e.target.value = (0).toString();
    };

  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, ""); 
    if (!isNaN(Number(value)) && Number(value) > 0) {
      const formattedValue = Number(value).toLocaleString();
      e.target.value=formattedValue;
    }
    if (Number(value) === 0 || isNaN(Number(value))) e.target.value = "";
  };

  const handleReset = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.preventDefault();
    if(mortgageAmountRef.current) mortgageAmountRef.current.value = "";
    if(mortgageTermRef.current) mortgageTermRef.current.value = "";
    if(interestRateRef.current) interestRateRef.current.value = "";
    if(interestOnlyRef.current) interestOnlyRef.current.checked = false;
    if(repaymentRef.current) repaymentRef.current.checked = false;
    setActiveState("");
    setError({});
    setFormSubmit(false);
    setMonthlyPayment(0);
    setTotalPayment(0);
    setTotalInterest(0);
  };


  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => { 
    setActiveState(e.target.id);
   };

   const handleBlur = () => {
    setActiveState('')
   }

   const handleSubmit = (e: React.MouseEventHandler<HTMLButtonElement>|React.MouseEvent)=>{
    e.preventDefault();
    const principle= Number(mortgageAmountRef.current?.value.replace(/,/g, ""));
    const months= 12 * Number(mortgageTermRef.current?.value);
    const rate= Number(interestRateRef.current?.value)/100/12;
    const interestOnly= interestOnlyRef.current?.checked;
    const repayment= repaymentRef.current?.checked;

    const newError = {};

    if (!principle) {
      newError.mortgageAmount = "This field is required";
    }    if (!months) {
      newError.mortgageTerm = "This field is required";
    }    if (!rate) {
      newError.interestRate = "This field is required";
    }    if (!interestOnly && !repayment) {
      newError.mortgageType = "This field is required";
    }    if (Object.keys(newError).length > 0) {
      setError(newError);
      return;
    }    setError({});


    if(principle && months && rate) {
      const monthlyRepay = (principle*rate*Math.pow((1 + rate), months))/(Math.pow((1 + rate), months) - 1);
      const totalPayment = principle + (monthlyRepay*months); 

      if(interestOnly) {
        const totalInterest = totalPayment - principle;
        setTotalInterest(totalInterest);
        setTotalPayment(totalPayment);
        setMonthlyPayment(0);
      }

      if (repayment) { 
        setMonthlyPayment(monthlyRepay);
        setTotalPayment(totalPayment);
        setTotalInterest(0);
      }
      
      setFormSubmit(true);

    }
       setActiveState("");
   }

  return (
    <>
      <form
        id="mortgageForm"
        className=" flex flex-col lg:rounded-xl gap-2 w-full  text-stone-900 bg-slate-50 p-4"
      >
       <div className="flex flex-col md:flex-row justify-between"> <h2 className="text-2xl text-slate-900 font-bold">
          Mortgage Calculator
        </h2>
        <p className="text-slate-600 underline cursor-pointer" onClick={handleReset}>
          Clear All
        </p>
        </div>
        <label className={labelClass} htmlFor="mortgageAmount">
          Mortgage Amount
        </label>
        <div className={`${shortDivClass} ${
            error.mortgageAmount? "border-red-600":activeState === "mortgageAmount" ? "border-yellow-400" : "border-slate-900"
          }  `}>
          <span className={`${spanClass} rounded-l ${ error.mortgageAmount? "bg-red-600":
            activeState === "mortgageAmount" ? "bg-yellow-400" : "bg-slate-300"
          } `}>£</span>
          <input
            className={`${inputClass} rounded-r `}
            id="mortgageAmount"
            name="MortgageAmount"
            ref={mortgageAmountRef}
            onChange={handleAmount}
            onFocus={handleFocus}
            onBlur={handleBlur}
            type="text"
            required
          />
        </div>
        {error.mortgageAmount &&<p className="text-red-600 text-sm">{error.mortgageAmount}</p>}
        <div className="flex flex-col gap-3 lg:flex-row sm:items-stretch ">
        <div>
        <label className={labelClass} htmlFor="mortgageTerm">
          Mortgage Term
        </label>

        <div className={`${shortDivClass} ${
              error.mortgageTerm? "border-red-600":activeState === "mortgageTerm" ? "border-yellow-400" : "border-slate-900"
            }`}>
          <input
            className={`${inputClass} rounded-l  `}
            id="mortgageTerm"
            name="MortgageTerm"
            type="number"
            ref={mortgageTermRef}
            onChange={handleInputChange( 100)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
          />
          <span className={`${spanClass} rounded-r ${error.mortgageTerm? "bg-red-600": activeState === "mortgageTerm" ? "bg-yellow-400" : "bg-slate-300" } `}>years</span>
        </div>
        {error.mortgageTerm &&<p className="text-red-600 text-sm">{error.mortgageTerm}</p>}
        </div>
        <div>
        <label className={labelClass} htmlFor="interestRate">
          Interest Rate
        </label>
    <div className={  `${shortDivClass} ${
             error.interestRate? "border-red-600": activeState === "interestRate" ? "border-yellow-400" : "border-slate-900"
            } `}>
          <input
            className={`${inputClass} rounded-l `}
            name="interestRate"
            id="interestRate"
            type="number"
            ref={interestRateRef}
            onChange={handleInputChange( 100)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
          />
          <span className={`${spanClass} rounded-r ${ error.interestRate? "bg-red-600": activeState === "interestRate" ? "bg-yellow-400" : "bg-slate-300"}  `}>%</span>
        </div>
        {error.interestRate &&<p className="text-red-600 text-sm  ">{error.interestRate}</p>}
        </div>
        </div>
        <label className={labelClass}>Mortgage Type </label>
        <div onClick={()=>{setActiveState("repayment")
          repaymentRef.current!.checked = true;
        } }
className={`${divClass} ${activeState === "repayment" ? "bg-yellow-100" : ""} `}>
          <input
            className={radioInput}
            name="MortgageType"
            id="repayment"
            ref={repaymentRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
            type="radio"
            required
          />
          <label className={radioLabel} htmlFor="repayment">
            Repayment
          </label>
        </div>
        <div onClick={()=>{setActiveState("interestOnly")
          interestOnlyRef.current!.checked = true;
        }}
         className={ `${divClass} ${activeState === "interestOnly" ? "bg-yellow-100" : ""} `}>
          <input
            className={radioInput}
            name="MortgageType"
            id="interestOnly"
           ref={interestOnlyRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
            type="radio"
            required
          />
          <label className={radioLabel} htmlFor="interestOnly">
            Interest Only
          </label>
        </div>
        {error.mortgageType &&<p className="text-red-600 text-sm">{error.mortgageType}</p>}
        <button  
          className="w-80 hover:bg-yellow-200 self-left flex justify-center gap-2 bg-yellow-400 text-slate-900 focus:outline-none  font-bold my-4 p-3 rounded-3xl"
          type="submit"
          onClick={handleSubmit} 
        >
        <img src={calcimg} alt="Calculator Icon"/>  <span>Calculate Repayments</span>
        </button>
      </form>
    </>
  );
}

export default Form;
