import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import { getBase64FromFile } from '../utils/getBase64FromFile';

type Props = {
    setSelectedBase64Image: (base64Image: string) => void;
    selectedImage: File;
};

function SubmitImageBtn({ setSelectedBase64Image, selectedImage }: Props) {
    const handleSubmitSelfie = React.useCallback(() => {
        if (!selectedImage) {
            return;
        }

        getBase64FromFile(selectedImage).then((base64Image) => {
            setSelectedBase64Image(base64Image);
        });
    }, [selectedImage, setSelectedBase64Image]);

    return (
        <Button
            disabled={!selectedImage}
            variant="info"
            onClick={handleSubmitSelfie}
        >
            Submit
        </Button>
    );
}

export default SubmitImageBtn;
