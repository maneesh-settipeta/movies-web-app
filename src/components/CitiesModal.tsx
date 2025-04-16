import { useDispatch } from "react-redux";
import { setTheatresDetails, setModalOpen } from "../Store/appLoginSlice";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
// import { VITE_baseURL } from '../URL';

const CitiesModal = () => {
    const cityName = useSelector((store: string) => store?.appLogin?.city?.cityName);
    // const isModalSelected = useSelector((store: boolean) => store?.appLogin?.isCityModalOpen);

    const dispatch = useDispatch();

    const handleSelectCity = (theatreData) => {
        localStorage.setItem('locationId', theatreData.cityId);
        localStorage.setItem('locationName', theatreData.cityName);
        dispatch(setTheatresDetails(theatreData));
        dispatch(setModalOpen(false));
    }


    const fetchCities = async () => {
        try {
            (import.meta.env.VITE_baseURL);
            const { data } = await axios.get(`${import.meta.env.VITE_baseURL}/search-service/api/v2/cities`);
            (data);
            return data;

        } catch (error) {
            console.error(error);
        }
    }

    const { data } = useQuery({
        queryKey: ["cityName"],
        queryFn: fetchCities,
    });

    const citiesData = Object.entries(data || {})

    const isCityNotSelected = !cityName && "border-red-500";
    const isCitySelected = cityName && " bg-red-500 rounded-md text-white";

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-5 rounded-lg text-center max-w-max">
                <h4 className="">Popular Cities</h4>
                <div className="flex gap-2 ">
                    {citiesData?.map(([id, eachCity]) => (
                        <div className={cityName === eachCity ? isCitySelected : isCityNotSelected} key={id}>
                            <button onClick={() => handleSelectCity({ cityId: id, cityName: eachCity })}
                                className=" border border-b-2 p-1 rounded-md">{eachCity}</button>
                        </div>
                    ))}
                </div>
                <h6 className="text-red-500">Cities</h6>
            </div>
        </div >

    )
}

export default CitiesModal