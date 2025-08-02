import React, { useState } from 'react';
import { Image, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import bg from './images/bg.jpg'
import cloudy from './images/cloudy.png'
import wind from './images/wind.png'
import sunrise from './images/sunrise.png'
import humidity from './images/humidity.png'
import thunder from './images/thunder.png'
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { MapPinIcon as LocationIcon } from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/solid";
import { CalendarDaysIcon } from "react-native-heroicons/solid";
function AppScreen() {
  const insets = useSafeAreaInsets();
  const [showSearch, setShowSearch] = useState(false);
  const [location, setLoaction] = useState([1, 2, 3]);
  const handlePress = (location) => {
    setShowSearch(false)
  }
  return (
    <View className='flex-1'>
      <StatusBar barStyle={'light-content'} />
      <Image
        source={bg}
        blurRadius={50}
        className='h-full w-full absolute'
        resizeMode='cover' />
      <View className='flex-1' style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
        <View style={{ height: '7%' }} className='mx-4'>
          <View className={`${showSearch ? 'bg-white opacity-[0.2]' : 'bg-transparent'} rounded-full flex-row items-center justify-between`}>
            {showSearch ? (
              <TextInput
                placeholder='Search City'
                placeholderTextColor={'white'}
                className='pl-6 text-white font-bold text-base flex-1' />
            ) : (
              <TouchableOpacity
                className='bg-white opacity-[0.2] p-3 m-1 rounded-full'>
                <LocationIcon color={'white'} />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              className={`bg-white ${showSearch ? 'opacity-[0.8]' : 'opacity-[0.2]'} p-3 m-1 rounded-full`}
              onPress={() => setShowSearch(!showSearch)} >
              <MagnifyingGlassIcon color={'white'} />
            </TouchableOpacity>
          </View>
          {location.length > 0 && showSearch ? (
            <View style={{ marginTop: '17%' }} className='bg-white absolute w-full rounded-3xl z-10'>
              {
                location.map((loc, index) => {
                  let showborder = index + 1 != location.length;
                  return (
                    <TouchableOpacity
                      key={index}
                      className={`flex-row mb-1 p-3 px-4 items-center ${showborder ? 'border-b-2 border-b-gray-400' : null}`}
                      onPress={() => handlePress()}>
                      <MapPinIcon color={'gray'} />
                      <Text className='text-black text-lg ml-2'>Noida, India</Text>
                    </TouchableOpacity>
                  )
                })
              }
            </View>
          ) : null}
        </View>
        <View className='flex-1 mx-4 justify-around'>
          <Text className='text-white text-center font-bold text-2xl'>Noida, <Text className='text-lg font-semibold text-gray-300'>INida</Text></Text>
          <View className='justify-center flex-row'>
            <Image
              source={cloudy}
              resizeMode='contain'
              className='h-52 w-52' />
          </View>
          <View className='space-y-2'>
            <Text className='font-bold text-white text-6xl text-center ml-5'>23&#176;</Text>
            <Text className='text-white text-xl text-center'>Kinda Cloudy</Text>
          </View>
          <View className='flex-row justify-between mx-4'>
            <View className='flex-row space-x-2 items-center'>
              <Image
                source={wind}
                className='h-7 w-7'
                resizeMode='contain'
                style={{ tintColor: 'white' }} />
              <Text className='text-white text-base font-bold'>22km</Text>
            </View>
            <View className='flex-row space-x-2 items-center'>
              <Image
                source={humidity}
                className='h-7 w-7'
                resizeMode='contain'
                style={{ tintColor: 'white' }} />
              <Text className='text-white text-base font-bold'>23%</Text>
            </View>
            <View className='flex-row space-x-2 items-center'>
              <Image
                source={sunrise}
                className='h-7 w-7'
                resizeMode='contain'
                style={{ tintColor: 'white' }} />
              <Text className='text-white text-base font-bold'>6:05 AM</Text>
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
            <View className='w-24 rounded-3xl py-3 space-y-1 mr-4 bg-white/30 items-center justify-center'>
              <Image source={thunder}
                className='h-11 w-11'
                resizeMode='contain' />
              <Text className='text-white'>Monday</Text>
              <Text className='text-white font-semibold text-lg'>23&#176;</Text>
            </View>
            <View className='w-24 rounded-3xl py-3 space-y-1 mr-4 bg-white/30 items-center justify-center'>
              <Image source={thunder}
                className='h-11 w-11'
                resizeMode='contain' />
              <Text className='text-white'>Tuesday</Text>
              <Text className='text-white font-semibold text-lg'>23&#176;</Text>
            </View>
            <View className='w-24 rounded-3xl py-3 space-y-1 mr-4 bg-white/30 items-center justify-center'>
              <Image source={thunder}
                className='h-11 w-11'
                resizeMode='contain' />
              <Text className='text-white'>Wednesday</Text>
              <Text className='text-white font-semibold text-lg'>23&#176;</Text>
            </View>
            <View className='w-24 rounded-3xl py-3 space-y-1 mr-4 bg-white/30 items-center justify-center'>
              <Image source={thunder}
                className='h-11 w-11'
                resizeMode='contain' />
              <Text className='text-white'>Thursday</Text>
              <Text className='text-white font-semibold text-lg'>23&#176;</Text>
            </View>
            <View className='w-24 rounded-3xl py-3 space-y-1 mr-4 bg-white/30 items-center justify-center'>
              <Image source={thunder}
                className='h-11 w-11'
                resizeMode='contain' />
              <Text className='text-white'>Friday</Text>
              <Text className='text-white font-semibold text-lg'>23&#176;</Text>
            </View>
            <View className='w-24 rounded-3xl py-3 space-y-1 mr-4 bg-white/30 items-center justify-center'>
              <Image source={thunder}
                className='h-11 w-11'
                resizeMode='contain' />
              <Text className='text-white'>Saturday</Text>
              <Text className='text-white font-semibold text-lg'>23&#176;</Text>
            </View>
            <View className='w-24 rounded-3xl py-3 space-y-1 bg-white/30 items-center justify-center'>
              <Image source={thunder}
                className='h-11 w-11'
                resizeMode='contain' />
              <Text className='text-white'>Sunday</Text>
              <Text className='text-white font-semibold text-lg'>23&#176;</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
export default AppScreen;