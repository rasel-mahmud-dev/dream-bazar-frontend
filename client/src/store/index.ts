import {createStore, applyMiddleware, compose} from "redux"
import thunk from "redux-thunk"
import reducers from "store/reducers"
import api from "src/apis"

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


export default (initialState) => {
  return createStore(reducers, initialState={},   composeEnhancers(applyMiddleware(thunk.withExtraArgument(api))))
}


export const productDropdownNavData = [
    { 
        name: "Clothes", 
        id: "213", 
        subCategory: [
                {
                    name: 'Men Wear',
                    subCategory: [
                        {
                            name: 'Top Wear',
                            items: [
                                {name: "T-Shart", id: "2342"},
                                {name: "Shart", id: "34r"},
                                {name: "Jacket", id: "23r"},
                                {name: "Panjabi", id: "ed"}
                            ]
                        },
                        {
                            name: 'Bottom Wear',
                            items: [
                                {name: "Jeans", id: "sdf"},
                                {name: "Haft Pant", id: "dsfewr"}
                            ]
                        }
                    ],
                },
                {
                    name: 'Women Wear',
                    subCategory: [
                        { 
                            name: 'Top Wear',
                            items: [
                                {name: "T-Shart", id: "fdger"},
                                {name: "Sharee", id: "5"}  
                            ]
                        },
                        {
                            name: 'Bottom Wear',
                            items: [
                                {name: "Jeans", id: "6"}
                            ]
                        }
                    ],
                },
            ]  
        },
        {
            name: "Electronics", 
            id: "21", 
            subCategory: [
                {
                    name: 'Computer and Accessories',
                    id: "60e00465402ddf2ba7d26d42",
                    type: 'sub_category',
                    subCategory: [
                        {
                            name: 'All in One PC',
                            id: "60df5e546419f56b97610605",
                            type: 'entry_category',
                            items: [
                                {name: "Dell", type: "entry_category",  id: "2232"},
                                {name: "Asus", type: "entry_category",  id: "34ewr"},
                                {name: "Gigatech", type: "entry_category", id: "23er;r"}
                            ]
                        },
                        {
                            name: 'Computer Components',
                            type: 'category',
                            id: "60df5e546419f56b97610604",
                            items: [
                                {name: "Motherboard", type: "category", id: "60df5e546419f56b97610608"},
                                {name: "Processor", type: "category", id: "60df5e546419f56b97610609"},
                                {name: "Ram", type: "category", id: "60df5e546419f56b9761060a"},
                                {name: "Keyboard", type: "category", id: "60df5e546419f56b9761060b"}
                            ]
                        },
                    ]
                },
                {
                    name: 'Laptop and Laptop Assesories',
                    id: "444",
                    type: 'sub_category',
                    subCategory: [
                        {
                            name: 'Laptop',
                            id: "444",
                            type: 'entry_category',
                            items: [
                                {name: "Dell", type: "entry_category",  id: "2232"},
                                {name: "Asus", type: "entry_category",  id: "34ewr"},
                                {name: "Gigatech", type: "entry_category", id: "23er;r"}
                            ]
                        },
                        {
                            name: 'Laptop Components',
                            id: "22",
                            type: 'entry_category',
                            items: [
                                {name: "motherboard", type: "entry_category",  id: "000"},
                                {name: "keyboard", type: "entry_category",  id: "000"},
                                {name: "battery", type: "entry_category", id: "000"}
                            ]
                        },
                    ]
                },
                // {
                //     name: 'Computer Accessories',
                //     type: 'sub_caregory',
                //     id: "100",
                //     subCategory: [
                //         {
                //             name: 'Computer Components',
                //             type: 'sub_caregory',
                //             id: "100",
                //             items: [
                //                 {name: "Motherboard", type: "entry_category", id: "2"},
                //                 {name: "Processor", type: "entry_category", id: "10"},
                //                 {name: "Ram", type: "entry_category", id: "11"},
                //                 {name: "Keyboard", type: "entry_category", id: "12"}
                //             ]
                //         },
                //     ]
                // },
                {
                    name: 'Mobiles',
                    type: "entry_category",
                    id: "322",
                    subCategory: [
                        {
                            name: 'Mobile Phone',
                            type: "entry_category",
                            id: "322",
                            items: [
                                {name: "Samsung", type: "entry_brand", id: "2j2"},
                                {name: "IPhone", type: "entry_brand", id: "34tyr"},
                                {name: "Xiomi", type: "entry_brand", id: "2hg3r"},
                                {name: "Huawei", type: "entry_brand", id: "egd"}
                            ]
                        },
                    ]
                },
            
                {
                    name: 'Tablet',
                    type: "entry_category",
                    id: "323",
                    subCategory: [
                        {
                            name: 'Tablet',
                            type: "entry_category",
                            id: "323",
                            items: [
                                {name: "Samsung", type: "entry_brand",  id: "2hgdsfj342"},
                                {name: "IPhone", type: "entry_brand",  id: "3f4rdf"},
                                {name: "Xiomi", type: "entry_brand", id: "23fghtr"},
                                {name: "Huawei", type: "entry_brand", id: "edf"}
                            ]
                        },
                    ]
                },
                {
                    name: 'Mobile and Accessories Tablet',
                    subCategory: [
                        {
                            name: 'Mobile and Accessories Tablet',
                            items: [
                                {name: "Charger", type: "entry_category",  id: "23dsf42"},
                                {name: "Storage", type: "entry_category", id: "34r"},
                                {name: "Power bank", type: "entry_category", id: "23r"},
                                {name: "HeadPhone", type: "entry_category", id: "ed"}
                            ]
                        },
                    ]
                }
            ]
        }
    ]