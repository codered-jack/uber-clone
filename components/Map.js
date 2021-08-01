import React,{useRef,useEffect} from 'react'
import { StyleSheet } from 'react-native'
import MapView,{Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'tailwind-react-native-classnames'
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../slices/navSlice';
import {GOOGLE_MAPS_APIKEY} from "@env"
const Map = () => {
    const origin = useSelector(selectOrigin)
    const destination = useSelector(selectDestination)
    const mapRef = useRef(null)
    const dispatch = useDispatch();
    mapRef.current?.fitToSuppliedMarkers(["origin","destination"],{
      edgePadding:{top:50,right:50,bottom:50,left:50}
  })
    useEffect(()=>{
        //if(!origin || !destination) return;
      //   mapRef.current?.fitToSuppliedMarkers(["origin","destination"],{
      //     edgePadding:{top:50,right:50,bottom:50,left:50}
      // })
    },[origin,destination])

    useEffect(()=>{
      if(!origin || !destination) return;
      const getTravelTime = async() => {
          fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?
          units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`)
          .then(res=>res.json())
          .then(data=>{
            dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
          })
      }

      getTravelTime();
    },[origin,destination,GOOGLE_MAPS_APIKEY])

    return (
        <MapView
        ref={mapRef}
        style={tw`flex-1`}
        mapType="mutedStandard"
        initialRegion={{
          latitude: 28.5562 ,//origin.location.latitude
          longitude: 77.1000,//origin.location.longitude
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
          {/* {origin && destination && (
              <MapViewDirections
                origin={origin?.description}
                destination={destination?.description}
                apiKey={GOOGLE_MAPS_APIKEY}
                strokeWidth={3}
                strokeColor="black"
              />
          )} */}
          <Marker coordinate={{  //origin?.location && (<Marker
                latitude: 28.5562 ,//origin.location.latitude
                longitude: 77.1000,//origin.location.longitude
          }}
          title="Origin"
          description={"Indira Gandhi International Airport, Delhi, India"}//origin.description
          identifier="origin"
          />

          <Marker coordinate={{  //origin?.location && (<Marker
                latitude: 28.6427 ,//destination.location.latitude
                longitude: 77.2199,//destination.location.longitude
          }}
          title="Destination"
          description={"Delhi Metro, Delhi, India"}//destination.description
          identifier="destination"
          />
        </MapView>
    )
}

export default Map

const styles = StyleSheet.create({})
