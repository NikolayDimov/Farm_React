
import { useAuth } from "../../context/AuthContext";
import Layout from "../common/Layout";


const ProfilePage = () => {
  const { user } = useAuth();


  return (
    <>
    <Layout>
      <h2>Welcome, {user?.email}!</h2>
      <p>Your role: {user?.role}</p>
    </Layout>
    </>
  );
};

export default ProfilePage;
