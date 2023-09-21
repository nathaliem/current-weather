import { createContext, useState, ReactNode } from 'react';
import { Location } from '../interfaces/Location';

interface IProps {
    children: ReactNode
}

interface LocationContextType {
    getName: () => string;
    getCoordinates: () => {lat: number, long: number};
    setLocation: (location: Location) => void;
}

export const LocationContext = createContext<LocationContextType>({
    getName() { return 'name' },
    getCoordinates() { return { lat: 0, long: 0 } },
    setLocation() {},
});

function Provider({ children }: IProps) {
    const [location, setLocation] = useState({name: '', latitude: 0, longitude: 0});

    const getName = () => {
        return location.name;
    }

    const getCoordinates = () => {
        return {
            lat: location.latitude,
            long: location.longitude,
        };
    };

    const locationObject: LocationContextType = {
        getName,
        getCoordinates,
        setLocation,
    };

    return <LocationContext.Provider value={locationObject}>
        { children }
    </LocationContext.Provider>
}

export { Provider };
export default LocationContext;