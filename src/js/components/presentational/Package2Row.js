import React, { Component } from "react";
import axios from "axios";

class Package2Row extends Component {
	render() {
		return (
			<tr>
				<td>{this.props.curPackage.Id}</td>
				<td>{this.props.curPackage.SubscriberPackageId}</td>
			</tr>
		);
	} 
} 


export default Package2Row;