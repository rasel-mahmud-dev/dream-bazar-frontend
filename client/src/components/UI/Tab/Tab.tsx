import React, {FC, ReactNode} from 'react';
import "./tab.scss"

type TabProps = {
    onTabChange: (arg: number | string)=>void
    openTabIndex: number  | string
    tabComponents: {[key in (number | string)]: ()=>ReactNode}
    tabHeader: {[key in (number | string)]: {
        title: string
    }}
}
const Tab: FC<TabProps> = (props) => {
    const {
        onTabChange,
        openTabIndex,
        tabComponents,
        tabHeader
    } = props

    const TC = tabComponents[openTabIndex as keyof typeof tabComponents]

    return (
        <div className="rs-tab">
            <div className="tab-header">
                {Object.keys(tabHeader).map(tabIndex=>(
                    <div className={`tab-item ${tabIndex == openTabIndex ? "tab-item__active": ""}`}
                         onClick={()=>onTabChange(tabIndex)}>
                        <h2>{tabHeader[tabIndex].title}</h2>
                    </div>
                ))}
            </div>
            <div className="tab-content">
                {TC()}
            </div>
        </div>
    );
};

export default Tab;