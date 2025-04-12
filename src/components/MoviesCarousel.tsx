import { useState } from "react";
const images = [
    'src/images/Carousel-1.jpg',
    'src/images/Carousel-2.jpg',
    'src/images/Carousel-3.jpg',
    'src/images/Carousel-4.jpg'
]

const MoviesCarousel = () => {

    const [currentImage, setCurrentImage] = useState<number>(0);
    const currentImageCarousel = images[currentImage]

    const handleBackwardImage = () => {
        if (currentImage === 0) {
            const lastImage = images.length - 1
            setCurrentImage(lastImage);
        }
        else {
            setCurrentImage((prevImage) => prevImage - 1);
        }
    }


    const handleForwardImage = () => {
        if (currentImage === images.length - 1) {
            setCurrentImage(0);
        }
        else {
            setCurrentImage((prevImage) => prevImage + 1);
        }
        
    }


    return (

        <div>
            <div className="h-10 w-10 absolute top-56 left-4 transform border-gray-400 border text-center bg-gray-400  rounded-md">
                <button className="text-3xl text-white" onClick={handleBackwardImage}>&lt;</button>
            </div>
            <img src={currentImageCarousel} className="h-fit w-full" />
            <div className="absolute h-10 w-10 top-56 right-4 transform border-gray-400 border text-center bg-gray-400  rounded-md">
                <button className="text-3xl text-white" onClick={handleForwardImage}> &gt;</button>
            </div>


        </div>
    )
}

export default MoviesCarousel