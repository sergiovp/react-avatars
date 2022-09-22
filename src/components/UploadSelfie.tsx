import React from 'react';
import Form from 'react-bootstrap/Form';
import SubmitImageBtn from './SubmitImageBtn';

type Props = {
    setSelectedImage: (file: File) => void;
    setSelectedBase64Image: (base64Image: string) => void;
    selectedImage: File;
};

function UploadSelfie({
    setSelectedImage,
    setSelectedBase64Image,
    selectedImage,
}: Props) {
    const handleImageChange = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.files.length > 0) {
                setSelectedImage(event.target.files[0]);
            }
        },
        [setSelectedImage],
    );

    return (
        <>
            <Form.Group controlId="formFile" className="mb-3 form">
                <Form.Label>Upload a selfie</Form.Label>
                <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </Form.Group>
            <SubmitImageBtn
                selectedImage={selectedImage}
                setSelectedBase64Image={setSelectedBase64Image}
            />
        </>
    );
}

export default UploadSelfie;
