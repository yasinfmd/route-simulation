import './wrapper.css'

const FormWrapper=({
    children
})=>{
    return(
        <div className='vh vw wrapper'>
            <div className='50vw'>
                {children}
            </div>
        </div>
    )
}
export default FormWrapper