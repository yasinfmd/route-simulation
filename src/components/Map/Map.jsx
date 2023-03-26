import React, { useState,useRef,useEffect } from 'react'
import {calculateNewCoordinates,calculateSpeed,getLineSymbol,getWindSpeed,createMarker} from '../../utils/helper'
import { MAP_CONFIG,DEFAULT_SPEED } from '../../consts';
import point from '../../assets/point.png'
let currentSpeed=0;

const MapComponent=({paths,startPos})=>{
    const startIndex=useRef(0)
    const ref=useRef(null)
    const [map,setMap]=useState(null)
    const[points,setPoints]=useState([])
    const [lines,setLines]=useState([])
    const [marker,setMarker]=useState(null)
  
    useEffect(()=>{
        if(ref.current && !map){
            setMap(new window.google.maps.Map(ref.current,{
              ...MAP_CONFIG,
              center:startPos,
            }))
        }
    },[ref,map])

    const calcCoordPoints=()=>{
        let _points=[]
        for (let index = 0; index < paths.length; index++) {
            if(paths[index+1]){
              const coords=calculateNewCoordinates(paths[index].lat,paths[index].lng,
                paths[index+1].lat,
                paths[index+1].lng,
                DEFAULT_SPEED
                )
                _points=_points.concat([...coords])}
            }
            return _points
    }

    const generatePolyLine=(p)=>{
        const lineArray=[]
        for (let j = 0; j < p.length; j++) {
            lineArray.push(
              new google.maps.Polyline({
                path: [p[j], p[j+1]],
                strokeOpacity: 0,
                icons: [
                  {
                    icon: getLineSymbol(),
                    offset: "100",
                  },
                ],
                strokeColor: "red" ,
                map: map
              })
            );
            
          }
          setLines(lineArray)
    }

    const movement=()=>{
        let t= setInterval(async ()=>{
           startIndex.current=startIndex.current<0?0:startIndex.current
           if(!points[startIndex.current +1]){
             clearInterval(t)
             return
           } 
           const response = await getWindSpeed(startPos.lat,startPos.lng)
           if(startIndex.current!=0 && response?.windDirection && response?.windSpeed){
               currentSpeed=Math.floor(calculateSpeed(response.windDirection,response.windSpeed,DEFAULT_SPEED))
           }
           let dif=(DEFAULT_SPEED - Math.abs(currentSpeed))
           if(dif<0 && startIndex.current!=0){
             let posDiff=Math.abs(dif)
             for (let index = 0; index < posDiff; index++) {
               lines[((startIndex.current - posDiff))+index].setOptions({
                 path: [points[((startIndex.current - posDiff))+index], points[((startIndex.current - posDiff))+index+1]],
                 strokeOpacity: 0,
                 icons: [
                   {
                     icon: getLineSymbol(),
                     offset: "100",
                   },
                 ],
                 strokeColor: "red" ,
                 map: map
               })
             }
             startIndex.current= startIndex.current - Math.abs((DEFAULT_SPEED - Math.abs(currentSpeed)))
           }else{
             startIndex.current=startIndex.current + Math.abs(DEFAULT_SPEED - Math.abs(currentSpeed))>=points.length?points.length-1:startIndex.current + Math.abs(DEFAULT_SPEED - Math.abs(currentSpeed))
               for (let index = 0; index < startIndex.current; index++) {
                 lines[index].setOptions({
                   path: [points[index], points[index+1]],
                   strokeOpacity: 0,
                   icons: [
                     {
                       icon: getLineSymbol(),
                       offset: "100",
                     },
                   ],
                   strokeColor: "green" ,
                   map: map
                 })
               }
               startPos.lat=points[startIndex.current].lat
               startPos.lng= points[startIndex.current].lng
              marker.setPosition({lat:startPos.lat,lng:startPos.lng})
              map.setCenter(marker.getPosition());
           }
     
         },1000)
       }
    const generatePointsMarker=()=>{
        for (let index = 0; index < paths.length; index++) {
            new window.google.maps.Marker({
                position:paths[index],
                map,
                optimized:true,
                icon:point
        
            })
        }
    }
    useEffect(()=>{
        if(map && paths.length>0){
            generatePointsMarker()
            setMarker(createMarker(startPos,map))
            let _points=calcCoordPoints()
            setPoints(_points)
            generatePolyLine(_points)
        }
    },[map,paths])

    useEffect(()=>{
        if(lines.length>0 && points.length>0 && map && marker){
            movement()
        }
    },[lines,points,map,marker])
  
    return(
        <div ref={ref} style={{width:'100%',height:'100%'}}></div>
    )
  }
  export default MapComponent