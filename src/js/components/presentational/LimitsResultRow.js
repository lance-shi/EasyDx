import React, { Component } from "react";

class LimitsResultRow extends Component {
	render() {
		return (
			<tr>
				<td>{this.props.limitResult.name}</td>
				<td>{this.props.limitResult.max}</td>
				<td>{this.props.limitResult.remaining}</td>
			</tr>
		);
	} 
}

export default LimitsResultRow;