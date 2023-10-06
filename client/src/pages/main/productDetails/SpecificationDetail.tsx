import React from 'react';

const SpecificationDetail = ({specification}) => {
    return (
        <div className="mt-6">
            <div className="product_detail_title">
                Specifications
            </div>
            {
                specification && Object.keys(specification).map((sectionKey) => {
                    return (
                        <div className="">
                            <div className="mt-5">
                                <div className="text-dark-600 dark:text-dark-50  font-semibold">{sectionKey}</div>
                                <div className="">
                                    {specification &&
                                        specification[sectionKey] &&
                                        Object.keys(specification[sectionKey]).map((sec) => (
                                            <div className="flex items-start border-b py-2 last:border-none ">
                                                <li className="w-[250px] whitespace-nowrap">{sec}</li>
                                                <p className="">
                                                    {specification && specification[sectionKey][sec]}
                                                </p>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    );
                })
            }

            <div className="py-5 disclimer">
                <p>
                    <span className="strong">Disclaimer</span>. We can not guarantee that the information on this page is 100% correct.
                    Read more
                </p>
            </div>

        </div>
    );
};

export default SpecificationDetail;