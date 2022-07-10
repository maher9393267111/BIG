
import React, {useState} from 'react';

import {Button, Select} from "antd";
import {YMaps, Map, Placemark, Clusterer} from 'react-yandex-maps';
//import './styles/YandexMap.css'
import points from './points.json'
//import {Option} from "antd/es/mentions";
const { Option } = Select;

const MapPage = () => {
    const pointsRegion = [
        [45.059988, 38.957221],
        [45.034228, 38.912224],
        [45.072758, 39.038617],
        [45.031483, 38.987719],
        [45.049348, 39.031170],
        [45.002002, 39.071999]
    ]

    const [coord, setCoord]=useState([45.031483, 38.987719])
    const mapState = {
        center: coord,
        zoom: 15,
        behaviors: ["default", "scrollZoom"]
    };
    const onChangeRegion = (val)=>{
        setCoord(pointsRegion[parseInt(val)])
    }

    const getPointData = (index) => {
        return {
            balloonContentBody: "Магнит. Кэшбэк: <strong>" + "5%" + "</strong>",
            clusterCaption: "Магнит <strong>" + index + "</strong>"
        };
    };

    const getPointOptions = () => {
        return {
            preset: "islands#violetIcon"
        };
    };

    return (
        <div className='map_custom'>
            <h5 className='map_txt'>Ближайшие магазины в
                <Select
                    defaultValue='Центральном микрорайоне'
                    onChange={(value)=>onChangeRegion(value)}
                    style={{
                        marginLeft: 10
                    }}
                >
                    <Option value={'0'}>Фестивальном микрорайоне</Option>
                    <Option value={'1'}>Юбилейном микрорайоне</Option>
                    <Option value={'2'}>Губернском микрорайоне</Option>
                    <Option value={'3'}>Центральном микрорайне</Option>
                    <Option value={'4'}>микрорайоне Панорама</Option>
                    <Option value={'5'}>микрорайоне Гидростроителей</Option>
                </Select>
            </h5>
            <div className='MapYandex'>
                <YMaps>
                    <Map
                        state={mapState}
                        width='100%'
                        height='100%'>
                        <Clusterer
                            options={{
                                preset: "islands#invertedVioletClusterIcons",
                                groupByCoordinates: false,
                                clusterDisableClickZoom: true,
                                clusterHideIconOnBalloonOpen: false,
                                geoObjectHideIconOnBalloonOpen: false
                            }}
                            modules={[
                                'geoObject.addon.balloon',
                                'geoObject.addon.hint'
                            ]}
                        >
                            {points.map((coordinates, idx) => (
                                <Placemark
                                    key={idx}
                                    geometry={coordinates}
                                    properties={getPointData(idx)}
                                    options={getPointOptions()}
                                />
                            ))}
                        </Clusterer>
                    </Map>

                </YMaps>
            </div>
        </div>
    );
};

export default MapPage;