import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setPaymentModalToggle } from '../Store/appPaymentSlice';
import { useDispatch } from "react-redux";
import PaymentOptionsModal from "./PaymentOptionsModal";

const Summary = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const URL = location.pathname.split('/');
    const cityId = URL[5]


    const movieSummaryInfo = useSelector((state) => state?.appPayment?.summaryMovieInfo);
    const summaryInfo = useSelector((state) => state?.appPayment?.summaryData);
    const paymentType = useSelector((state) => state?.appPayment?.paymentType);
    const isPaymentTypeModalOpened = useSelector((state) => state?.appPayment?.isPaymentModalOpen);

    const seats = Object.keys(summaryInfo.selectedSeats).toString();


    const handleRedirectShows = () => {
        const movieId = localStorage.getItem('movieId');
        navigate(`/home/movie/${movieId}/city/${cityId}`);
    }

    const handleTogglePayment = () => {
        dispatch(setPaymentModalToggle(true));
        console.log(isPaymentTypeModalOpened, " isPaymentTypeModalOpened");

    }

    return (
        <div className="h-screen">
            <div className="flex items-center h-[10%] bg-white justify-start pl-5">
                <button className="mr-2 h-8 w-8" onClick={handleRedirectShows}>&lt;</button>
                <h1 className="text-base font-medium">{movieSummaryInfo?.movieName}</h1>
                <div className="flex ml-4">
                    <p className="text-xs">{movieSummaryInfo?.theaterName} <span className="mx-2">|</span></p>
                </div>
                <div className="flex ml-2">
                    <p className="text-xs">{movieSummaryInfo?.showDate}</p>
                    <p className="text-xs ml-2">{movieSummaryInfo?.showTime}</p>
                </div>
            </div>
            <div className=" flex flex-col w-full h-[90%] bg-gray-100  justify-center content-center items-center">
                <div className="bg-white w-96 h-96 px-8 py-8 ">
                    <h2 className="text-red-500 mb-6 font-medium">B O O K I N G <span className="mr-2"></span> S U M M A R Y</h2>
                    <div className="flex justify-between mb-3">
                        <h3>{`Gold - ${seats}`}</h3>
                        <p className=" font-medium">${`${summaryInfo.seatsPrize}`}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Convienence Fee</p>
                        <h3 className=" font-medium">${`${summaryInfo.convenienceFees}`}</h3>
                    </div>
                    <hr className="mt-8 border-b-2" />
                    <div className="flex justify-between mt-6">
                        <p>Sub Total</p>
                        <h3 className=" font-medium">${`${summaryInfo.subTotalPrize}`}</h3>
                    </div>
                    <div className="bg-gray-200 p-3 h-28 rounded-md mt-4">
                        <div className=" flex justify-between">
                            <h3>Donate to BookAChange</h3>
                            <p className=" font-medium">$ 0 </p>
                        </div>
                        <div className=" flex justify-between mt-5">
                            <p className=" text-xs">($1 per ticket has been added)</p>
                            <p className="text-red-400  text-xs font-medium">Add $2 </p>
                        </div>
                        <p className="text-xs mt-4">VIEW T&C</p>
                    </div>
                </div>
                <div className="flex justify-between bg-yellow-50 w-96 p-2 h-10 rounded-b-lg ">
                    <h1 className="pl-5 font-medium">Amount Payable</h1>
                    <h3 className="pr-5 font-medium">${`${summaryInfo.subTotalPrize}`}</h3>
                </div>
                <button className="flex justify-center bg-red-500 text-white w-96 p-2 h-10  rounded-lg   mt-4"
                 onClick={handleTogglePayment}>
                    <button>Pay now</button>
                </button>
            </div>
            {isPaymentTypeModalOpened ? <PaymentOptionsModal /> : null}
        </div >
    );
};

export default Summary;