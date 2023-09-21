import { useRef, useState, KeyboardEvent } from "react";
import { MdSearch } from 'react-icons/md';
import { Location } from '../interfaces/Location';
import useLocationContext from '../hooks/use-location-context';
import { getMatchingLocations } from '../api/weather';
import LocationsList from "./LocationsList";
import styled from 'styled-components';

const SearchBar = styled.div`
    position: fixed;
    top: 0;
    height: 50px;
    width: 100%;
    text-align: right;
    z-index: 1;
`;

const FlexContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
    padding: .5em;
`;

const InputContainer = styled.div`
    position: relative;
`;

const Input = styled.input`
    border: 0;
    background-color: #fff;
    padding: .8em;
    margin-right: 0.3em;
    font-size: 1em;
    font-weight: 300;
    &:focus {
        outline: 0;
    }
`;

const SearchIcon = styled(MdSearch)`
    font-size: 32px;
    cursor: pointer;
    transition: color .5s ease;
    &:hover {
        color: #00c3f5;
    }
`;

function Search() {
    const { setLocation } = useLocationContext();
    const [showInput, setShowInput] = useState(false);
    const [locations, setLocations] = useState<Location[]>([]);
    const [selectedLocationIndex, setCurrentLocationIndex] = useState(0);
    const inputRef = useRef(null);

    async function getLocations(event: KeyboardEvent) {
        const keyCode = event.keyCode;
        if ([38, 40, 13].indexOf(keyCode) < 0) {
            const target = event.target as HTMLInputElement;
            const locationsList: Location[] = await getMatchingLocations(target.value);
            setLocations(locationsList);
        } else {
            handleLocationListNavigation(keyCode);
        }
    };

    function handleLocationListNavigation(keyCode: number) {
        const totalLocations = locations.length;
        let newLocationIndex: number = selectedLocationIndex;

        if (keyCode === 38) {
            if (selectedLocationIndex === 0) {
                newLocationIndex = totalLocations - 1;
            } else {
                newLocationIndex = selectedLocationIndex - 1;
            }
        }

        if (keyCode === 40) {
            if (selectedLocationIndex === totalLocations - 1) {
                newLocationIndex = 0;
            } else {
                newLocationIndex = selectedLocationIndex + 1;
            }
        }

        if (keyCode === 13) {
            setLocation(locations[newLocationIndex]);
            closeLocations();
        }

        setCurrentLocationIndex(newLocationIndex);
    };

    function closeLocations() {
        setLocations([]);
        setShowInput(false);
    }

    function handleOnBlur() {
        setTimeout(closeLocations, 100);
    }

    return <SearchBar>
        <FlexContainer>
            {showInput &&
                <InputContainer>
                    <Input type="text" autoFocus ref={inputRef} placeholder="Search location" onKeyUp={getLocations} onBlur={handleOnBlur} />
                    {locations && <LocationsList locations={locations} activeLocationIndex={selectedLocationIndex} />}
                </InputContainer>
            }
            <SearchIcon onClick={() => setShowInput(!showInput)} />
        </FlexContainer>
    </SearchBar>
}

export default Search;