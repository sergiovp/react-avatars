import Container from 'react-bootstrap/Container';

import ImageInput from '../components/ImageInput';
import './styles.css';

function Avatar() {
    return (
        <Container className="main-page-container">
            <ImageInput />
        </Container>
    );
}

export default Avatar;
