import Header from './Header'
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import CitiesModal from './CitiesModal';
import LoginModal from './LoginModal';
// import { useEffect } from 'react';
// import { setTheatresDetails, setModalOpen } from '../Store/appLoginSlice';
// import { useDispatch } from 'react-redux';


const MainPage = () => {
    // const dispatch = useDispatch();

    const isCityModalOpenn = useSelector((store: boolean) => store?.appLogin?.isCityModalOpen);

    // const cityName = useSelector((state) => state?.appLogin?.city?.cityName);

    const signInModalStatus = useSelector((store: boolean) => store?.appLogin?.signInModalToggle);

    const sigUpModalStatus = useSelector((state) => state?.appLogin?.signUpModalToggle);

    const cityName: string | null = localStorage.getItem('locationName');


    // useEffect(() => {
    //     if (cityName1) {
    //         dispatch(setTheatresDetails(cityName1));
    //         // dispatch(setModalOpen())
    //     }
    // }, []);

    return (
        <div>
            <div>
                <Header />
            </div>
            <Outlet />
            {isCityModalOpenn ? <CitiesModal /> : null}
            {signInModalStatus || sigUpModalStatus ? <LoginModal /> : null}
        </div>
    )
}

export default MainPage