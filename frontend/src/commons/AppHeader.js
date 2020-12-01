// import React, { Component } from 'react';
// import {
//     Link,
//     withRouter
// } from 'react-router-dom';
// import '../css/AppHeader.css';
// // import pollIcon from '../poll.svg';
// import { Menu, Icon, Grid, MenuItem } from '@material-ui/core';

// import ReactDropdown from 'react-dropdown';
// import 'react-dropdown/style.css';
// const Dropdown = ReactDropdown;
// const Header = Grid.Header;
    
// class AppHeader extends Component {
//     constructor(props) {
//         super(props);   
//         this.handleMenuClick = this.handleMenuClick.bind(this);   
//     }

//     handleMenuClick({ key }) {
//       if(key === "logout") {
//         this.props.onLogout();
//       }
//     }

//     render() {
//         let items=[];
//         if(this.props.currentUser) {console.log("AppHeader if cond",this.props.currentUser);
//         items.add( <Menu>
//           <MenuItem key="/"><Link to="/">
//                   <Icon type="home" className="nav-icon" />
//                 </Link></MenuItem>
//           <MenuItem key="/profile"className="profile-menu" ><ProfileDropdownMenu 
//                     currentUser={this.props.currentUser} 
//                     handleMenuClick={this.handleMenuClick}/></MenuItem>
//         </Menu> );
//         } else {console.log("AppHeader else cond",this.props.currentUser);
//         items.add( <Menu>
//           <MenuItem key="/authenticate"><Link to="/authenticate">
//                 Login
//                 </Link></MenuItem>
//           <MenuItem key="/register">
//               <Link to="/register">Signup</Link>
//             </MenuItem>
//         </Menu> );
//         }

//         return (
//             <Header className="app-header">
//             <div className="container">
//               <div className="app-title" >
//                 <Link to="/">Polling App</Link>
//               </div>
//               <Menu
//                 className="app-menu"
//                 mode="horizontal"
//                 selectedKeys={[this.props.location.pathname]}
//                 style={{ lineHeight: '64px' }} >
//                   {items}
//               </Menu>
//             </div>
//           </Header>
//         );
//     }
// }

// function ProfileDropdownMenu(props) {
//   const dropdownMenu = (
//     <Menu onClick={props.handleMenuClick} className="profile-dropdown-menu">
//       <Menu.Item key="user-info" className="dropdown-item" disabled>
//         <div className="user-full-name-info">
//           {props.currentUser.name}
//         </div>
//         <div className="username-info">
//           @{props.currentUser.username}
//         </div>
//       </Menu.Item>
//       <Menu.Divider />
//       <Menu.Item key="profile" className="dropdown-item">
//         <Link to={`/users/${props.currentUser.username}`}>Profile</Link>
//       </Menu.Item>
//       <Menu.Item key="logout" className="dropdown-item">
//         Logout
//       </Menu.Item>
//     </Menu>
//   );

//   return (
//     <Dropdown 
//       overlay={dropdownMenu} 
//       trigger={['click']}
//       getPopupContainer = { () => document.getElementsByClassName('profile-menu')[0]}>
//       <a className="ant-dropdown-link">
//          <Icon type="user" className="nav-icon" style={{marginRight: 0}} /> <Icon type="down" />
//       </a>
//     </Dropdown>
//   );
// }


// export default withRouter(AppHeader);