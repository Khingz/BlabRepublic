import React from 'react';
import { useConfirm } from '../context/confirmContext';

const ImageViewer = ({ imageUrl }) => {
    const {handleImgViewerClose} = useConfirm();
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-70 z-50 text-center">
            <div className="text-center w-3/4 relative">
                <span className="cursor-pointer text-6xl text-white absolute top-0 left-0" onClick={handleImgViewerClose}>&times;</span>
                <img src={imageUrl} alt="Large user avatar" className='w-1/2'/>
            </div>
        </div>
    );
};

export default ImageViewer;