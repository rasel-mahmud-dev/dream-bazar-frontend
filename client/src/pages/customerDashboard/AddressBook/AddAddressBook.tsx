import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import Button from "UI/Button/Button";
import {getApi} from "src/apis";
import {InputGroup} from "UI/Form";
import "./shipping-address.scss"
import inputValidator from "src/utills/inputValidator";
import {StatusCode} from "store/types";
import {addShippingAddress} from "actions/userAction";
import useAppDispatch from "src/hooks/useAppDispatch";
import {useNavigate} from "react-router-dom";


interface Props {
    onClose?: () => void,
    onAdd?: (data: ShippingAddress) => void
    isOpen: boolean
    auth?: any
}

interface ShippingAddress {
    firstName: string,
    lastName?: string,
    phone?: string,
    email: string,
    isDefault: boolean,
    zipCode: string,
    state: string,
    city: string,
    address: string,
    apartmentSuit?: string,
    country?: string,
}

export const inputFields = {
    firstName: {
        name: "firstName",
        label: "First Name",
        placeholder: "",
        validateData: {
            required: "First name required",
        },
    },
    lastName: {
        name: "lastName",
        label: "Last Name",
        placeholder: "",
        validateData: {
            required: "Last name required",
        },
    },

    email: {
        name: "email",
        type: "email",
        label: "email",
        validateData: {
            required: "Email Required",
            regex: {value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, message: "Please provide valid email"},
        },
    },
    phone: {
        name: "phone",
        label: "Phone",
        placeholder: "",
        validateData: {
            required: "Phone Required",
            length: {value: 11, message: "Phone should be 11 Digit"}
        },
    },
    state: {
        name: "state",
        label: "State",
        placeholder: "",
        validateData: {
            required: "state name required",
        },
    },
    city: {
        name: "city",
        label: "City Name",
        placeholder: "",
        validateData: {
            required: "City name required",
        },
    },
    zipCode: {
        name: "zipCode",
        label: "Zip Code",
        placeholder: "",
        validateData: {
            required: "Zip Code required",
            number: "zip code should be an number",
            length: {value: 4, message: "zip code should be 4 Digit"}
        },
    },
    address: {
        name: "address",
        label: "Address",
        placeholder: "",
        validateData: {
            required: "address required"
        },
    },
    apartmentSuit: {
        name: "apartmentSuit",
        label: "ApartmentSuit",
        placeholder: "",
    },
};


const AddShippingAddress: FC<Props> = (props) => {

    const dispatch = useAppDispatch()
    const navigate  = useNavigate()

    const [shippingAddress, setShippingAddress] = React.useState<ShippingAddress>({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        isDefault: false,
        zipCode: "",
        state: "",
        city: "",
        address: "",
        apartmentSuit: "",
        country: "",
    })
    const [errors, setErrors] = React.useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        isDefault: "",
        zipCode: "",
        state: "",
        city: "",
        address: "",
        apartmentSuit: "",
        country: "",
    })

    useEffect(() => {
        return () => {
            setShippingAddress({
                address: "",
                apartmentSuit: "",
                city: "",
                country: "",
                email: "",
                firstName: "",
                isDefault: false,
                lastName: "",
                phone: "",
                state: "",
                zipCode: ""
            })
        }
    }, [])

    async function handleSave(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        let updateErrors = {...errors}
        let isCompleted = true;
        for (let inputFieldsKey in inputFields) {
            let errorMsg = inputValidator(inputFields[inputFieldsKey].validateData, shippingAddress[inputFieldsKey])
            if (errorMsg) {
                isCompleted = false
            }
            updateErrors[inputFieldsKey] = errorMsg
        }
        if (!isCompleted) {
            setErrors(updateErrors)
            return;
        }

        try {

            let response = await getApi().post("/api/shipping-addresses", shippingAddress)
            if (response.status === StatusCode.Created) {
                dispatch(addShippingAddress(response.data))
                navigate("/dashboard/address-books")

            }
        } catch (ex) {
            alert("Please Try again.")
        }

    }



    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target

        if (e.target.name === "isDefault") {
            setShippingAddress({
                ...shippingAddress,
                // @ts-ignore
                [e.target.name]: e.target.checked
            })
        } else {
            setShippingAddress({
                ...shippingAddress,
                [e.target.name]: e.target.value
            })
        }

        if (inputFields[name].validateData) {
            let error = inputValidator(inputFields[name].validateData, value)
            setErrors(prevState => ({
                ...prevState,
                [name]: error
            }))
        }

    }


    return (

        <div className="">
            <div className="mt-4">

                <h4 className="route-title">Add New Shipping Address</h4>


                <form className="shipping-address-form max-w-4xl !pt-8 ">

                    {Object.keys(inputFields).map(inputName => (
                        <InputGroup
                            {...inputFields[inputName]}
                            error={errors[inputName]}
                            onChange={handleChange}
                        />
                    ))}

                    {/*<Button*/}
                    {/*    className={`mt-5 text-white !w-full !ml-0 ${*/}
                    {/*        fetchLoading ? "bg-primary-400 pointer-events-none" : "bg-primary-400"*/}
                    {/*    }`}*/}
                    {/*>*/}
                    {/*    Login*/}
                    {/*</Button>*/}


                    <div className="flex items-center mt-4">
                        <input onChange={handleChange} name="isDefault" checked={shippingAddress.isDefault} type="checkbox"
                               id="make-default"/>
                        <label htmlFor="make-default" className="text-sm ml-2 text-mute">Make default</label>
                    </div>

                    <div className="flex gap-x-2">
                        <Button onClick={handleSave} className="btn-primary mt-4 ">
                            Save Shipping Address
                        </Button>
                    </div>


                </form>


            </div>
        </div>

    );
};

export default AddShippingAddress;