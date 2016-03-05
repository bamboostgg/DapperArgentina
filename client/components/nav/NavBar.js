const NavEntry = require('./NavEntry');
const React = require('react');
const Router = require('react-router').Router;
const Route = require('react-router').Route;
const Link = require('react-router').Link;


const NavBar = class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount () {
    $('.button-collapse').sideNav();
  }
  
  render() {
    let headerText = '';
    if(this.props.user){
      headerText = this.props.user.login
    }
    
    return (
      <div className="navbar-fixed">
        <nav className="cyan lighten-2" role="navigation">
          <div className="nav-wrapper container col s12 m4 l8">
            <Link to={"/profile"}>
              <i className="material-icons left">perm_identity</i>
              <span>{headerText}</span>
            </Link>
            <a id="logo-container" href="#" className="brand-logo left"> first ticket</a>
            <ul className="right hide-on-med-and-down">
              {this.props.links.map ((link, index) => 
                <NavEntry data={link} key={index} />
              )}
            </ul>
            <ul id="nav-mobile" className="side-nav">
              {this.props.links.map ((link, index) => 
                <NavEntry data={link} key={index} />
              )}
            </ul>
            <a href="#" data-activates="nav-mobile" className="button-collapse right"><i className="material-icons">menu</i></a>
          </div>
        </nav>
      </div>
    );
  }
  
};

module.exports = NavBar;