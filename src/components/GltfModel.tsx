import React, { useRef, useState } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

type Props = {
    modelPath: string;
    scale: number;
    position: number[];
};

const GltfModel = ({ modelPath, scale, position }: Props) => {
    const ref = useRef(null);
    const gltf = useLoader(GLTFLoader, modelPath);
    const [hovered, hover] = useState(false);

    useFrame((state, delta) => (ref.current.rotation.y += 0.001));
    return (
        <>
            <primitive
                ref={ref}
                object={gltf.scene}
                position={position}
                scale={hovered ? scale * 1.2 : scale}
                onPointerOver={(event) => hover(true)}
                onPointerOut={(event) => hover(false)}
            />
        </>
    );
};

export default GltfModel;
