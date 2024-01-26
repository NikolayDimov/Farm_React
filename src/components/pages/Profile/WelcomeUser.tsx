import { useAuth } from '../../../context/AuthContext';



const WelcomeUser: React.FC = () => {
    const { user } = useAuth();



  return (
    <>
    <h2>Welcome, {user?.email}!</h2>
    <p>Your role: {user?.role}</p>
    </>
  );
};

export default WelcomeUser;