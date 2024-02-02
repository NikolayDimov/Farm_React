import React from "react";
import Layout from "../../BaseLayout/common/Layout";
import WelcomeUser from "./WelcomeUser/WelcomeUser";
import FarmLogic from "../Farm/FarmLogic";
import { BackgroundImage, Container } from "../../BaseLayout/BaseLayout.style";

const ProfilePage: React.FC = () => {
    return (
        <Layout>
            <BackgroundImage />
            <Container>
                <WelcomeUser />
            </Container>
            <Container>
                <FarmLogic />
            </Container>
        </Layout>
    );
};

export default ProfilePage;
