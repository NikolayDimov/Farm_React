import styled from "styled-components";

const NotFoundContainer = styled.div`
    text-align: center;
    margin-top: 50px;
`;

const NotFoundTitle = styled.h1`
    color: #ff6347;
`;

const NotFound = () => {
    return (
        <>
            <NotFoundContainer>
                <NotFoundTitle>404 - Not Found</NotFoundTitle>
                <p>The page you are looking for might not exist or has been moved.</p>

                <p>
                    <a href="/profile">Go to Profile</a>
                </p>
            </NotFoundContainer>
        </>
    );
};

export default NotFound;
