import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";
// import 'react-pro-sidebar/dist/css/styles.css';
import {
  BiBarChartAlt2,
  BiCalendarAlt,
  BiClipboard,
  BiBookContent,
  BiCog,
  BiUserPin,
  BiData,
  BiHomeAlt,
  BiUser,
} from "react-icons/bi";
import { SiMastercomfig } from "react-icons/si";
import { FiUserPlus } from "react-icons/fi";
import { GoLightBulb } from "react-icons/go";
import { IoAdd } from "react-icons/io5";
import { RiMenuAddLine } from "react-icons/ri";
import { RxDot } from "react-icons/rx";
import { avatar17 } from "../imagepath";
import { FaPlus } from "react-icons/fa";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"


const SidebarMenu = ({ menuItems }) => {
  const userData = sessionStorage.getItem("userData");
  if (userData !== null) {
    var username = JSON.parse(userData).Admin;
    var code = JSON.parse(userData).UserId
  }
  // const { location } = props;
  const location = useLocation();
  let pathname = location.pathname;
  console.log("pathnamefromSidebar", pathname);
  const icons = {
    "<BiHomeAlt />": <BiHomeAlt />,
    "<BiCog />": <BiCog />,
    "<SiMastercomfig />": <SiMastercomfig />,
    "<FiUserPlus />": <FiUserPlus />,
    "<BiBookContent />": <BiBookContent />,
    "<BiUserPin />": <BiUserPin />,
    "<BiUser />": <BiUser />,
    "<BiData />": <BiData />,
    "<BiCalendarAlt />": <BiCalendarAlt />,
    "<BiBarChartAlt2 />": <BiBarChartAlt2 />,
    "<GoLightBulb />": <GoLightBulb />,
  };

  const childIcons = {
    childValue1: <IoAdd />,
    childValue2: <BiClipboard />,
    // Define icons for each child item value as needed
  };


 

  const renderMenu = (items) => {
    return items.map((item) => (
      <React.Fragment key={item.value}>
        {item.children && item.children.length > 0 ? (
          <SubMenu 
          icon={icons[item["imgPath"]]} 
          label={item.label}
          >
            {renderSubMenu(item.children)}
          </SubMenu>
        ) : (
          <MenuItem 
            icon={icons[item["imgPath"]]} 
            component={<Link to={item.address} />}
            style={{
              background: pathname === item.address ? '#800080' : ' ',
              color: pathname === item.address ? 'white' : 'black',
              
            }}
          >
            {item.label}
          </MenuItem>
        )}
      </React.Fragment>
    ));
  };

  const renderSubMenu = (children) => {
    return children.map((childItem) => (
      <React.Fragment key={childItem.value}>
        {childItem.children && childItem.children.length > 0 ? (
          <SubMenu
            icon={childIcons[childItem.value] || <RxDot />}
            label={childItem.label}
          >
            {renderSubMenu(childItem.children)}
          </SubMenu>
        ) : (
          <MenuItem
            icon={childIcons[childItem.childValue1] || <RiMenuAddLine />}
            component={<Link to={childItem.address} />}
            style={{
              background: pathname === childItem.address ? '#800080' : ' ',
              color: pathname === childItem.address ? 'white' : 'black',
              // Other styles
            }}
          >
            {childItem.label}
          </MenuItem>
        )}
      </React.Fragment>
    ));
  };
  // #fff

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <Sidebar
        width="230px"
        backgroundColor="rgb(249, 249, 249, 0.4)"
        border="0px"
      >
        <Menu iconShape="square"> 
        {renderMenu(menuItems)}
          </Menu>
      </Sidebar>
    </div>
  );
};

export default SidebarMenu;
