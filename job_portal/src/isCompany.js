const isCompany =()=>{
    if(localStorage.getItem('userType')==='company'){
        return true
    }else {
        return false
    }
}

export default isCompany
