import axios from 'axios';
import { setPaymentMethod, setPaymentModalToggle, setBookingInfo } from '../Store/appPaymentSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { VITE_baseURL } from '../URL'

const PaymentOptionsModal = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const paymethodType = useSelector((state) => state?.appPayment?.paymentType);
    const selectedSeats = useSelector((state => state?.appMovie?.selectedSeats));
    console.log(selectedSeats);

    console.log(paymethodType);

    const userDetails = localStorage.getItem('userDetails');
    const parseUserDetails = JSON.parse(userDetails)
    const userId = parseUserDetails.userId;
    const showId = parseInt(localStorage.getItem('showId'));

    console.log(showId);

    const handleChangeRadio = (e) => {
        dispatch(setPaymentMethod(e.target.value));
    }

    const options = ['UPI', 'netBanking', 'card'];

    const sampleRequestBodies = [
        {
            type: "UPI", requestBody: {
                "uniqueSeatIds": selectedSeats,
                "showId": showId,
                "userId": userId,
                "paymentType": 1,
                "upi": {
                    "upiId": "monud@upi"
                }
            }
        },
        {
            type: "netBanking", requestBody: {
                "uniqueSeatIds": selectedSeats,
                "showId": showId,
                "userId": userId,
                "paymentType": 3,
                "netBanking": {
                    "bankName": "PNC",
                    "bankUserName": "MonuD123",
                    "bankPassword": "abc123"
                }
            }
        },
        {
            type: "card", requestBody: {
                "uniqueSeatIds": selectedSeats,
                "showId": showId,
                "userId": userId,
                "paymentType": 2,
                "card": {
                    "cardNumber": 12345678,
                    "cardName": "MonuD",
                    "cardCvv": 123,
                    "cardMonth": 1,
                    "cardYear": 2027
                }
            }
        },

    ]

    const handleClosePaymentToggle = () => {
        dispatch(setPaymentModalToggle(false));
    }

    const handleProceedPayment = async () => {
        if (paymethodType === '') {
            return alert("Choose Payment Method")
        }
        else {
            const requestBodySample = sampleRequestBodies.find((reqBody) => reqBody.type === paymethodType);
            console.log(requestBodySample?.requestBody);
            const bookTicket = await axios.post(`${import.meta.env.VITE_baseURL}/payment-service/api/payment`, requestBodySample?.requestBody);
            console.log(bookTicket);
            if (bookTicket.status === 200) {
                dispatch(setBookingInfo(bookTicket));
                navigate('/movie/city/theatre/booked');
                dispatch(setPaymentModalToggle(false));
            }
        }
    }



    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg min-w-[300px]">
                <div className=' flex justify-end mb-2' onClick={handleClosePaymentToggle}>
                    <button className='p-1 bg-red-500 rounded-md text-white w-8'>X</button>
                </div>
                <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>
                {options.map((option, index) => (
                    <div key={index} className="mb-2 ">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="payment"
                                value={option}
                                onChange={handleChangeRadio}
                            />
                            <span >{option}</span>
                        </label>
                    </div>
                ))}
                <div className='flex justify-center'>
                    <button className='text-white rounded-lg p-2  bg-red-500' onClick={handleProceedPayment}>Proceed Payment</button>
                </div>
            </div>
        </div>
    );
};

export default PaymentOptionsModal;
