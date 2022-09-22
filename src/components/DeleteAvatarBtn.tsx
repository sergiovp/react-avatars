import React from 'react';
import Button from 'react-bootstrap/esm/Button';

type Props = {
    setAvatar: (avatar: string) => void;
    setSelectedBase64Image: (base64Image: string) => void;
    setSelectedImage: (file: File) => void;
};

function DeleteAvatarBtn({
    setSelectedImage,
    setSelectedBase64Image,
    setAvatar,
}: Props) {
    const handleDeleteAvatar = React.useCallback(() => {
        setSelectedImage(null);
        setSelectedBase64Image(null);
        setAvatar(null);
    }, [setAvatar, setSelectedBase64Image, setSelectedImage]);

    return (
        <Button variant="dark" onClick={handleDeleteAvatar}>
            Convert another avatar
        </Button>
    );
}

export default DeleteAvatarBtn;
