import './input.css'

const Input=({
    placeholder='Please Type (lat,lng)',
    onChange=()=>null,
    value='',
    className='mb8',
    error=false,
    errorMessage='Hatlı koordinat',
    icon=''
})=>{

    return(
        <div className={`text-input-wrapper ${className}`}>
        <input className='text-input' placeholder={placeholder} value={value} onChange={onChange} />
        {icon ?         <div className='text-input-icon'><img src={icon}  width={16} height={16}/></div>:<></>}
        {error ? <div className='error'>{errorMessage}</div>:<></> }
        </div>
    )

}
export default Input