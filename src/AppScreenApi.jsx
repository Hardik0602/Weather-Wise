import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Image, Keyboard, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import bg from './images/bg.jpg'
import wind from './images/wind.png'
import sunrise from './images/sunrise.png'
import humidity from './images/humidity.png'
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { MapPinIcon as LocationIcon } from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/solid";
import { CalendarDaysIcon } from "react-native-heroicons/solid";
import { debounce } from 'lodash';
import { fetchLocation, fetchWeatherForecast } from './Api.js';
import * as Progress from 'react-native-progress';
import { check, openSettings, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
function AppScreen() {
    const insets = useSafeAreaInsets()
    const [showSearch, setShowSearch] = useState(false)
    const [locations, setLocations] = useState([])
    const [weather, setWeather] = useState({})
    const [loading, setLoading] = useState(true)
    const handleLocation = (loc) => {
        // console.log(loc)
        setLocations([])
        setShowSearch(false)
        setLoading(true)
        fetchWeatherForecast({
            cityName: loc.name,
            days: '7'
        }).then(data => {
            // console.log(data)
            setWeather(data)
            setLoading(false)
        })
    }
    const handleCurrentLocation = async () => {
        try {
            const permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
            let result = await check(permission)
            if (result === RESULTS.DENIED || result === RESULTS.BLOCKED) {
                result = await request(permission)
            }
            if (result === RESULTS.GRANTED) {
                setLoading(true)
                Geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords
                        await fetchWeatherForecastCoords(latitude, longitude)
                    },
                    (error) => {
                        setLoading(false)
                        console.log('error: ' + error.message)
                        if (error.code === 2) {
                            Alert.alert(
                                'location disabled',
                                'please enable location',
                                [
                                    { text: 'cancel', style: 'cancel' },
                                    { text: 'open settings', onPress: () => openSettings() }
                                ]
                            )
                        }
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 15000,
                        maximumAge: 10000,
                        forceRequestLocation: true,
                        showLocationDialog: true
                    }
                )
            } else {
                Alert.alert(
                    'permission denied',
                    'location permission is needed',
                    [
                        { text: 'cancel', style: 'cancel' },
                        { text: 'open settings', onPress: () => openSettings() }
                    ]
                )
            }
        } catch (error) {
            console.log('error: ' + error)
            setLoading(false)
        }
    }
    const fetchWeatherForecastCoords = async (latitude, longitude) => {
        fetchWeatherForecast({
            cityName: `${latitude},${longitude}`,
            days: '7'
        }).then(data => {
            setWeather(data)
            setLoading(false)
        })
    }
    const handleSearch = value => {
        // console.log(value)
        if (value.length > 2) {
            fetchLocation({ cityName: value }).then(data => {
                // console.log(data)
                setLocations(data)
            })
        }
        else {
            setLocations([])
        }
    }
    const handleTextDebounce = useCallback(debounce(handleSearch, 1200), [])
    const { current, location } = weather
    const fetchMyLocationData = async () => {
        fetchWeatherForecast({
            cityName: 'Noida',
            days: '7'
        }).then(data => {
            setWeather(data)
            setLoading(false)
        })
    }
    useEffect(() => {
        fetchMyLocationData()
    }, [])
    return (
        <View className='flex-1'>
            <StatusBar barStyle={'light-content'} />
            <Image
                source={bg}
                blurRadius={50}
                className='h-full w-full absolute'
                resizeMode='cover' />
            {loading ? (
                <View className='flex-1 items-center justify-center'>
                    <Progress.CircleSnail thickness={10} size={140} color={'#87CEFA'} />
                </View>
            ) : (
                <TouchableWithoutFeedback
                    onPress={() => { Keyboard.dismiss, setShowSearch(false), setLocations([]) }}
                    accessibility={false}>
                    <View className='flex-1' style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
                        <View style={{ height: '7%' }} className='mx-4'>
                            <View className={`${showSearch ? 'bg-white opacity-[0.2]' : 'bg-transparent'} rounded-full flex-row items-center justify-between`}>
                                {showSearch ? (
                                    <TextInput
                                        onChangeText={handleTextDebounce}
                                        placeholder='Search City'
                                        placeholderTextColor={'white'}
                                        className='pl-6 text-white font-bold text-base flex-1' />
                                ) : (
                                    <TouchableOpacity
                                        className='bg-white opacity-[0.2] p-3 m-1 rounded-full'
                                        onPress={handleCurrentLocation}>
                                        <LocationIcon color={'white'} />
                                    </TouchableOpacity>
                                )}
                                <TouchableOpacity
                                    className={`bg-white ${showSearch ? 'opacity-[0.8]' : 'opacity-[0.2]'} p-3 m-1 rounded-full`}
                                    onPress={() => { setShowSearch(!showSearch), setLocations([]) }} >
                                    <MagnifyingGlassIcon color={'white'} />
                                </TouchableOpacity>
                            </View>
                            {locations.length > 0 && showSearch ? (
                                <View style={{ marginTop: '17%' }} className='bg-white absolute w-full rounded-3xl z-10'>
                                    {
                                        locations.map((loc, index) => {
                                            let showborder = index + 1 != locations.length;
                                            return (
                                                <TouchableOpacity
                                                    key={index}
                                                    className={`flex-row mb-1 p-3 px-4 items-center ${showborder ? 'border-b-2 border-b-gray-400' : null}`}
                                                    onPress={() => handleLocation(loc)}>
                                                    <MapPinIcon color={'gray'} />
                                                    <Text className='text-black text-lg ml-2'>{loc?.name}, {loc.country}</Text>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </View>
                            ) : null}
                        </View>
                        <View className='flex-1 mx-4 justify-around'>
                            <Text className='text-white text-center font-bold text-2xl'>{location?.name}, <Text className='text-lg font-semibold text-gray-300'>{location?.country}</Text></Text>
                            <View className='justify-center flex-row'>
                                <Image
                                    source={{ uri: 'https:' + current?.condition?.icon }}
                                    resizeMode='contain'
                                    className='h-52 w-52' />
                            </View>
                            <View className='space-y-2'>
                                <Text className='font-bold text-white text-6xl text-center ml-5'>{current?.temp_c}&#176;</Text>
                                <Text className='text-white text-xl text-center'>{current?.condition?.text}</Text>
                            </View>
                            <View className='flex-row justify-between mx-4'>
                                <View className='flex-row space-x-2 items-center'>
                                    <Image
                                        source={wind}
                                        className='h-7 w-7'
                                        resizeMode='contain'
                                        style={{ tintColor: 'white' }} />
                                    <Text className='text-white text-base font-bold'>{current?.wind_kph}km</Text>
                                </View>
                                <View className='flex-row space-x-2 items-center'>
                                    <Image
                                        source={humidity}
                                        className='h-7 w-7'
                                        resizeMode='contain'
                                        style={{ tintColor: 'white' }} />
                                    <Text className='text-white text-base font-bold'>{current?.humidity}%</Text>
                                </View>
                                <View className='flex-row space-x-2 items-center'>
                                    <Image
                                        source={sunrise}
                                        className='h-7 w-7'
                                        resizeMode='contain'
                                        style={{ tintColor: 'white' }} />
                                    <Text className='text-white text-base font-bold'>{weather?.forecast?.forecastday[0]?.astro?.sunrise}</Text>
                                </View>
                            </View>
                        </View>
                        <View className='space-y-3'>
                            <View className='flex-row space-x-2 mx-5'>
                                <CalendarDaysIcon color={'white'} />
                                <Text className='text-white text-base'>Daily Forcast</Text>
                            </View>
                            <ScrollView
                                horizontal
                                contentContainerStyle={{ paddingHorizontal: 15, marginBottom: 15 }}
                                showsHorizontalScrollIndicator={false}>
                                {weather?.forecast?.forecastday?.map((item, index) => {
                                    return (
                                        <View
                                            className='w-24 rounded-3xl py-3 space-y-1 mr-4 bg-white/30 items-center justify-center'
                                            key={index}>
                                            <Image source={{ uri: 'https:' + item?.day?.condition?.icon }}
                                                className='h-11 w-11'
                                                resizeMode='contain' />
                                            <Text className='text-white'>{new Date(item?.date).toLocaleDateString('en-US', { weekday: 'long' })}</Text>
                                            <Text className='text-white font-semibold text-lg'>{item?.day?.avgtemp_c}&#176;</Text>
                                        </View>
                                    )
                                })}
                            </ScrollView>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            )}
        </View>
    );
}
export default AppScreen;