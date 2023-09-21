import useLocationContext from '../hooks/use-location-context';
import styled, { css } from 'styled-components';
import { Location }  from '../interfaces/Location';

interface IItem {
    active?: string;
}

interface IProps {
    locations: Location[],
    activeLocationIndex: number,
}

const List = styled.ul`
    position: absolute;
    background-color: #21293A;
    list-style: none;
    width: 100%;
    margin: 0;
    padding: 0;
    z-index: 1;
`;

const Item = styled.li<IItem>`
    width: 100%;
    margin: 0;
    padding: 0.5em;
    text-align: left;
    color: #fff;
    box-sizing: border-box;
    cursor: pointer;
    border-bottom: 1px solid grey;
    transition: all .3s ease;

    &:hover {
        color: #ffcc59;
        border-bottom-color: #00c3f5;
    }

    ${({ active }) =>
        active === 'true' &&
        css`
            color: #ffcc59;
            border-bottom-color: #00c3f5;
        `}
`;

function LocationsList({locations, activeLocationIndex}: IProps) {
    const { setLocation } = useLocationContext();

    const handleClick = (selectedLocation: Location) => {
        setLocation(selectedLocation)
    };

    let content;
    content = locations.map((result: Location, index: number) => {
        return <Item
            key={`${result.latitude}${result.longitude}`} 
            onClick={() => handleClick(result)}
            active={(activeLocationIndex === index).toString()}
        >{result.name}</Item>
    });

    return <List>
        {content}
    </List>
}

export default LocationsList;