import './button.css'
const Button=({
    text='Go !',
    onClick
})=>{
    return(
        <button className="btn" onClick={onClick}>{text}</button>
    )
}
export default Button