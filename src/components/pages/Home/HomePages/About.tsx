import styled from 'styled-components';
import Layout from '../../../common/Layout';
import aboutPageImage from "../../../../assets/farmLand.jpg"; 


const BackgroundImage = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${aboutPageImage}); 
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  z-index: -1;
`;

const Container = styled.div`
    margin: 0 auto; 
    width: 100%;
    display: flex;
    height: 100vh;
`;

const Title = styled.h1`
    font-size: 2.5em;
    text-transform: uppercase;
    margin-bottom: 1em;

    span {
        color: #007bff; /* Adjust color as needed */
    }
`;

const Subtitle = styled.h4`
    text-transform: uppercase;
    margin-bottom: 1em;
`;

const Paragraph = styled.p`
    margin-bottom: 1em;
`;

const FeatureList = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const FeatureItem = styled.div`
    width: 48%; /* Adjust width as needed */
    margin-bottom: 1em;

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const FeatureIcon = styled.i`
    font-size: 1.2em;
    color: #007bff; /* Adjust color as needed */
    margin-right: 0.5em;
`;


const LogoImage = styled.img`
    max-width: 150px;
`;

export default function About() {
    return (
        <>
        <Layout>
        <Container>
            <BackgroundImage />
                <div>
                    <Title>
                        Welcome to <span>FarmApp</span>
                    </Title>
                    <Subtitle>
                        Revolutionizing Farm Management
                    </Subtitle>
                    <Paragraph>
                        FarmApp is your all-in-one solution for modern farm management. Our goal is to empower farmers with cutting-edge technology to streamline operations and enhance productivity.
                    </Paragraph>
                    <FeatureList>
                        <FeatureItem>
                            <FeatureIcon className="fa fa-check" />
                            Comprehensive Land Management
                        </FeatureItem>
                        <FeatureItem>
                            <FeatureIcon className="fa fa-check" />
                            Crop Planning and Monitoring
                        </FeatureItem>
                        <FeatureItem>
                            <FeatureIcon className="fa fa-check" />
                            Livestock Tracking
                        </FeatureItem>
                        <FeatureItem>
                            <FeatureIcon className="fa fa-check" />
                            Weather Integration for Smart Farming
                        </FeatureItem>
                        <FeatureItem>
                            <FeatureIcon className="fa fa-check" />
                            Task Scheduling and Alerts
                        </FeatureItem>
                        <FeatureItem>
                            <FeatureIcon className="fa fa-check" />
                            Analytics for Informed Decisions
                        </FeatureItem>
                    </FeatureList>
                    <Paragraph>
                        Join us in transforming traditional farming into a modern, efficient, and sustainable practice. FarmApp is dedicated to supporting farmers in every step of their journey.
                    </Paragraph>
                    <LogoImage src="img/farm-logo.png" alt="FarmApp Logo" />
                </div>
        </Container>
        </Layout>
        </>
    );
}
