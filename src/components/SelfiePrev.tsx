import React from 'react';
import './selfiePrevStyles.css';

type Props = {
    setSelectedImage: (file: File) => void;
    setSelectedBase64Image: (base64Image: string) => void;
    selectedImage: File;
};

function SelfiePrev({ selectedImage }: Props) {
    return (
        <div className="img-vis">
            <img
                src={URL.createObjectURL(selectedImage)}
                alt="Loaded media"
                className="loaded-img"
            />
        </div>
    );
}

export default SelfiePrev;
