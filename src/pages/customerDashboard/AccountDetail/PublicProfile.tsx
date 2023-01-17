import React, {FC, useEffect, useState} from 'react';
import {Profile} from "store/types";
import {InputGroup} from "UI/Form";
import {Button} from "UI/index";

interface Props {
    profile: Profile
}

type Keys = keyof Profile


const publicProfileInputs: { [key in Keys]: any} = {
    username: {
        name: "username",
        label: "Username",
        placeholder: "",
        validateData: {
            required: "Username required",
        },

        info: "Your name may appear around GitHub where you contribute or are mentioned. You can remove it at any time"
    },
    firstName: {
        name: "firstName",
        label: "First Name",
        placeholder: "",
        validateData: {
            required: "First name required",
        },
        info: "Your name may appear around GitHub where you contribute or are mentioned. You can remove it at any time"
    },
    lastName: {
        name: "lastName",
        label: "Last Name",
        placeholder: "",
        validateData: {
            required: "Last name required",
        },
        info: "Your name may appear around GitHub where you contribute or are mentioned. You can remove it at any time"
    },

    email: {
        name: "email",
        type: "email",
        label: "email",
        validateData: {
            required: "Email Required",
            regex: {value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, message: "Please provide valid email"},
        },
        info: "Your name may appear around GitHub where you contribute or are mentioned. You can remove it at any time"
    },
    phone: {
        name: "phone",
        label: "Phone",
        placeholder: "",
        validateData: {
            required: "Phone Required",
            length: {
                value: 11,
                message: "Phone should be 11 Digit"
            }
        },
        info: "Your name may appear around GitHub where you contribute or are mentioned. You can remove it at any time"
    },
    state: {
        name: "state",
        label: "State",
        placeholder: "",
        validateData: {
            required: "state name required",
        },
        info: "Your name may appear around GitHub where you contribute or are mentioned. You can remove it at any time"
    },
    city: {
        name: "city",
        label: "City Name",
        placeholder: "",
        validateData: {
            required: "City name required",
        },
        info: "Your name may appear around GitHub where you contribute or are mentioned. You can remove it at any time"
    },

    address: {
        name: "address",
        label: "Address",
        placeholder: "",
        as: "textarea",
        validateData: {
            required: "address required"
        },
        info: "Your name may appear around GitHub where you contribute or are mentioned. You can remove it at any time"
    },
    _id: undefined,
    avatar: undefined,
    roles: undefined,
    createdAt: undefined,
    updatedAt: undefined
}

const PublicProfile: FC<Props> = ({profile}) => {

    useEffect(()=>{
        // profile
    }, [profile])


    return (
        <div>
            {Object.keys(publicProfileInputs).map(input => publicProfileInputs[input] && (
                <div>
                    <InputGroup className="!flex-col" {...publicProfileInputs[input]} value={profile?.[input]} />
                    <p className="mb-4 mt-2">{publicProfileInputs[input].info}</p>
                </div>
            ))}

            <Button className="btn" theme="primary">Update Profile</Button>

        </div>
    );
};

export default PublicProfile;