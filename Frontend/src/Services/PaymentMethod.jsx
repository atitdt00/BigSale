import  { useEffect, useRef, useState } from "react";
import { useCartContext } from "../context/CartContext";
import axios from "axios";

function PaymentMethod() {
  const { openMethodForm, setOpenMethodForm, paymentData } = useCartContext();
  const [paymentMethod, setPaymentMethod] = useState("eSewa");
  const [loading , setLoading]=useState(false)


  //prevent multiple submissions
  const submittingRef= useRef(false);

  //Focus payment option when modal opens
  const radioRef= useRef(false)

  useEffect(()=>{
    if(openMethodForm){
      radioRef.current?.focus();
    }
  },[openMethodForm])

  //close modal with Ecape key
  useEffect(()=>{
    const handleKeyDown=(e)=>{
      if(e.key==="Escape"){
        setOpenMethodForm(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return ()=>window.removeEventListener("keydown", handleKeyDown)
  }, [setOpenMethodForm])






  const submitHandler = async (e) => {
    e.preventDefault();

    //prevent duplicate clicks
    if(submittingRef.current) return;
    
    submittingRef.current=true;
    setLoading(true)

    // Payment Logic Here
    try {
      const { data } = await axios.post("http://localhost:4000/api/payment", {
        email: paymentData.email,
        amount: paymentData.amount,
        productName: paymentData.productName,
      });

      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

      const fields = {
        amount: data.amount,
        tax_amount: 0,
        total_amount: data.amount,
        transaction_uuid: data.transaction_uuid,
        product_code: data.productCode,
        product_service_charge: 0,
        product_delivery_charge: 0,
        success_url: "http://localhost:5173/success",
        failure_url: "http://localhost:5173/failure",
        signed_field_names: "total_amount,transaction_uuid,product_code",
        signature: data.signature,
      };

      Object.keys(fields).forEach((key) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = fields[key];
        form.appendChild(input);
      });

      document.body.appendChild(form);
      console.log(fields)
      form.submit();
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };

  if (!openMethodForm) return null;
  return (
    <div>
      {openMethodForm && (
        <div
          onClick={() => setOpenMethodForm(false)}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-md rounded-lg p-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold mb-5">Payment Method</h2>
              <button
                onClick={() => setOpenMethodForm(false)}
                className="text-xl font-bold"
              >
                ✕
              </button>
            </div>

            {/* form */}
            <form onSubmit={submitHandler}>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  ref={radioRef}
                  type="radio"
                  value="eSewa"
                  checked={paymentMethod === "eSewa"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                eSewa
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-5 bg-green-600 text-white py-2 rounded"
              >
                {loading? "processing....": "Continue"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentMethod;
