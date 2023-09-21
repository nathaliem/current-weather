import { useContext } from 'react';
import LocationContext from '../context/location';

export default function useLocationContext() {
    return useContext(LocationContext);
};
