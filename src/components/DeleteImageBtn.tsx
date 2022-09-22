import React from 'react';
import Button from 'react-bootstrap/esm/Button';

type Props = {
    setSelectedImage: (file: File) => void;
    setSelectedBase64Image: (base64Image: string) => void;
};

function DeleteImageBtn({ setSelectedImage, setSelectedBase64Image }: Props) {
    const handleDeleteImage = React.useCallback(() => {
        setSelectedImage(null);
        setSelectedBase64Image(null);
    }, [setSelectedBase64Image, setSelectedImage]);

    return (
        <Button variant="danger" onClick={handleDeleteImage}>
            Delete
        </Button>
    );
}

export default DeleteImageBtn;
