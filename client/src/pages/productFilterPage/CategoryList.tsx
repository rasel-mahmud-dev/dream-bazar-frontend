import qstring from "query-string";

import {useEffect,  useState} from "react";
import apis from "src/apis";
import {useLocation, useNavigate, useParams, useSearchParams} from "react-router-dom";
import {FaAngleRight, FaTimes} from "react-icons/all";
import {ACTION_TYPES, CategoryType} from "store/types";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "src/store";
import {fetchFlatCategories} from "actions/productAction";
import {Button} from "UI/index";
import login from "pages/auth/Login";
import SEO from "components/SEO/SEO";


const ctg = [
    {
        "id": "60df5e546419f56b97610600",
        "name": "Electronics",
        "parentId": "0",
        "isProductLevel": 0,
        "ideals": "[]",
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": ""
    },
    {
        "id": "60df5e546419f56b97610601",
        "name": "Clothes",
        "parentId": "0",
        "isProductLevel": 0,
        "ideals": "[]",
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T14:18:57.656Z",
        "logo": ""
    },
    {
        "id": "60df5e546419f56b97610602",
        "name": "Mobiles",
        "parentId": "60e0131fc4db28b79bb36aa3",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "60df5e546419f56b97610603",
        "name": "Tablets",
        "parentId": "60e0131fc4db28b79bb36aa3",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "60df5e546419f56b97610604",
        "name": "Computer Components",
        "parentId": "60e00694402ddf2ba7d26d43",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "60df5e546419f56b97610605",
        "name": "All in One PC",
        "parentId": "60e00694402ddf2ba7d26d43",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "69df5e546419f56b97610607",
        "name": "Laptop",
        "parentId": "60e00694402ddf2ba7d26d43",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "70df5e546419f56b97610608",
        "name": "Motherboard",
        "parentId": "60df5e546419f56b97610604",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "70df5e546419f56b97610609",
        "name": "Processor",
        "parentId": "60df5e546419f56b97610604",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "70df5e546419f56b9761060a",
        "name": "Ram",
        "parentId": "60df5e546419f56b97610604",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "70df5e546419f56b9761060b",
        "name": "Keyboard",
        "parentId": "60df5e546419f56b97610604",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "60e00694402ddf2ba7d26d43",
        "name": "Computer and Laptop Accessories",
        "parentId": "60df5e546419f56b97610600",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "60e0131fc4db28b79bb36aa3",
        "name": "Mobiles and Tablet",
        "parentId": "60df5e546419f56b97610600",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "610660933763b883da37222f",
        "name": "t-shart",
        "parentId": "60df5e546419f56b97610601",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "610661183763b883da372230",
        "name": "jeans",
        "parentId": "60df5e546419f56b97610601",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "6106614b3763b883da372231",
        "name": "lungi",
        "parentId": "60df5e546419f56b97610601",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "610661883763b883da372232",
        "name": "skirt",
        "parentId": "60df5e546419f56b97610601",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "6137a040a75f8548ba40c3af",
        "name": "shart",
        "parentId": "60df5e546419f56b97610601",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "61397fe19d681052496d2457",
        "name": "sarees",
        "parentId": "60df5e546419f56b97610601",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "6139a31e9d681052496d245f",
        "name": "Laptop Battery",
        "parentId": "60e00694402ddf2ba7d26d43",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "6139a3e99d681052496d2460",
        "name": "Laptop Motherboard",
        "parentId": "60e00694402ddf2ba7d26d43",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "623a41184b72d984efe8c454",
        "name": "power-supply",
        "parentId": "60df5e546419f56b97610604",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "613ae2344b72d984efe8c45b",
        "name": "monitors",
        "parentId": "60df5e546419f56b97610600",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "6144ed2a38af6a8644f3c271",
        "name": "blouse",
        "parentId": "60df5e546419f56b97610601",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "6148899cd7c3a8485f011af4",
        "name": "Mobile Camera Lens Protectors",
        "parentId": "60e0131fc4db28b79bb36aa3",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "6148899cd7c3a8485f011af5",
        "name": "Cases & Covers",
        "parentId": "60e0131fc4db28b79bb36aa3",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "6148899cd7c3a8485f011af6",
        "name": "Power Banks",
        "parentId": "60e0131fc4db28b79bb36aa3",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "6148899cd7c3a8485f011af7",
        "name": "Mobile Holders",
        "parentId": "60e0131fc4db28b79bb36aa3",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "6148899cd7c3a8485f011af8",
        "name": "Mobile Sim & SD Card Trays",
        "parentId": "60e0131fc4db28b79bb36aa3",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "6148899cd7c3a8485f011af9",
        "name": "Mobile Flashes",
        "parentId": "60e0131fc4db28b79bb36aa3",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "6148899cd7c3a8485f011afa",
        "name": "Mobile Battery",
        "parentId": "60e0131fc4db28b79bb36aa3",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "6148899cd7c3a8485f011afb",
        "name": "Mobile Spare Parts",
        "parentId": "60e0131fc4db28b79bb36aa3",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "6148899cd7c3a8485f011afc",
        "name": "Mobile Cables",
        "parentId": "60e0131fc4db28b79bb36aa3",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "6148899cd7c3a8485f011afe",
        "name": "Charging Pads",
        "parentId": "60e0131fc4db28b79bb36aa3",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "6148899cd7c3a8485f011aff",
        "name": "Selfie Sticks",
        "parentId": "60e0131fc4db28b79bb36aa3",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "6148899cd7c3a8485f011b01",
        "name": "SIM Adapters",
        "parentId": "60e0131fc4db28b79bb36aa3",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "6148899cd7c3a8485f011b04",
        "name": "Screen Guards",
        "parentId": "60e0131fc4db28b79bb36aa3",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "6148899cd7c3a8485f011b05",
        "name": "Mobile Displays",
        "parentId": "60e0131fc4db28b79bb36aa3",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "6148899cd7c3a8485f011b06",
        "name": "Mobile Phone Lens",
        "parentId": "60e0131fc4db28b79bb36aa3",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "6148899cd7c3a8485f011b07",
        "name": "Mobile Chargers",
        "parentId": "60e0131fc4db28b79bb36aa3",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "6148899cd7c3a8485f011b08",
        "name": "OTG Adapter",
        "parentId": "60e0131fc4db28b79bb36aa3",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "61488d37d7c3a8485f011b09",
        "name": "Headphones",
        "parentId": "60e0131fc4db28b79bb36aa3",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "61489843841259e4451165db",
        "name": "External Hard Disks",
        "parentId": "60e00694402ddf2ba7d26d43",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "61489843841259e4451165de",
        "name": "Laptop Bags",
        "parentId": "60e00694402ddf2ba7d26d43",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "61489843841259e4451165df",
        "name": "Mouse",
        "parentId": "60e00694402ddf2ba7d26d43",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "61489843841259e4451165e0",
        "name": "Audio & Video",
        "parentId": "60df5e546419f56b97610600",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "61489c1f841259e4451165e3",
        "name": "Pendrives",
        "parentId": "60e00694402ddf2ba7d26d43",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "61489c1f841259e4451165e7",
        "name": "Cameras & Accessories",
        "parentId": "60df5e546419f56b97610600",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "61489d4e841259e4451165e8",
        "name": "Gaming & Accessories",
        "parentId": "60e00694402ddf2ba7d26d43",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "61489d4e841259e4451165eb",
        "name": "Laptop Skins & Decals",
        "parentId": "60e00694402ddf2ba7d26d43",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "61489d4e841259e4451165ef",
        "name": "Cameras",
        "parentId": "61489c1f841259e4451165e7",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "61489d4e841259e4451165f0",
        "name": "Lens",
        "parentId": "61489c1f841259e4451165e7",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "61489d4e841259e4451165f1",
        "name": "Tripods",
        "parentId": "61489c1f841259e4451165e7",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "61489d4e841259e4451165f2",
        "name": "Television.",
        "parentId": "60df5e546419f56b97610600",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "61489d4e841259e4451165f3",
        "name": "Washing Machine",
        "parentId": "60df5e546419f56b97610600",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "61489d4e841259e4451165f4",
        "name": "Refrigerators",
        "parentId": "60df5e546419f56b97610600",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "61489d4e841259e4451165f5",
        "name": "Kitchen Appliances",
        "parentId": "60df5e546419f56b97610600",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "61489e7a841259e4451165f6",
        "name": "Juicer/Mixer/Grinder",
        "parentId": "61489d4e841259e4451165f5",
        "isProductLevel": 0,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "61489e7a841259e4451165f7",
        "name": "Chimneys",
        "parentId": "61489d4e841259e4451165f5",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "61489e7a841259e4451165f9",
        "name": "Home Appliances",
        "parentId": "60df5e546419f56b97610600",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "6148a0bd841259e4451165fc",
        "name": "Coffee Makers",
        "parentId": "61489d4e841259e4451165f5",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "6148a0bd841259e4451165fe",
        "name": "Irons",
        "parentId": "61489e7a841259e4451165f9",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "6148a0bd841259e4451165ff",
        "name": "Fans",
        "parentId": "61489e7a841259e4451165f9",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "6148a0bd841259e445116600",
        "name": "Air Coolers",
        "parentId": "61489e7a841259e4451165f9",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "6148a0bd841259e445116601",
        "name": "Inverters",
        "parentId": "61489e7a841259e4451165f9",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "6148a0bd841259e445116602",
        "name": "Voltage Stabilizers",
        "parentId": "61489e7a841259e4451165f9",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "6148a0bd841259e445116603",
        "name": "Vacuum Cleaners",
        "parentId": "61489e7a841259e4451165f9",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "6148a0bd841259e445116604",
        "name": "Water Purifiers",
        "parentId": "61489e7a841259e4451165f9",
        "isProductLevel": 0,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "6148a0bd841259e445116606",
        "name": "Home & Furniture",
        "parentId": "0",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "6148a0bd841259e445116607",
        "name": "Personal Care Appliances",
        "parentId": "0",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "6148a0bd841259e445116608",
        "name": "Watches and Watch Accessories",
        "parentId": "0",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "6148a190841259e445116609",
        "name": "Smart Watches",
        "parentId": "6148a0bd841259e445116608",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "6148a849841259e44511660a",
        "name": "Speaker",
        "parentId": "61489843841259e4451165e0",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "6148b0ce841259e44511660e",
        "name": "Network Components",
        "parentId": "60e00694402ddf2ba7d26d43",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "6148b14a841259e44511660f",
        "name": "Routers",
        "parentId": "6148b0ce841259e44511660e",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "6148b15a841259e445116610",
        "name": "Cables",
        "parentId": "6148b0ce841259e44511660e",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "6148b16d841259e445116611",
        "name": "LAN Adapters",
        "parentId": "6148b0ce841259e44511660e",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "6148b17e841259e445116612",
        "name": "Wireless USB Adapters",
        "parentId": "6148b0ce841259e44511660e",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "6148b191841259e445116613",
        "name": "Antenna Amplifiers",
        "parentId": "6148b0ce841259e44511660e",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "6148b1a1841259e445116614",
        "name": "Internal Modems",
        "parentId": "6148b0ce841259e44511660e",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "616ed4e947cdd777fb383273",
        "name": "Footwear",
        "parentId": "0",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "616ed52b47cdd777fb383274",
        "name": "Casual Shoes",
        "parentId": "616ed4e947cdd777fb383273",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "616ed57047cdd777fb383275",
        "name": "Sports Shoes",
        "parentId": "616ed4e947cdd777fb383273",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "616ed57c47cdd777fb383276",
        "name": "Formal Shoes",
        "parentId": "616ed4e947cdd777fb383273",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "616f14298ae9a90aa4434f75",
        "name": "DTH",
        "parentId": "60df5e546419f56b97610600",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "616f1d3ca99f7fc73e1acce1",
        "name": "Microphone",
        "parentId": "61489843841259e4451165e0",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "617044aab915d460965a3058",
        "name": "Heels",
        "parentId": "616ed4e947cdd777fb383273",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "6170784f55f4a0b4747a30e3",
        "name": "Beauty and Grooming",
        "parentId": "0",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "617080e473b3851a1e7dbb78",
        "name": "Perfume",
        "parentId": "6170784f55f4a0b4747a30e3",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "617080e473b3851a1e7dbb71",
        "name": "Computer and Laptop",
        "parentId": "60df5e546419f56b97610600",
        "isProductLevel": 0,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "mcyedmyrzl",
        "name": "asddddddd-------------------asdsadasdsad",
        "parentId": "616f1d3ca99f7fc73e1acce1",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-16T10:43:15.518Z",
        "updatedAt": "2022-10-16T10:43:10.775Z",
        "logo": null
    },
    {
        "id": "hw9j0ggd2i",
        "name": "asdasdsad",
        "parentId": "60df5e546419f56b97610602",
        "isProductLevel": 0,
        "ideals": null,
        "createdAt": "2022-10-16T10:51:06.384Z",
        "updatedAt": "2022-10-16T10:51:06.384Z",
        "logo": ""
    },
    {
        "id": "96ae975ewg",
        "name": "asdasdsads",
        "parentId": "60df5e546419f56b97610602",
        "isProductLevel": 0,
        "ideals": null,
        "createdAt": "2022-10-16T10:52:52.578Z",
        "updatedAt": "2022-10-16T10:52:52.578Z",
        "logo": ""
    },
    {
        "id": "2u5utqp9l2",
        "name": "aaaaaaaaaaaaaaaaaa",
        "parentId": "",
        "isProductLevel": 0,
        "ideals": null,
        "createdAt": "2022-10-16T14:27:44.410Z",
        "updatedAt": "2022-10-16T14:27:44.410Z",
        "logo": ""
    },
    {
        "id": "ffzdy5dai4",
        "name": "Washing Powders",
        "parentId": "61489e7a841259e4451165f9",
        "isProductLevel": 1,
        "ideals": null,
        "createdAt": "2022-10-18T16:03:34.867Z",
        "updatedAt": "2022-10-18T16:03:34.867Z",
        "logo": ""
    }
]


