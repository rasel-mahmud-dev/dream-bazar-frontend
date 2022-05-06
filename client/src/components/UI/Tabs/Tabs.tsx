import React, {FC} from "react"
import "./Tabs.scss"
import TabPane from "UI/Tabs/TabPane";

interface TabProps{
  defaultActiveKey?: number | string,
  children?: any[]
  onChange?: (key: number|string) => any
}


const Tabs = (props: TabProps): JSX.Element  => {
  
  const { defaultActiveKey, onChange } = props
  
  interface TabHeaderProps{
    tab: string, key: string | number
  }
  const [activeTabKey, setActiveTabKey] = React.useState<number|string>(1)
  const [tabsHeader, setTabsHeader] = React.useState<TabHeaderProps[]>([{ tab: '', key: '' }])
  
  React.useEffect(()=>{
    let tabsHeader1: TabHeaderProps[] = []
    props.children && props.children.map(item=>{
      if (item.type.displayName === "TabPane") {
        tabsHeader1.push({tab: item.props.tab, key: item.key})
      }
    })
    if(defaultActiveKey) {
      setActiveTabKey(defaultActiveKey)
    }
    setTabsHeader(tabsHeader1)
  }, [])
  
  
  function switchTabHandler(key){
    setActiveTabKey(key)
    onChange && onChange(key)
  }
  
  function renderContent(){
    return props.children && props.children.map(item=>{
      return (
        <div className={["tab_content", activeTabKey == item.key ? "active_tab_content" : "inactive_tab_content"].join(" ")} >
          {item.props.children}
        </div>
      )
    })
  }
  
  return (
    <div className="tabs">
      <div className="tab_root">
        {tabsHeader && tabsHeader.map(t=>{
          return (
            <div
              onClick={()=>switchTabHandler(t.key)}
              className={["tab", activeTabKey == t.key ? "active-tab": "" ].join(" ")} >
              <span className="tab_header" >{t.tab}</span>
            </div>
          )
        })}
      </div>
      { renderContent() }
    </div>
  )
}

Tabs.TabPane = TabPane

export default Tabs