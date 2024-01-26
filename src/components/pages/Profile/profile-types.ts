export interface Farm {
    id?: string;
    name: string;
    location: {
        type: string;
        coordinates: number[];
    };
}

export interface FarmListProps {
    farms: Farm[];
    onFarmLocationClick: (farm: Farm) => void;
}
