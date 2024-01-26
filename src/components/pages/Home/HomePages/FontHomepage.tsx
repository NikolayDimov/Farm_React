
import styled from 'styled-components';
import { Link } from 'react-scroll'; 
import farmImage from '../../../../../public/british-farmland(4).jpg';

const Container = styled.div`
    position: relative;
    height: 100vh;
    margin: 0 auto; 
`;

const FarmImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const ScrollDownArrow = styled(Link)`
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
    font-size: 2em;
    cursor: pointer;
`;

export default function FontHomepage() {
    return (
        <Container>
            <FarmImage src={farmImage} alt="Farm" />
            <ScrollDownArrow to="about-section" smooth={true} duration={500}>
                &#9660;
            </ScrollDownArrow>
        </Container>
    );
}
