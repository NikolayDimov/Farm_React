const apiUrl = "http://localhost:3000/soil";

const SoilService = {
    fetchSoils: async () => {
        try {
            const response = await fetch(apiUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
            const soilData = await response.json();
            return soilData;
        } catch (error) {
            console.error("Error in fetching soils", error);
            throw error;
        }
    },
};

export default SoilService;
