import React, {FC} from 'react';
import Input, {ClearableInputProps} from "./Input";
import "./Menu.scss"



interface InputDropdownMenu extends ClearableInputProps{
  dropdownMenu?: any[]
  handleEnterButton?: any
}

const Menu: FC<InputDropdownMenu> = (props) => {
  const {
    handleEnterButton,
    dropdownMenu,
    ...attributes
  } = props
  
  const [value, setValue] = React.useState("")
  
  // let dropdownMenu = [
  //   { name: "Jade Blue"},
  //   { name: "MUFTI"},
  //   { name: "Aarong"},
  //   { name: "Cats Eye"},
  //   { name: "Richman"},
  //   { name: "Ecstasy"},
  //   { name: "Rang"},
  //   { name: "Dorjibari"},
  //   { name: "Anjan’s"},
  //   { name: "Westecs"},
  //   { name: "Artisti"},
  //   { name: "Aa"},
  //   { name: "Aaa"},
  //   { name: "A"},
  //   { name: "Ara"}
  // ]
  
  const [ matchItems, setMatchItem ] = React.useState([])
  const [currentBestMatch, setCurrentBestMatch] = React.useState(-1)
  
  function handleChange(e){
      let updatedMatchItem = []
      let h = []
      dropdownMenu.forEach(menu => {
        let matchLetterIndex = menu.name.toLowerCase().indexOf(e.target.value.trim().toLowerCase())
        // console.log(matchLetterIndex)
        if (matchLetterIndex !== -1) {
          h.push({i: matchLetterIndex, item: menu})
        }
      })
  
      let g = h.sort(function (a, b) {
        if (a.i > b.i) {
          return 1
        } else if (a.i < b.i) {
          return -1
        } else {
          return 0
        }
      })
      g.forEach(i => {
        updatedMatchItem.push(i.item)
      })
    
    if(!e.target.value && e.target.value === "") {
      setCurrentBestMatch(0)
      setMatchItem([])
      setValue("")
    } else{
      setMatchItem(updatedMatchItem)
      setCurrentBestMatch(0)
      setValue(e.target.value)
    }
  }
  
  
  function handleKeyChange(e){
    let updatedCurrentMatch = currentBestMatch
    if(e.keyCode === 38){
      if(updatedCurrentMatch < 1){
        updatedCurrentMatch = (matchItems.length - 1)
      } else {
        updatedCurrentMatch = updatedCurrentMatch - 1
      }
    } else if(e.keyCode === 40){
      if(updatedCurrentMatch >= (matchItems.length - 1)){
        updatedCurrentMatch = 0
      } else {
        updatedCurrentMatch = updatedCurrentMatch + 1
      }
    } else if(e.keyCode === 13){
      setMatchItem([])
      setValue("")
      if(handleEnterButton){
        handleEnterButton(matchItems[currentBestMatch])
      }
    }
    setCurrentBestMatch(updatedCurrentMatch)
  }
  
  function handleClickSelectItem(e){
    let updatedCurrentMatch = currentBestMatch
    handleEnterButton(matchItems[currentBestMatch])
    setCurrentBestMatch(updatedCurrentMatch)
    setMatchItem([])
    setValue("")
  }
  
  return (
    <div className="input-wrapper-with-menu">
      <Input
        placeholder={props.placeholder}
        prefix={props.prefix}
        suffix={props.suffix}
        addonBefore={props.addonBefore}
        addonAfter={props.addonAfter}
        value={value}
        onChange={handleChange}
        onKeyUp={handleKeyChange}
        onKeyPress={handleKeyChange}
      />
  
      {
        matchItems && matchItems.length > 0 && (
          <div className="input-dropdown scroll-y-w2">
            { matchItems && matchItems.map((item, i)=>(
              <li
                onClick={handleClickSelectItem}
                className={[currentBestMatch === i ? "active-item" : "" ].join(" ")}
              >
                {item.name}
            </li>
            )) }
          </div>
        )
      }
      
    </div>
  );
};

export default Menu;
