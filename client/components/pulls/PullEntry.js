const React = require('react');
const Link = require('react-router').Link;

class PullEntry extends React.Component {
  constructor (props) {
  	super(props)
  }

  render(){
  	let merged = this.props.data.merged ? "been merged" : "not been merged.";
  	return (
  		<li>
  			<div className="collapsible-header">
  				<span>{this.props.data.title}</span>
  				<i className="material-icons right">call_merge</i>
  			</div>
      		<div className="collapsible-body">
      			<span>This Pull Request has {merged}</span>
      		</div>
  		</li>
  	)
  }
 }


module.exports = PullEntry;