import React from 'react'
import Header from './Header'
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import CitiesModal from './CitiesModal';

const Home = () => {
    const cityName = useSelector((store: boolean) => store?.appLogin?.isModalOpen);


    return (
        <div>
            <div>
                <Header />
            </div>
            <Outlet />
            {!cityName ? <CitiesModal /> : null}
        </div>
    )
}

export default Home