import { render, screen } from '@testing-library/react';
import LocationsList from '../components/LocationsList';

const testLocations = [
    {
        name: 'Antwerp',
        latitude: 3000,
        longitude: 4000,
    },
    {
        name: 'Brussels',
        latitude: 2100,
        longitude: 4200,
    },
    {
        name: 'Gent',
        latitude: 2800,
        longitude: 4200,
    },
    {
        name: 'Leuven',
        latitude: 600,
        longitude: 4900,
    },
    {
        name: 'Sint-Niklaas',
        latitude: 300,
        longitude: 500,
    },
    {
        name: 'Kortrijk',
        latitude: 900,
        longitude: 4600,
    },
];

const renderLocationList = (index: number) => {
    return render(<LocationsList locations={testLocations} activeLocationIndex={index} />);
}

test('renders the locations', () => {
    const index = 0;
    const { getByText } = renderLocationList(index);
    testLocations.forEach((location) => {
        expect(getByText(location.name)).toBeInTheDocument();
    });
});

test('sets the active location item', () => {
    const index = 4;
    renderLocationList(index);

    const expectedActiveLocation = testLocations[index].name;
    
    const activeLocation = screen.getByText(expectedActiveLocation);
    expect(activeLocation.getAttribute('active')).toBe('true');
});
