import React, {useEffect} from 'react'
import {useParams} from "react-router-dom"
import {Button} from "UI/index"

import {fetchAllStores} from "actions/authAction";
import useAppDispatch from "src/hooks/useAppDispatch";
import useAppSelector from "src/hooks/useAppSelector";


const StoreList = (props) => {

    const {authState: {auth, stores}} =  useAppSelector(state=>state)

    let params = useParams()


    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(fetchAllStores())
    }, [])


    function handlePushBack() {
        // history.back()
        // history.goBack()
    }

    console.log(stores)



    return (
        <div>
            <h1>Store List</h1>
            <div className="p-5 bg-primary d-flex justify-space-between">
                <div>
                    <p>Total store showing: {stores?.length}</p>
                </div>
                <div>
                    <i className="fa fa-filter"/>
                </div>
            </div>

            { stores && stores?.length > 0 ? (
                <div>
                    <div>
                        <div>
                            {stores.map(store=>(
                                <div>
                                    <h4>{store.shopName}</h4>
                                </div>
                            )) }
                        </div>
                    </div>
            </div>
            ): (
                <h4 className="heading-4">No Store found</h4>
            ) }


            <Button onClick={handlePushBack}>Registration Now</Button>
        </div>
    )
}

function mapStateToProps(state) {
    return {}
}

export default StoreList