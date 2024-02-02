import React from "react";
import Layout from "../../BaseLayout/common/Layout";
import WelcomeUser from "./WelcomeUser/WelcomeUser";
import { BackgroundImage, Container } from "../../BaseLayout/BaseLayout.style";
import Farm from "../Farm/Farm";

const ProfilePage: React.FC = () => {
    return (
        <Layout>
            <BackgroundImage />
            <Container>
                <WelcomeUser />
            </Container>
            <Container>
                <Farm />
            </Container>
        </Layout>
    );
};

export default ProfilePage;
