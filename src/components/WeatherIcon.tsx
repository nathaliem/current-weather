import {
    WiDaySunny,
    WiDayCloudy,
    WiDayFog,
    WiDayHail,
    WiDayRain,
    WiDayThunderstorm,
    WiDayWindy,
} from 'react-icons/wi';

interface IProps {
    weather: string
}

function WeatherIcon({ weather }: IProps) {
    const weatherString = weather.toLowerCase();

    let icon = <WiDaySunny />;

    if (weatherString) {
        if (weatherString.includes('sun')) {
            icon = <WiDaySunny />
        } else if (weatherString.includes('cloud')) {
            icon = <WiDayCloudy />
        } else if (weatherString.includes('fog')) {
            icon = <WiDayFog />
        } else if (weatherString.includes('hail')) {
            icon = <WiDayHail />
        } else if (weatherString.includes('rain')) {
            icon = <WiDayRain />
        } else if (weatherString.includes('thunder')) {
            icon = <WiDayThunderstorm />
        } else if (weatherString.includes('wind')) {
            icon = <WiDayWindy />
        }
    }

    return (
        <>
            {icon}
        </>
    )
}

export default WeatherIcon;