function CategoryList(props) {
    
    const dispatch = useDispatch();
    const location = useLocation();
    const qs = qstring.parse(location.pathname)

    const { flatCategories, nestedCategoriesCache, brands } = useSelector((state: RootState)=>state.productState)
    let [searchParams, setSearchParams] = useSearchParams();
    
    let catTree = searchParams.get("catTree")
    
    /*
    * 1 => []
    * 2 => []
    * 3 => []
    * 4 => []
    * */
    
    const [sidebarCategory, setSidebarCategory] = useState<{[key: string]: CategoryType[]} | null>({
        // "1": [
        //     {
        //         "id": "60df5e546419f56b97610600",
        //         "name": "Electronics",
        //         "parentId": "0",
        //         "isProductLevel": 1,
        //         "ideals": null,
        //         expand: true,
        //     },
        //     {
        //         "id": "60df5e546419f56b97610601",
        //         "name": "Clothes",
        //         "parentId": "0",
        //         "isProductLevel": 1,
        //         "ideals": null
        //     },
        //     {
        //         "id": "6148a0bd841259e445116606",
        //         "name": "Home & Furniture",
        //         "parentId": "0",
        //         "isProductLevel": 1,
        //         "ideals": null
        //     },
        //     {
        //         "id": "6148a0bd841259e445116607",
        //         "name": "Personal Care Appliances",
        //         "parentId": "0",
        //         "isProductLevel": 1,
        //         "ideals": null
        //     },
        //     {
        //         "id": "6148a0bd841259e445116608",
        //         "name": "Watches and Watch Accessories",
        //         "parentId": "0",
        //         "isProductLevel": 1,
        //         "ideals": null
        //     },
        //     {
        //         "id": "616ed4e947cdd777fb383273",
        //         "name": "Footwear",
        //         "parentId": "0",
        //         "isProductLevel": 1,
        //         "ideals": null
        //     },
        //     {
        //         "id": "6170784f55f4a0b4747a30e3",
        //         "name": "Beauty and Grooming",
        //         "parentId": "0",
        //         "isProductLevel": 1,
        //         "ideals": null
        //     }
        // ],
        // "2": [
        //     {
        //         "id": "60e00694402ddf2ba7d26d43",
        //         "name": "Computer and Laptop Accessories",
        //         "parentId": "60df5e546419f56b97610600",
        //         "isProductLevel": 1,
        //         "ideals": null
        //     },
        //     {
        //         "id": "60e0131fc4db28b79bb36aa3",
        //         "name": "Mobiles and Tablet",
        //         "parentId": "60df5e546419f56b97610600",
        //         "isProductLevel": 1,
        //         "ideals": null
        //     },
        //     {
        //         "id": "613ae2344b72d984efe8c45b",
        //         "name": "monitors",
        //         "parentId": "60df5e546419f56b97610600",
        //         "isProductLevel": 0,
        //         "ideals": null
        //     },
        //     {
        //         "id": "61489843841259e4451165e0",
        //         "name": "Audio & Video",
        //         "parentId": "60df5e546419f56b97610600",
        //         "isProductLevel": 1,
        //         "ideals": null
        //     },
        //     {
        //         "id": "61489c1f841259e4451165e7",
        //         "name": "Cameras & Accessories",
        //         "parentId": "60df5e546419f56b97610600",
        //         "isProductLevel": 1,
        //         "ideals": null
        //     },
        //     {
        //         "id": "61489d4e841259e4451165f2",
        //         "name": "Television.",
        //         "parentId": "60df5e546419f56b97610600",
        //         "isProductLevel": 0,
        //         "ideals": null
        //     },
        //     {
        //         "id": "61489d4e841259e4451165f3",
        //         "name": "Washing Machine",
        //         "parentId": "60df5e546419f56b97610600",
        //         "isProductLevel": 1,
        //         "ideals": null
        //     },
        //     {
        //         "id": "61489d4e841259e4451165f4",
        //         "name": "Refrigerators",
        //         "parentId": "60df5e546419f56b97610600",
        //         "isProductLevel": 0,
        //         "ideals": null
        //     },
        //     {
        //         "id": "61489d4e841259e4451165f5",
        //         "name": "Kitchen Appliances",
        //         "parentId": "60df5e546419f56b97610600",
        //         "isProductLevel": 1,
        //         "ideals": null
        //     },
        //     {
        //         "id": "61489e7a841259e4451165f9",
        //         "name": "Home Appliances",
        //         "parentId": "60df5e546419f56b97610600",
        //         "isProductLevel": 1,
        //         "ideals": null
        //     },
        //     {
        //         "id": "616f14298ae9a90aa4434f75",
        //         "name": "DTH",
        //         "parentId": "60df5e546419f56b97610600",
        //         "isProductLevel": 0,
        //         "ideals": null
        //     },
        //     {
        //         "id": "617080e473b3851a1e7dbb71",
        //         "name": "Computer and Laptop",
        //         "parentId": "60df5e546419f56b97610600",
        //         "isProductLevel": 0,
        //         "ideals": null
        //     }
        // ]
    })

    const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null)
    
    const navigate = useNavigate()
    const params = useParams()

    function findChildCategory(categories: CategoryType[], parentId: string) {
        // let items = {}
        let items = []
        categories.filter(cat=>{
            if(cat.parentId === parentId){
                // items[cat.id] = cat
                items.push(cat)
            }
        })
        return items
    }

    // function findRootCategories(categories: {id: string, parentId: string}[]) {
    //     let items: {[key: string]: CategoryType} = {}
    //     categories.filter((cat: any)=>{
    //         if(!cat.parentId || cat.parentId === '0'){
    //             items[cat.id] = cat
    //         }
    //     })
    //     return items
    // }
    
    function  getCategoriesLocal(filter: string, data: CategoryType[]){
        return data.filter(function (item){
            if(filter){
                let f = filter.split("=");
                if(item[f[0]] === f[1]){
                    return item;
                }
            }
        })
    }
    
    function find(items, parentId, lastId) {
        let rootItem = [];
        
        for (let i = 0; i < items.length; i++) {
            let cat = items[i];
        
            if (cat.parentId == "0") {
                // only store that match with parentId
                if (cat.id === parentId) {
                    cat.sub = []
                    rootItem.push(cat);
                }
            } else {
                nested(rootItem,  lastId, items)
            }
        }
        return rootItem;
    }
    
    
    function nested(rootItemElement, lastId, items){
        
        for (const rootItemElement1 of items) {
            for (let subItem of rootItemElement){
                if(subItem.id === rootItemElement1.parentId){
                    
                    if(subItem.sub){
                        if(subItem.sub.findIndex(s=>s.id === rootItemElement1.id) === -1) {
                            subItem.sub.push(rootItemElement1)
                        }
                    } else {
                        subItem.sub = [rootItemElement1]
                    }
                    
                    if(lastId ===  rootItemElement1.id){
                        return;
                    }
                    // repeated task
                    nested(subItem.sub, lastId, items)
                    
                }
            }
        }
    }
    
    const [lastParentSubCategories, setLastParentSubCategories] = useState({
        lastParentId: "",
        sub: [],
        levelNumber: 0
    })
 
    
    useEffect(()=>{
        
    
        // if(params.pId && params.treeId) {
        //     // base category name
        //     let rootCategoryName = params.pId
        //     if(nestedCategoriesCache[params.pId]){
        //         console.log(nestedCategoriesCache[params.pId])
        //     } else {
        //         apis.get(`/api/category/cache/${params.pId}`).then(({data}) => {
        //             dispatch({
        //                 type: ACTION_TYPES.ADD_NESTED_CATEGORY_CACHE,
        //                 payload: {
        //                     name: data.categoryCache.name,
        //                     arr: JSON.parse(data.categoryCache.arr)
        //                 }
        //             })
        //         }).catch(ex => {
        //             console.log(ex)
        //         })
        //     }
        //
            // let temp = {}
            // // default category nested level
            // let levelNumber = 1;
            //
            // // root level or base level all categories
            // let rootCategories =  getCategoriesLocal('parentId=0', a)
            //
            //
            // // set expand true that expanded and other make false
            // let selectedRooCat: CategoryType = setExpand(rootCategories, rootCategoryName)
            // root = selectedRooCat
        // }
        
        
        // (async function(){
        //
        //     let data = qstring.parse(location.hash)
        //
        //     let updateSidebarCategory = {
        //         ...sidebarCategory
        //     }
        //
        //     let root = {}
        //
        //     let a;
        //     if(flatCategories) {
        //         a = flatCategories;
        //     } else {
        //         a = await fetchFlatCategories();
        //     }
        //
        //
        //     if(a){
        //         // find both category tree
        //         if(params.pId && params.treeId){
        //
        //             // base category name
        //             let rootCategoryName = params.pId
        //
        //             let temp = {}
        //             // default category nested level
        //             let levelNumber = 1;
        //
        //             // root level or base level all categories
        //             let rootCategories =  getCategoriesLocal('parentId=0', a)
        //
        //
        //             // set expand true that expanded and other make false
        //             let selectedRooCat: CategoryType = setExpand(rootCategories, rootCategoryName)
        //             root = selectedRooCat
        //
        //             // find parent subCategory
        //             let subCats = findChildCategory(a, selectedRooCat.id)
        //             updateSidebarCategory[levelNumber] = rootCategories
        //             // level should be 2
        //             levelNumber++
        //             updateSidebarCategory[levelNumber] = subCats
        //
        //
        //
        //             let catTree = params.treeId;
        //
        //
        //             let isReach = subCats.find(subName=> subName.name === catTree);
        //
        //             if(!isReach) {
        //                 let findCatTreeItem = a.find(item => item.name === catTree)
        //                 if(findCatTreeItem){
        //                     // find another nested category
        //                     levelNumber++
        //                     findCatTreeItem.active = true;
        //                 }
        //
        //
        //                 // this function make each nested sub category make array of object which key is its parent id;
        //                 findNerestParentRecur(findCatTreeItem, rootCategoryName, a)
        //
        //                 foundNestedFormObject(subCats, temp)
        //
        //                 function foundNestedFormObject(subCats, temp,) {
        //                     if (subCats) {
        //                         subCats.forEach(cat => {
        //                             let nested = temp[cat.id]
        //                             if (nested) {
        //                                 let lastSelected = setExpand(subCats, cat.name)
        //                                 updateSidebarCategory[levelNumber] = nested
        //                                 // increase sub nested number
        //                                 levelNumber++
        //
        //                                 foundNestedFormObject(nested, temp);
        //                             }
        //                         })
        //                     }
        //                 }
        //             }
        //
        //
        //
        //             function findNerestParentRecur(parent,  rootCategoryName,  arr){
        //                 let parentItem = arr.find(item=>item.id === parent.parentId)
        //                 if(parentItem) {
        //                     let parentItemSub = getCategoriesLocal("parentId=" + parentItem.id, arr);
        //                     if(parentItemSub) {
        //                         temp[parentItem.id] = parentItemSub
        //                     }
        //                     if (rootCategoryName !== parentItem.name) {
        //                         findNerestParentRecur(parentItem, rootCategoryName, arr)
        //                     }
        //                 }
        //             }
        //
        //
        //         } else if("/p?cat" in data){
        //
        //             let rootCategories =  getCategoriesLocal('parentId=0', a)
        //             let selectedRootCat: CategoryType = setExpand(rootCategories, data["/p?cat"])
        //             root = selectedRootCat
        //             let subCats = findChildCategory(a, selectedRootCat.id)
        //             updateSidebarCategory[1] = rootCategories
        //             updateSidebarCategory[2] = subCats
        //
        //         } else {
        //             let rootCategories =  getCategoriesLocal('parentId=0', a)
        //             updateSidebarCategory[1] = rootCategories
        //         }
        //
        //         dispatch({
        //             type: "SET_SELECT_CATEGORY",
        //             payload: {
        //                 root: root,
        //                 tree: {}
        //             }
        //         })
        //
        //         setSidebarCategory(updateSidebarCategory);
        //
        //         if(!flatCategories) {
        //             dispatch({
        //                 type: ACTION_TYPES.FETCH_CATEGORIES,
        //                 payload: a
        //             })
        //         }
        //     }
        // }())
    
    
        getCat()
        
    }, [params.pId, catTree])
    
    async function getCat(){
        
        console.time("category-find-time")
        
        let updateSidebarCategory = {
            ...sidebarCategory
        }
    
        let rootCategory = {}
    
        let a = ctg
        // if(flatCategories) {
        //     a = flatCategories;
        // } else {
        //     a = await fetchFlatCategories();
        // }
    
     
            // find both category tree
            if(params.pId && catTree){
            
                // base category name
                let rootCategoryName = params.pId
                
                let temp = {}
                
                // default category nested level
                let levelNumber = 1;
            
                // root level or base level all categories where parent id is = 0
                let rootCategories =  getCategoriesLocal('parentId=0', a)
                
                // store it state so that we will render in jsx
                // it first level category / root level
                // { 1 : [{…}, {…}, {…}, {…}, {…}, {…}, {…}] }
                updateSidebarCategory[levelNumber] = rootCategories
            
                // get pId root category that is given in url first params
                // and set expand true that expanded and other make false
                 rootCategory = setExpand(rootCategories, rootCategoryName)
                
                
                // now find last category that is passed url params 2
                
                // find last n level category
                let getLastLevelCategory = a.find(item => item.name === catTree)
                if(getLastLevelCategory){
                    // find another nested category
                    // levelNumber++
                    // getLastLevelCategory.active = true;
                }
                
                /**
                 * we found last category.
                 * now we need to find its parent category. that is n-1 level category
                 * then again find n-1 level parent category that is n-2 level category
                 * this process run until we reach root category*
                 *
                 * example: out category tree
                 * Electronics -> Computer and Laptop Accessories -> Computer Components -> Motherboard*
                 *
                 * example: find like this find reverse order category. until reach root category
                 * Motherboard ->  Computer Components -> Computer and Laptop Accessories -> Electronics [end loop]
                */
                // this function make each nested sub category make array of object which key is its parent id;
                getLastLevelCategory.expand = true
                getLastLevelCategory.last = true
                
                findUpperParentRecur(getLastLevelCategory, rootCategoryName, a, temp)
                
                
                // now we found all level nested level category that store in temp object.
                let arrId = []
                for (let tempKey in temp) {
                    arrId.push(tempKey)
                }
               
                arrId = arrId.reverse();
    
                for (let id of arrId) {
                    levelNumber++
                    updateSidebarCategory[levelNumber] = temp[id]
                }
    
                setLastParentSubCategories({
                    lastParentId: getLastLevelCategory.id,
                    sub: a.filter(item => getLastLevelCategory.id === item.parentId),
                    levelNumber: levelNumber,
                })
    
    
    
            } else if(params.pId){
            
                let rootCategories =  getCategoriesLocal('parentId=0', a)
                let selectedRootCat: CategoryType = setExpand(rootCategories, params.pId)
                rootCategory = selectedRootCat
                let subCats = findChildCategory(a, selectedRootCat.id)
                updateSidebarCategory[1] = rootCategories
                updateSidebarCategory[2] = subCats
            
            } else {
                let rootCategories =  getCategoriesLocal('parentId=0', a)
                updateSidebarCategory[1] = rootCategories
            }
        
            dispatch({
                type: "SET_SELECT_CATEGORY",
                payload: {
                    root: rootCategory,
                    tree: {}
                }
            })
        
            setSidebarCategory(updateSidebarCategory);
        
            // if(!flatCategories) {
            //     dispatch({
            //         type: ACTION_TYPES.FETCH_CATEGORIES,
            //         payload: a
            //     })
            // }
    
        console.timeEnd("category-find-time")
    }
    
    
    function findUpperParentRecur(parent: {parentId: string, id: string, name: string, expand?: boolean },  rootCategoryName: string,  arr, temp){
        /**
         step 1 parent = Motherboard
         step 2 parent = Computer Components
         step 3 parent = Computer and Laptop Accessories
         step 4 parent = Electronics
         step 5 parent = undefined [recursion stop]
        */
        // find upper parent
        let upperParent = arr.find(item=>item.id === parent.parentId)
    
        if(upperParent) {
            // sign that only expand
            upperParent.expand = true
            // find upper parent ar sub categories
            let upperParentOfSub = getCategoriesLocal("parentId=" + upperParent.id, arr);
            /**
                find upper parent ar sub categories
                Ex: Computer Components ar under all category
                {Motherboard}{Processor}{Ram}{Keyboard}{power-supply}
             */
            
            if(upperParentOfSub) {
                // store upper parent or sub categories with in key upper category id and value sub category.
                // end of we get temp reverse to get level category
                temp[upperParent.id] = upperParentOfSub
            }
            
            // check if it not reaches root level category
            if (rootCategoryName !== upperParent.name) {
                findUpperParentRecur(upperParent, rootCategoryName, arr, temp)
            }
        }
    }
    
    
    function saveCategoryCache(){
        console.time()
        let i = find(ctg, "60df5e546419f56b97610600", 0)
        console.timeEnd()

        apis.post("/api/category/add-cache", {rootId: "60df5e546419f56b97610600", data: i }).then((data)=>{
            console.log(data)
        }).catch(ex=>{
            console.log(ex)
        })
        
    }
    
    
    function setExpand(subCategories, catName){
        let selectedItem = null
        subCategories.forEach(item=> {
            if(item.name === catName){
                item.expand = true;
                selectedItem = item;
            } else {
                item.expand = false;
            }
        });
        
        return selectedItem
    }

    
    function handleChangeBrand(item: {name: string, _id: string}){
        // let updatedBrands = [...state.filter.brands]
        //
        // let index = updatedBrands.findIndex(b=>b._id === item._id)
        //
        // if(index === -1){
        //     updatedBrands = [
        //         ...updatedBrands,
        //         item
        //     ]
        // } else {
        //     updatedBrands.splice(index, 1)
        // }
        // setFilter({
        //     ...state.filter,
        //     brands: updatedBrands
        // })
    }
    
    
    function handleRemoveCategory(item: CategoryType){
        let updatedSelectedCategory = {...selectedCategory}

        // getAllRootCategoryFromLocal(item, (data)=>{
        //     for (let dataKey in data) {
        //         if(data[dataKey] && data[dataKey].sub) data[dataKey].sub = null
        //     }
        //     setFetchCategories(data);
        //     updatedSelectedCategory = null
        // })
        setSelectedCategory(updatedSelectedCategory)
            // updatedSelectedCategory = null
            
            // setBrands(null)
      
        // setSelectedCategory(updatedSelectedCategory)
        
        // setFilter({
        //     ...state.filter,
        //     brands: [],
        //     category: updatedCategory,
        //
        // })
    }
    
    
    function clickOnCategoryItem(item: CategoryType, levelNumber){
        
        let lastSub = ctg.filter(cat=>cat.parentId === item.id)
    
        let updatedSidebarCategory = {...sidebarCategory}
        let s = updatedSidebarCategory[levelNumber].find(sCat=>sCat.id === item.id)
        if(s) {
            s.last = true;
        }
        let keyNumbers = Object.keys(updatedSidebarCategory);
        keyNumbers.forEach(key=>{
            if(levelNumber < key ){
                // delete all nested of parent
                delete updatedSidebarCategory[key]
            }
        })
        
        setLastParentSubCategories(prevState => ({
            ...prevState,
            levelNumber: levelNumber,
            lastParentId: item.id,
            sub: lastSub
        }))
        if(params.pId === item.name) {
            navigate(`/p/${params.pId}`)
        } else {
            navigate(`/p/${params.pId}?catTree=${item.name}`)
        }
        setSidebarCategory(updatedSidebarCategory)
    }
    
    function handleExpandCategory(item,   levelNumber) {

        // find all sub categories for currently clicked item
        // that is set for last parent sub categories sub arr
        const lastClickedSub = ctg.filter(ct=>ct.parentId === item.id)
        
        let updatedSidebarCategory = {...sidebarCategory}
        
        // find parent of clicked category
        let parentCat = updatedSidebarCategory[levelNumber].find(sCat=>item.parentId === sCat.id)
        if(!parentCat){
            return setSidebarCategory(updatedSidebarCategory)
        }
    
        parentCat.last = false;
    
        // find parent sub categories for next level nested category
        let lastParentSub = ctg.filter(ct=>ct.parentId === parentCat.id)
        
        // set nest level category like
        // updatedSidebarCategory[4 + 1] = []
        updatedSidebarCategory[levelNumber + 1] = lastParentSub
    
        // update all last and expand property from preview level category
        lastParentSub.forEach((lastItem=>{
            if(lastItem.name === item.name){
                lastItem.last = true
                lastItem.expand = true
            } else{
                lastItem.last = false
                lastItem.expand = false
            }
        }));
     
        setLastParentSubCategories(prevState => ({
           ...prevState,
            sub: lastClickedSub.length === 0 ? null : lastClickedSub,
            levelNumber: levelNumber + 1,
            lastParentId: parentCat.id
        }))
        setSidebarCategory(updatedSidebarCategory)
        navigate(`/p/${params.pId}?catTree=${item.name}`)
    }

    
      return (
        <div className="md:block col-span-3 ">
            
            <div className="grid px-4">
                
                <h1 className="font-semibold text-xl mt-8">Category</h1>
                <Button className="bg-red-300" onClick={saveCategoryCache}>saveCategoryCache</Button>
                <Button className="bg-red-300" onClick={getCat}>Get</Button>
                <div className='mb-2'>
                    {selectedCategory && <div className="flex flex-wrap gap-2 mt-2">
                        <div
                            onClick={() => handleRemoveCategory(selectedCategory)}
                            className="bg-blue-500/20 font-medium px-4 py-2 rounded flex justify-between items-center">
                            <span>{selectedCategory.name}</span>
                            <FaTimes />
                        </div>
                    </div> }
                </div>
    
                { sidebarCategory[1]?.map(cat=> (!sidebarCategory[2] || cat.expand)  && (
                    <div key={cat.id} className="ml-2 flex justify-between">
                        <li onClick={()=>clickOnCategoryItem(cat, 1)} className={`cursor-pointer ${(cat.active || cat.expand) ? "expanded-category": "hidden"}`}>{cat.name}</li>
                    </div>
                ))}
    
                { sidebarCategory["2"]?.map(cat=> (!sidebarCategory[3] || cat.expand) && (
                    <div key={cat.id} className="ml-2">
                        <li onClick={()=>clickOnCategoryItem(cat, 2)} className={`cursor-pointer ${(cat.active || cat.expand) ? "expanded-category": "hidden"}`}>{cat.name}</li>
                    </div>
                )) }
                
                { sidebarCategory["3"]?.map(cat=>  (!sidebarCategory[4]  || cat.expand) && (
                    <div key={cat.id} className="ml-2">
                        <li onClick={()=>clickOnCategoryItem(cat, 3)} className={`cursor-pointer
                        ${(cat.active || cat.expand) ? "expanded-category": "hidden"}
                        ${cat.last ? "last-expand-category": ""}
                        
                        `}>{cat.name}</li>
                    </div>
                )) }
    
                {/*{ sidebarCategory["4"] && sidebarCategory["3"]?.map(cat=> (!sidebarCategory[5]  || cat.expand) &&  (*/}
                {/*    <div key={cat.id} className="ml-4">*/}
                {/*        <li onClick={()=>clickOnCategoryItem(cat, 4)}*/}
                {/*            className={`cursor-pointer ${(cat.expand) ? "expanded-category": "hidden"}`}>*/}
                {/*            {cat.name}*/}
                {/*        </li>*/}
                {/*    </div>*/}
                {/*)) }*/}
    
         
                
                { sidebarCategory["4"]?.map(cat=> (!sidebarCategory[5]  || cat.expand) &&  (
                    <div key={cat.id} className="ml-2">
                        <li onClick={()=>clickOnCategoryItem(cat, 4)}
                            className={`cursor-pointer ${(cat.expand) ? "expanded-category": "hidden"}
                                        ${cat.last ? "last-expand-category": ""}
                            `}>
                            {cat.name}
                        </li>
                    </div>
                )) }
    
    
                <div className="ml-4">
                    { lastParentSubCategories.sub && lastParentSubCategories.sub.map(item=>(
                        <div>
                        <h1 onClick={()=>handleExpandCategory(item,  lastParentSubCategories.levelNumber)}
                            className={`cursor-pointer text-green-450`}>{item.name}</h1>
                    </div>
                    )) }
                </div>
                
                
            </div>
        </div>
    );
}

export default CategoryList;


