const React = require('react');
const PullSearch = require('./PullSearch');
const PullEntry = require('./PullEntry');
const _ = require('lodash');

class PullList extends React.Component {
  
  constructor(props) {
    super(props);
  }

  componentDidUpdate () {
    //Anytime the component renders, scroll to the top of the ticket list
    $('.main-pulls-view')[0].scrollTop = 0; 
    $('.collapsible').collapsible();
  }
  componentDidMount () {
    $('.collapsible').collapsible();
    Materialize.showStaggeredList('pull-list');
  }

  render() {
    return (     
   	  <div >
        <PullSearch searchHandler={this.props.getFavedRepos} languages={this.props.languages} />
        <h4>You have {this.props.FavedRepos} pull requests</h4>
        <div className="main-pulls-view">
          <ul id="pull-list" classname="collapsible popout">
            {_.map(this.props.FavedRepos, (pull, index) => 
              <PullEntry data={pull} key={index} />
            )}
          </ul>
        </div>
      </div>
    )
  }
}

module.exports = PullList;