import { useEffect, useState } from 'react';
import { RotateLoader } from 'react-spinners';
import WeatherIcon from "./WeatherIcon";
import { getForecast, getWeatherInterpretation } from "../api/weather";
import useLocationContext from '../hooks/use-location-context';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 80%;
    min-height: 300px;
    position: relative;
    text-align: center;
    margin: 0 auto;
    padding: 1em;
    top: 50%;
    transform: translateY(-50%);
`;

const Content = styled.div`
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
`;

const IconWrapper = styled.div`
    height: 180px;
    font-size: 150px;
    color: #d3d3d3;
`;

const MinTemperature = styled.span`
    font-weight: 300;
    color: #d3d3d3;
`;

const MaxTemperature = styled.span`
    margin-right: 0.3em;
    font-weight: 600;
`;

interface Position {
    coords: {
        latitude: number,
        longitude: number,
    }
}

function Current() {
    const { getName, getCoordinates } = useLocationContext();
    const [ isLoading, setIsLoading ] = useState(false);
    const [weatherToday, setWeatherToday] = useState({min: 0, max: 0, code: 0});
    const [weatherDescription, setWeatherDescription] = useState('');
    const name = getName();
    const coordinates = getCoordinates();

    const getWeatherToday = async (lat: number, long: number) => {
        await getForecast(lat, long).then((response) => {
            setWeatherToday({
                min: response.daily.temperature_2m_min[0],
                max: response.daily.temperature_2m_max[0],
                code: response.daily.weathercode[0],
            })
            setWeatherDescription(getWeatherInterpretation(response.daily.weathercode[0]));
        });
        setIsLoading(false);
    };

    useEffect(() => {
        setIsLoading(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(handleCurrentPosition)
        }
    }, []);

    function handleCurrentPosition(position: Position) {
        getWeatherToday(position.coords.latitude, position.coords.longitude);
    }

    useEffect(() => {
        if (name !== undefined) {
            getWeatherToday(coordinates.lat, coordinates.long);
        }
    }, [getCoordinates]);

  return (
    <Wrapper>
        <Content>
        {!isLoading ? (
            <>
                <IconWrapper>
                    <WeatherIcon weather={weatherDescription} />
                </IconWrapper>
                <div>
                    <h2 style={{color: '#ffcc59'}}>{name}</h2>
                    <h3 style={{color: '#00c3f5'}}>{weatherDescription}</h3>
                    <p>
                        <MaxTemperature>{weatherToday.max}°</MaxTemperature>
                        <MinTemperature>{weatherToday.min}°</MinTemperature>
                    </p>
                </div>
            </>
        ) : <RotateLoader color='#d3d3d3' />}
        </Content>
    </Wrapper>
  );
}

export default Current;
