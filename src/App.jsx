import React, { useState } from 'react'
import { Wrapper } from "@googlemaps/react-wrapper";
import MapComponent from './components/Map/Map';
import Card from './components/Card/Card';
import FormWrapper from './components/Wrapper/Wrapper';
function App() {
  const [paths,setPaths]=useState([])
  const [startPoint,setStartPoint]=useState({lat:0,lng:0})
  return (
      <div  className='vh vw'>
      <Wrapper libraries={['geometry']} apiKey={import.meta.env.VITE_MAP_KEY} render={()=><></>} language="tr">
      {paths.length<1 ? <FormWrapper>
        <Card onNext={(_paths,_sp)=>{
          setPaths(_paths)
          setStartPoint(_sp)
        }} />
      </FormWrapper>:<MapComponent paths={paths} startPos={startPoint} />}
      </Wrapper>
    </div>
  )
}

export default App
