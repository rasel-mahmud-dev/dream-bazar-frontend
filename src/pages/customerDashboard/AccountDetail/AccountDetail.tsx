import React, {useEffect} from 'react';
import {fetchCustomerProfileAction, updateCustomerProfileAction} from "actions/userAction";
import useAppDispatch from "src/hooks/useAppDispatch";
import useAppSelector from "src/hooks/useAppSelector";
import Circle from "UI/Circle/Circle";
import {CgPen} from "react-icons/all";
import Avatar from "UI/Avatar/Avatar";
import chooseImageNode from "src/utills/chooseImageNode";
import PublicProfile from "pages/customerDashboard/AccountDetail/PublicProfile";

const AccountDetail = () => {
    const {profile} = useAppSelector(state => state.authState)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchCustomerProfileAction())
    }, [])



    function updateCustomerAvatar(e){
        let files = e.target.files
        if(files && files.length > 0){
            let formData = new FormData()
            formData.append(e.target.name, files[0], files[0].fileName)
            dispatch(updateCustomerProfileAction([formData, function (error){
                if(error){
                    alert(error)
                }
            }]))
        }
    }




    return (
        <div>
            <h1 className="route-title">Profile</h1>
            <div>
                {profile && (
                    <div>
                        <div className="select-none">
                            <div className="w-max">
                                <Avatar
                                    className="w-32 !h-32"
                                    src={profile?.avatar}
                                    username={profile.username}
                                    alt={profile.username}
                                />

                                <Circle onClick={() => chooseImageNode("avatar", updateCustomerAvatar)} className="mx-auto mt-2">
                                    <CgPen/>
                                </Circle>
                            </div>
                        </div>

                        <h2>{profile?.username}</h2>
                        <div>
                            <li>{profile?.email}</li>
                            <li>{profile?.phone}</li>
                        </div>
                    </div>
                )}

                <PublicProfile profile={profile} />
            </div>
        </div>
    );
};

export default AccountDetail;