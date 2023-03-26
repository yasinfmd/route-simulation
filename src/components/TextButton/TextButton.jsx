import './textbutton.css'

const TextButton=({
    text='',
    onClick
})=>{
    return(
        <div className='textbutton' onClick={onClick}>{text}</div>
    )
}
export default TextButton