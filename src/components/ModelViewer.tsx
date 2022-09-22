import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import GltfModel from '../Models/GltfModel';
import test from '../test.glb';
import './styles.css';
import Container from 'react-bootstrap/esm/Container';

type Props = {
    modelPath: string;
    scale: number;
    position: number[];
};

const ModelViewer = ({
    modelPath,
    scale = 40,
    position = [0, 0, 0],
}: Props) => {
    console.log('QUER HAY', test);
    return (
        <Container className="canvas">
            <Canvas>
                <ambientLight intensity={0.3} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />
                <Suspense fallback={null}>
                    <GltfModel
                        modelPath={modelPath}
                        scale={scale}
                        position={position}
                    />
                    <OrbitControls />
                </Suspense>
            </Canvas>
        </Container>
    );
};

export default ModelViewer;
