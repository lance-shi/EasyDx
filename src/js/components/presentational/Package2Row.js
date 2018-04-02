import React, { Component } from "react";

class Package2Row extends Component {
	render() {
		return (
			<tr>
				<td>{this.props.curPackage.Name}</td>
				<td>{this.props.curPackage.Id}</td>
				<td>{this.props.curPackage.ContainerOptions}</td>
				<td>{this.props.curPackage.SubscriberPackageId}</td>
				<td>{this.props.curPackage.Description}</td>
			</tr>
		);
	} 
} 

export default Package2Row;