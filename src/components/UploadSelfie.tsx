import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function UploadSelfie() {
    const [selectedImage, setSelectedImage] = React.useState<File>(null);

    const inputImageRef = React.useRef(null);

    const handleSubmitSelfie = React.useCallback(() => {
        if (!selectedImage) {
            return;
        }
    }, [selectedImage]);

    return (
        <>
            <Form.Group controlId="formFile" className="mb-3 form">
                <Form.Label>Upload a selfie</Form.Label>
                <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={inputImageRef}
                />
            </Form.Group>
            <Button
                disabled={!selectedImage}
                variant="info"
                onClick={handleSubmitSelfie}
            >
                Submit
            </Button>
        </>
    );
}

export default UploadSelfie;
