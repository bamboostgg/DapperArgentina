const React = require('react');
const Favs = require('../../js/favedRepos.js');


class UserFavoriteList extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    
    var unFavorite = () => {
      Materialize.toast(this.props.name + " was removed!", 4000)
      Favs.deleteFavedRepoFromApi(this.props.id);
      this.color = "grey-text lighten-2";
      this.render();
    }
      this.color = "cyan-text lighten-2";
  	return(
      <li className="user-favorite-entry">
        <div className="collapsible-header">
          <span>{this.props.data.name}</span>
          <i className="material-icons right {this.color}" onClick={unFavorite}>loyalty</i>
        </div>
        <div className="collapsible-body">
          <p> {this.props.data.org_name}<br/>
          {this.props.data.description}<br/>
          <a href={this.props.data.html_url}>GITHUB</a>
          </p>
        </div>
      </li>
  	);
  }

}

module.exports = UserFavoriteList;