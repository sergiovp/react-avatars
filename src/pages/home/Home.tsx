import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import AvatarUploader from '../../components/AvatarUploader';
import SelfiePrev from '../../components/SelfiePrev';
import UploadSelfie from '../../components/UploadSelfie';
import { saveAs } from 'file-saver';
import './homeStyles.css';
import getRequestOptions from '../../utils/getRequestOptions';
import SubmitImageBtn from '../../components/SubmitImageBtn';
import DeleteImageBtn from '../../components/DeleteImageBtn';
import Loading from '../../components/Loading';
import ModelViewer from '../../components/ModelViewer';
import DeleteAvatarBtn from '../../components/DeleteAvatarBtn';

function Home() {
    const [selectedImage, setSelectedImage] = React.useState<File>(null);

    const [selectedBase64Image, setSelectedBase64Image] = React.useState<
        string | null
    >(null);

    const [avatar, setAvatar] = React.useState<string>(null);

    const [loading, setLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (!selectedBase64Image) {
            return;
        }

        setLoading(true);

        const options = getRequestOptions(selectedBase64Image);

        fetch('https://api.unionavatars.com/avatars', options)
            .then((res) => res.json())
            .then((file) => {
                fetch(file.avatar_link).then((res) => {
                    res.blob().then((blob) => {
                        saveAs(blob, `${file.name}.glb`);
                        setLoading(false);
                    });
                });
            });
    }, [selectedBase64Image]);

    return (
        <Container className="main-page-container">
            {!selectedImage && (
                <UploadSelfie
                    setSelectedImage={setSelectedImage}
                    setSelectedBase64Image={setSelectedBase64Image}
                    selectedImage={selectedImage}
                />
            )}

            {selectedImage && (
                <>
                    <SelfiePrev
                        setSelectedImage={setSelectedImage}
                        setSelectedBase64Image={setSelectedBase64Image}
                        selectedImage={selectedImage}
                    />
                    {!selectedBase64Image && (
                        <div className="main-btn">
                            <SubmitImageBtn
                                selectedImage={selectedImage}
                                setSelectedBase64Image={setSelectedBase64Image}
                            />
                            <DeleteImageBtn
                                setSelectedImage={setSelectedImage}
                                setSelectedBase64Image={setSelectedBase64Image}
                            />
                        </div>
                    )}
                </>
            )}

            {selectedBase64Image && loading && <Loading />}

            {selectedBase64Image && !loading && !avatar && (
                <AvatarUploader setAvatar={setAvatar} />
            )}

            {avatar && (
                <>
                    <DeleteAvatarBtn
                        setAvatar={setAvatar}
                        setSelectedBase64Image={setSelectedBase64Image}
                        setSelectedImage={setSelectedImage}
                    />
                    <ModelViewer
                        scale={1.8}
                        modelPath={avatar}
                        position={[0, 0, 0]}
                    />
                </>
            )}
        </Container>
    );
}

export default Home;
