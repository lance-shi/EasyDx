import React, { Component } from "react";

class UserRow extends Component {
	constructor(props) {
		super(props);
		this.handleShowDetail = this.handleShowDetail.bind(this);
	}

	handleShowDetail() {
		this.props.setDetailUser(this.props.user);
	}

	render() {
		return (
			<tr>
				<td>{this.props.user.defaultMarker}</td>
				<td>{this.props.user.username}</td>
				<td>{this.props.user.alias}</td>
				<td>{this.props.user.profileName}</td>
                <td>
                    <button type="button" className="btn btn-primary" onClick={this.handleShowDetail}>
                        Display Details
                    </button>
                </td>
			</tr>
		);
	} 
} 

export default UserRow;