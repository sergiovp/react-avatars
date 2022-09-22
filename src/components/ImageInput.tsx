import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import './styles.css';
import { getBase64FromFile } from '../utils/images';
import ModelViewer from './ModelViewer';
import { saveAs } from 'file-saver';
import { FileUploader } from 'react-drag-drop-files';

const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZTJlYzRlZmYtMDZjMS00YzVlLWE4ODItNGEwYzk4YmFmMzlmIiwiZXhwIjoxNjYzOTE5MDgzfQ.HyBCMa_q2zqC7-E43wFMKShOJF2LCZH5qWFWbDAoC6I';

function ImageInput() {
    const [selectedImage, setSelectedImage] = React.useState<File | null>(null);

    const [selectedBase64Image, setSelectedBase64Image] = React.useState<
        string | null
    >(null);

    const [file, setFile] = React.useState<File>(null);

    const [charged, setCharged] = React.useState<boolean>(false);

    const inputImageRef = React.useRef(null);

    React.useEffect(() => {
        if (!selectedBase64Image) {
            return;
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                'Access-Control-Allow-Origin': '*',
            },
            // mode: 'no-cors',
            body: JSON.stringify({
                name: 'Vela',
                img: selectedBase64Image,
                body: 'b4cd1f90-5950-46fb-b85a-3f235fd2bc8b',
            }),
        };

        fetch('https://api.unionavatars.com/avatars', options)
            .then((res) => res.json())
            .then((file) => {
                console.log('Esto es', file);

                fetch(file.avatar_link, { method: 'GET' }).then((res) => {
                    res.blob().then((blob) => {
                        console.log('BL)OB', blob);
                        saveAs(blob, 'sergio.glb');
                        setCharged(true);
                    });
                });
            });
    }, [selectedBase64Image]);

    const handleSubmitSelfie = React.useCallback(() => {
        if (!selectedImage) {
            return;
        }

        getBase64FromFile(selectedImage).then((base64Image) => {
            setSelectedBase64Image(base64Image);
        });
    }, [selectedImage]);

    const handleImageChange = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            if (event && event.target.files && event.target.files.length > 0) {
                setSelectedImage(event.target.files[0]);
            }
        },
        [],
    );

    const handleDeleteImage = React.useCallback(() => {
        setSelectedImage(null);
        setSelectedBase64Image(null);
        inputImageRef.current.value = null;
    }, []);

    const handlefile = React.useCallback((file) => {
        const urlFile = URL.createObjectURL(file);
        console.log(
            '🚀 ~ file: ImageInput.tsx ~ line 89 ~ handlefile ~ urlFile',
            urlFile,
        );
        setFile(urlFile);
    }, []);

    console.log('FICHERO', file);

    return (
        <Container className="main-input-container">
            {selectedImage && (
                <div className="img-vis">
                    <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="Loaded media"
                        className="loaded-img"
                    />
                    <Button variant="danger" onClick={handleDeleteImage}>
                        Delete image
                    </Button>
                </div>
            )}
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
            {charged && (
                <FileUploader
                    handleChange={handlefile}
                    name="file"
                    types={['glb']}
                    label="Upload or drop your downloaded file here"
                    multiple={false}
                    fileOrFiles={null}
                />
            )}
            {file && <ModelViewer scale="1.8" modelPath={file} />}
            {/* <ModelViewer scale="1.8" modelPath={'test.glb'} /> */}
        </Container>
    );
}

export default ImageInput;
