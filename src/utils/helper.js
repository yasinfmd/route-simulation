import location from '../assets/location-icon.png'

    
    const  calculateNewCoordinates=(lat1, lon1, lat2, lon2)=> {
    const distance = Math.floor(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(lat1,lon1),new google.maps.LatLng(lat2,lon2))/1000)
    const newCoordinates = [];
    for (let i = 0; i <= distance; i++) {
      const f = i / distance;
      const lat = lat1 + f * (lat2 - lat1);
      const lon = lon1 + f * (lon2 - lon1);
      const coordinate = { lat, lng:lon };
      newCoordinates.push(coordinate);
    }
    return newCoordinates;
  }

  const getLineSymbol=()=>{
    return {
    path: google.maps.SymbolPath.CIRCLE,
    strokeOpacity: 1,
    fillOpacity: 1,
    scale: 3
  };
}
  const calculateSpeed=(windDirection, windSpeed, shipSpeed)=> {
    const windDirRad = windDirection * Math.PI / 180;
    const windComponent = windSpeed * Math.cos(windDirRad);
    const totalSpeed = shipSpeed + windComponent;
    return totalSpeed;
  }

  const getWindSpeed=async (lat,lng)=>{
    try {
      const result = await fetch(`http://localhost:5005?lat=${lat}&lng=${lng}`,{
        method:"GET",
      })
      const response=await result.json()
      return response
    } catch (error) {
        return null
    }
}

const isValidCoordinate=(lat, lng)=> {
  if (typeof lat !== 'number' || typeof lng !== 'number') {
    return false;
  }
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
    return false;
  }
  const latLng = new google.maps.LatLng(lat, lng);
  if (!latLng || isNaN(latLng.lat()) || isNaN(latLng.lng())) {
    return false;
  }
  const mapBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(-90, -180),
    new google.maps.LatLng(90, 180) 
  );
  if (!mapBounds.contains(latLng)) {
    return false;
  }
  return true;
}
const createMarker=(position,map)=>{
    return new window.google.maps.Marker({
        position,
        map,
        optimized:true,
        icon:location

    })
}

export{calculateNewCoordinates , calculateSpeed,getLineSymbol,getWindSpeed,createMarker,isValidCoordinate}
