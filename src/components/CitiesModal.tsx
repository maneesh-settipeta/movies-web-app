import { topIndianCities } from "../citymovies";
import { useDispatch } from "react-redux";
import { setCity, setModalOpen } from "../Store/appLoginSlice";
import { useSelector } from "react-redux";

const CitiesModal = () => {
    const cityName = useSelector((store: string) => store?.appLogin?.isCitySelected);
    const isModalSelected = useSelector((store: boolean) => store?.appLogin?.isModalOpen);
    const dispatch = useDispatch();
    const handleSelectCity = (cityName: string) => {
        dispatch(setCity(cityName));
        dispatch(setModalOpen(!isModalSelected));
    }

    const isCityNotSelected = !cityName && "border-red-500";
    const isCitySelected = cityName && " bg-red-500 rounded-md text-white";

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-5 rounded-lg text-center max-w-max">
                    <h4 className="">Popular Cities</h4>
                    <div className="flex gap-2 ">
                        {topIndianCities?.map((eachCity, index) => (
                            <div className={cityName === eachCity ? isCitySelected : isCityNotSelected} key={index}>
                                <button onClick={() => handleSelectCity(eachCity)} className=" border border-b-2 p-1 rounded-md" >{eachCity}</button>
                            </div>
                        ))}
                    </div>
                    <h6 className="text-red-500">Cities</h6>
                </div>
            </div >
        </>
    )
}

export default CitiesModal