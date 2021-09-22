import 'babel-polyfill';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { validateIp } from './helpers/validate-ip';
import { addTileLayer } from './helpers/add-tile-layer';
import icon from '../images/icon-location.svg';
import { addOffset } from './helpers/add-offset';

const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('.search-bar__btn');

const ipInfo = document.querySelector('#ip');
const locationInfo = document.querySelector('#location');
const timeZoneInfo = document.querySelector('#timezone');
const ispInfo = document.querySelector('#isp');

btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleKey);

const markerIcon = L.icon({
    iconUrl: icon,
    iconSize: [30, 40]
});

const mapArea = document.querySelector('.map');
const map = L.map(mapArea, {
    center: [51.505, -0.09],
    zoom: 13,
    zoomControl: false
});

addTileLayer(map);

L.marker([51.505, -0.09], { icon: markerIcon }).addTo(map);

function getData() {
    if (validateIp(ipInput.value)) {
        fetch(`
        https://geo.ipify.org/api/v1?apiKey=at_Q2UVKTzr3q6OQ4bQdmFxYu8CMhnyq&ipAddress=${ipInput.value}`)
            .then(response => response.json())
            .then(setInfo);
    }
}

function handleKey(e) {
    if (e.key === 'Enter') {
        getData();
    }
}

function setInfo(mapData) {
    const { lat, lng, country, region, timezone } = mapData.location;
    ipInfo.innerText = mapData.ip;
    locationInfo.innerText = country + ' ' + region;
    timeZoneInfo.innerText = timezone;
    ispInfo.innerText = mapData.isp;
    map.setView([lat, lng]);
    L.marker([lat, lng], { icon: markerIcon }).addTo(map);

    if (matchMedia("(max-width: 1023px)").matches) {
        addOffset(map);
    }


}

document.addEventListener('DOMContentLoaded', () => {
    getAddress('102.22.22.1').then(setInfo)
});