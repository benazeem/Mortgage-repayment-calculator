import resultImg from "../assets/resultimg.svg";

function Result({
  totalPayment,
  monthlyPayment,
  totalInterest,
  formSubmit,
}: {
  totalPayment: number;
  monthlyPayment: number;
  totalInterest: number;
  formSubmit: boolean;
})

{
  return (
    <>
      {formSubmit?  (
        <div className="w-full p-8 sm:p-0 flex flex-col lg:justify-evenly items-center self-stretch  rounded-none lg:rounded-lg lg:rounded-bl-[80px] lg:rounded-tl-none   bg-slate-800">
          <div className="mt-5" > 
            <h2 className="text-slate-50 text-xl px-5 "> Your results</h2>
          <p className="text-slate-400 text-sm px-5 py-3 lg:pb-12 text-left">
            Your results are shown below based on the information you provided.
            To adjust the results, edit the form and click "calculate
            repayments" again.
          </p></div>
          <div className="w-[90%] mb-auto mt-4 sm:mt-0 overflow-hidden rounded-md bg-slate-900 border-t-2 border-yellow-400">
              <div className=" p-3 ">
              {totalInterest>0 && <> <p className="text-slate-400 text-sm p-3">
                  Your total interest
                </p>
                <p className="text-yellow-400 text-5xl px-4 pb-6">
                  £{totalInterest.toFixed(2)}
                </p></> } 
              {monthlyPayment>0 && <> <p className="text-slate-400 text-sm p-3">
                  Your monthly repayments
                </p>
                <p className="text-yellow-400 text-5xl px-4 pb-6">
                  £{monthlyPayment.toFixed(2)}
                </p></> }   
              </div>
              <div className="border-b border-slate-600 w-5/6 mx-auto"></div>
              <div className="p-3">
                <p className="text-slate-400 text-sm px-3 py-1 ">
                  Total you'll repay over the term
                </p>
                <p className="text-slate-50 text-md px-4 ">
                  {" "}
                  £{totalPayment.toFixed(2)}
                </p>
              </div>
            </div>
        </div>
      ) :
      (
        <div className="w-full p-8 sm:p-0 flex flex-col self-stretch justify-center items-center rounded-none lg:rounded-lg lg:rounded-bl-[80px] lg:rounded-tl-none  bg-slate-800">
          <img className="mt-auto h-1/3 " src={resultImg} alt="Result Image" />
           <h2 className="text-slate-50 text-2xl p-3">Results show here</h2>
          <p className="text-slate-400 text-sm px-5 text-center mb-auto">
            Complete the form and click "calculate repayments" to see what your
            monthly repayments would be.
          </p>
        </div>
      )}
    </>
  );
}

export default Result;


