import { useState } from 'react'
import Button from '../Button/Button'
import Input from '../Input/Input'
import TextButton from '../TextButton/TextButton'
import './card.css'
import { isValidCoordinate } from '../../utils/helper'
import { MAX_POINT_COUNT } from '../../consts'
import flag from '../../assets/flag.svg'
import location from '../../assets/location-icon.png'

const Card=({onNext})=>{
    const [startPointError,setStartPointError]=useState(false)
    const [startPoint,setStartPoint]=useState('')
    const [points,setPoints]=useState([{
        value:'',
        error:false
    }])
    const validatePoints=()=>{
        const sp=startPoint.split(',')
        const spError=sp.length===2?!isValidCoordinate(Number(sp[0]),Number(sp[1])):true
        setStartPointError(spError)
        const arr=[...points]
        for (let index = 0; index < arr.length; index++) {
            const p = arr[index].value.split(',');
            arr[index].error=p.length === 2? !isValidCoordinate(Number(p[0]),Number(p[1])):true
        }
        setPoints(arr)
        const errors=arr.map((item)=>item.error)
        if(!errors.includes(true) && spError !== true){
            if(onNext instanceof Function) {
                onNext(points.map((item)=>{
                    return {
                        lat:Number(item.value.split(',')[0]),
                        lng:Number(item.value.split(',')[1])
                    }
                }),{lat:Number(sp[0]),lng:Number(sp)[1]})
            }
        }
    }
    return(
        <div className="card">
            <div className='title'>Welcome abord !</div>
            <div className='subtitle'>Let's create your journey</div>
            <Input
            icon={flag}
            error={startPointError} placeholder='Start point (lat,lng)' value={startPoint} onChange={(e)=>{
                    setStartPoint(e.target.value)
            }} />
            {points.map((item,i)=>{
                return(
                    <Input 
                    icon={location}
                    key={'input_item_'+i} value={item.value} onChange={(e)=>{
                        const arr=[...points]
                        arr[i].value=e.target.value
                        setPoints(arr)
                    }} error={item.error} />
                )
            })}
            <TextButton text='Add Checkpoint' onClick={()=>{
                const arr=[...points]
                if(arr.length<MAX_POINT_COUNT){
                    arr.push({value:'',error:false})
                    setPoints(arr)
                }
            }} />

            <Button onClick={()=>{
                    validatePoints()
            }} />


        </div>
    )
}
export default Card