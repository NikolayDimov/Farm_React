// farmUtils.ts
export const showFarmLocationOnMap = (coordinates: number[] | undefined) => {
    if (!coordinates) {
        console.error("Coordinates are undefined");
        return;
    }

    // Check if the Google Maps API is loaded
    if (!window.google || !window.google.maps) {
        console.error("Google Maps API not loaded");
        return;
    }

    const mapElement = document.getElementById("map");

    if (!mapElement) {
        console.error("Map element not found");
        return;
    }

    const map = new window.google.maps.Map(mapElement, {
        center: { lat: coordinates[0], lng: coordinates[1] },
        zoom: 15,
    });

    // Add a marker at the farm location
    new google.maps.Marker({
        position: { lat: coordinates[0], lng: coordinates[1] },
        map: map,
        title: "Farm Location",
    });
};
