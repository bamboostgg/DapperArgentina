const React = require('react');
const FavoriteEntry = require('./UserFavoriteEntry');
const _ = require('lodash');

class UserFavoriteList extends React.Component {
  
  constructor(props) {
    super(props);
  }

  componentDidUpdate () {
    //Anytime the component renders, scroll to the top of the ticket list
    $('.main-favorite-view')[0].scrollTop = 0; 
    $('.collapsible').collapsible();
  }
  componentDidMount () {
    $('.collapsible').collapsible();
    Materialize.showStaggeredList('#user-favorite-repos')
  }


  render() {
  	
  	return(
      <div className="main-favorite-view">
        <h4>My Favorite Repos</h4>

        <ul id="user-favorite-repos"className="collapsible popout" data-collapsible="accordion">
          {_.map (this.props.favorites, (repo, index) => {
              if (index !== "empty"){
                return <FavoriteEntry data={repo} key={index} />
              }
            }
          )}
        </ul>
      </div>
  	);
  }

}

module.exports = UserFavoriteList;