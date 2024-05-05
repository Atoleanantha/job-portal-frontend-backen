import React from 'react'

const isApplicant =()=>{
    if(localStorage.getItem('userType')==='applicant'){
        return true
    }else {
        return false
    }
}

export default isApplicant
