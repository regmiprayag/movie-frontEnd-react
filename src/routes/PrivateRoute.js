
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { userActions } from "../store";
import { userDetails } from "../api-helpers/api-helper";

const PrivateRoute = ({ element }) => {
    // get user information
    const user = useSelector((state) => state.user.value);
    const [userData, setUserData] = useState({});

    const navigate = useNavigate()
    // const dispatch = useDispatch()

    const loadDataAndSetInfo = async () => {
        await userDetails().then((res) => setUserData(res)).catch(err => console.log(err));
    }

    useEffect(() => {
        if (Object.keys(user).length === 0) {
            const token = localStorage.getItem('token');
            
            if (token) {
                loadDataAndSetInfo();
            } else {
                console.log("Please login to continue!");
                navigate('/login/user')
            }
        } else {
            console.log("User Authenticated!");
        }
    }, [user])

    return element;
}

export default PrivateRoute
