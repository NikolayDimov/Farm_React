import { useAuth } from "../../../context/AuthContext/AuthContext";
import { BottomButtonsContainer, LogoutButton, SidebarButton, SidebarContainer, TopButtonsContainer } from "./Sidebar.style";

const Sidebar = () => {
    const { logout } = useAuth();

    const handleLogout = async () => {
        await logout();
    };

    return (
        <SidebarContainer>
            <TopButtonsContainer>
                <SidebarButton to="/farm">Farm</SidebarButton>
                <SidebarButton to="/field">Field</SidebarButton>
                <SidebarButton to="/crop">Crop</SidebarButton>
                <SidebarButton to="/soil">Soil</SidebarButton>
                <SidebarButton to="/processingType">Processing Type</SidebarButton>
                <SidebarButton to="/machine">Machine</SidebarButton>
                <SidebarButton to="/processing">Processing</SidebarButton>
                <SidebarButton to="/reports">Reports</SidebarButton>
            </TopButtonsContainer>
            <BottomButtonsContainer>
                <SidebarButton to="/contacts">Contacts</SidebarButton>
                <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            </BottomButtonsContainer>
        </SidebarContainer>
    );
};

export default Sidebar;
