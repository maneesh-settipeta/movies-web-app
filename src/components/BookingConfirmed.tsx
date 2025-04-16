import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import image from '../assets/BookMyShow-Logo.jpg'

const BookingConfirmed = () => {
    const navigate = useNavigate();

    const bookedConfirmationData = useSelector((state) => state?.appPayment?.bookedInfo);

    const data = bookedConfirmationData.data;

    console.log(bookedConfirmationData.data);


    const seats = Object.keys(data?.seatPricingDetails?.selectedSeats);
    console.log(seats);


    const handleReturnHome = () => {
        navigate('/home');
    }




    return (
        <div className="h-screen">
            <div className="flex items-center h-[10%] bg-white justify-start pl-5 p-3">
                <button>
                    <img src={image} className="h-10 w-32 mr-3 ml-2" onClick={handleReturnHome} />
                </button>

            </div>
            <div className=" flex flex-col w-full h-[90%] bg-gray-100  justify-center content-center items-center">
                <div className="bg-white w-96 h-max px-8 py-8 ">
                    <h2 className="text-green-600 mb-6 font-bold"> T I C K E T <span className="mr-2"></span> C O N F I R M A T I O N</h2>
                    <div className="flex justify-between">
                        <div>
                            <h1 className="font-medium h-7 w-full text-1xl mb-4">{data?.showDetails?.movieName}</h1>
                            <p className="font-medium h-7 w-full text-1sxl ">{data?.showDetails?.theaterName}</p>
                            <div className="flex gap-3">
                                <p>{data?.showDetails?.showDate}</p>
                                <p>{data?.showDetails?.showTime}</p>
                            </div>

                        </div>
                        <div className="flex justify-center items-center bg-green-100 w-16 h-16 rounded-full mb-6">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10 text-green-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                    </div>
                    <hr className="mt-8 border-b-2 mb-3" />

                    <div className="flex justify-between mb-3">
                        <h3>{`Gold - ${seats}`}</h3>
                        <p className=" font-medium">${`${data?.seatPricingDetails?.seatsPrize}`}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Convienence Fee</p>
                        <h3 className=" font-medium">${`${data?.seatPricingDetails?.convenienceFees}`}</h3>
                    </div>
                    <div className="flex justify-between mt-2 mb-3">
                        <p>Sub Total</p>
                        <h3 className=" font-medium">${`${data?.seatPricingDetails?.subTotalPrize}`}</h3>
                    </div>
                    <p className="text-red-500">Add to calendar</p>
                    <hr className="mt-4 border-b-2" />
                    <div className="flex justify-between mt-4">
                        <p className="font-bold">Number of tickets  </p>
                        <div className="h-14 w-16 border-2 flex justify-center items-center border-green-400"  >
                            <h1 className=" text-center text-green-700 font-medium border-b-2 text-2xl ">{data?.seatPricingDetails?.totalSeats}</h1>
                        </div>
                    </div>
                </div>

                <button className="flex justify-center bg-red-500 text-white w-96 p-2 h-10  rounded-lg   mt-4" >
                    <button onClick={handleReturnHome}>Book other Tickets</button>
                </button>
            </div>
        </div >
    );
}

export default BookingConfirmed