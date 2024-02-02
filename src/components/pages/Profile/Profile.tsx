import React from "react";
import Layout from "../../BaseLayout/common/Layout";
import WelcomeUser from "./WelcomeUser/WelcomeUser";
import FarmLogic from "../Farm/FarmLogic";
import { BackgroundImage } from "../../BaseLayout/BaseLayout.style";

const ProfilePage: React.FC = () => {
    return (
        <Layout>
            <BackgroundImage />
            <WelcomeUser />
            <FarmLogic />
        </Layout>
    );
};

export default ProfilePage;
