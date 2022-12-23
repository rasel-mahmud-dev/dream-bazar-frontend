import React from 'react';

const SpecificationDetail = ({specification}) => {
    return (
        <div>
            <div className="section_title">
                Specifications
            </div>
            {
                specification && Object.keys(specification).map((sectionKey) => {
                    return (
                        <div className="description_section">
                            <div className="mt-5">
                                <div className="description_key description_key_att">{sectionKey}</div>
                                <div className="description_value">
                                    {specification &&
                                        specification[sectionKey] &&
                                        Object.keys(specification[sectionKey]).map((sec) => (
                                            <div className="description_section_row">
                                                <li className="description_key--key">{sec}</li>
                                                <li className="description_key--value">
                                                    {specification && specification[sectionKey][sec]}
                                                </li>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    );
                })
            }

            <div className="p-5 disclimer">
                <p>
                    <span className="strong">Disclaimer</span>. We can not guarantee that the information on this page is 100% correct.
                    Read more
                </p>
            </div>

        </div>
    );
};

export default SpecificationDetail;