import {useState} from 'react';
const useIsLogin = () => {
    const [isLogin ,setIsLogin]=useState(false)
    if(isLogin===false){
        return false;
    }
    return (
        true
    )
}

export default useIsLogin;