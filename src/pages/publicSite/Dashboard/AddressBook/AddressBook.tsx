import React, {useEffect, useState} from 'react';
import "./shipping-address.scss"
import {Button} from "UI/index";
import {Link} from "react-router-dom";
import {getShippingAddresses} from "actions/authAction";
import useAppDispatch from "src/hooks/useAppDispatch";
import useAppSelector from "src/hooks/useAppSelector";
import {BiTrash, FaPenAlt} from "react-icons/all";
import Circle from 'src/components/UI/Circle/Circle';


const AddressBook = () => {

    const {shippingAddresses} = useAppSelector(state => state.authState)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getShippingAddresses())
    }, [])

    function handleDeleteAddress(id) {

    }

    return (
        <div>
            <div className="flex items-center justify-between">

                <h1 className="route-title">Address Books</h1>
                <Link to="/dashboard/address-books/add"><Button theme="primary">Add New</Button></Link>
            </div>

            <div>
                <div>
                    {shippingAddresses && shippingAddresses.map(shippingAddress => (
                        <div>
                            <div className="card overflow-hidden p-4 my-4">
                                <div className="flex flex-1 items-center justify-between">

                                    <div>
                                        <h4>
                                            <span className="inline-block font-normal text-sm w-[100px]">First Name:</span>
                                            <span>{shippingAddress.firstName}</span>
                                        </h4>
                                        <h4>

                                            <span className="inline-block font-normal text-sm w-[100px]">Last Name:</span>
                                            <span>{shippingAddress.lastName}</span>
                                        </h4>
                                        <h4>
                                            <span className="inline-block font-normal text-sm w-[100px]">Email:</span>
                                            <span>{shippingAddress.email}</span>
                                        </h4>
                                        <h4>
                                            <span className="inline-block font-normal text-sm w-[100px]">Phone:</span>
                                            <span>{shippingAddress.phone}</span>
                                        </h4>
                                        <h4>
                                            <span className="inline-block font-normal text-sm w-[100px]">Address:</span>
                                            <span>West tekani Sonatola Bogra</span>
                                        </h4>
                                    </div>

                                    <div className="flex flex-col">
                                        <Circle>
                                            <FaPenAlt/>
                                        </Circle>
                                        <Circle><BiTrash className="text-lg cursor-pointer" onClick={() => handleDeleteAddress(shippingAddress._id)}/></Circle>

                                    </div>

                                </div>

                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </div>
    );
};

export default AddressBook;