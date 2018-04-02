import React, { Component } from "react";

class Package2VersionRow extends Component {
	render() {
		return (
			<tr>
				<td>{this.props.curVersion.Name}</td>
				<td>{this.props.curVersion.Id}</td>
				<td>{this.props.curVersion.SubscriberPackageVersionId}</td>
                <td>{this.props.curVersion.Version}</td>
				<td>{this.props.curVersion.Package2Name}</td>
				<td>{this.props.curVersion.Package2Id}</td>
			</tr>
		);
	} 
} 

export default Package2VersionRow;