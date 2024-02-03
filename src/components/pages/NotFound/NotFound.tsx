import styled from "styled-components";
import Layout from "../../BaseLayout/common/Layout";
import { BackgroundImage } from "../../BaseLayout/BaseLayout.style";

const NotFoundContainer = styled.div`
    text-align: center;
    margin-top: 50px;
`;

const NotFoundTitle = styled.h1`
    color: #ff6347; /* or any other color you prefer */
`;

const NotFound = () => {
    return (
        <Layout>
            <BackgroundImage />
            <NotFoundContainer>
                <NotFoundTitle>404 - Not Found</NotFoundTitle>
                <p>The page you are looking for might not exist or has been moved.</p>
                {/* You can add a link to the home page or any other relevant page */}
                <p>
                    <a href="/profile">Go to Profile</a>
                </p>
            </NotFoundContainer>
        </Layout>
    );
};

export default NotFound;
