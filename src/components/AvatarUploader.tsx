import React from 'react';
import { FileUploader } from 'react-drag-drop-files';

type Props = {
    setAvatar: (urlFile: string) => void;
};

function AvatarUploader({ setAvatar }: Props) {
    const handleChange = React.useCallback(
        (file: File) => {
            const urlFile = URL.createObjectURL(file);
            setAvatar(urlFile);
        },
        [setAvatar],
    );

    return (
        <FileUploader
            handleChange={handleChange}
            name="file"
            types={['glb']}
            label="Upload or drop your downloaded file here"
            multiple={false}
            fileOrFiles={null}
        />
    );
}

export default AvatarUploader;
