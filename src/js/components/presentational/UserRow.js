import React, { Component } from "react";

class UserRow extends Component {
	constructor(props) {
		super(props);
		this.handleShowDetail = this.handleShowDetail.bind(this);
		this.handleGeneratePassword = this.handleGeneratePassword.bind(this);
	}

	handleShowDetail() {
		this.props.setDetailUser(this.props.user);
	}

	handleGeneratePassword() {
		this.props.generatePassword(this.props.user);
	}

	render() {
		return (
			<tr>
				<td>{this.props.user.defaultMarker}</td>
				<td>{this.props.user.username}</td>
				<td>{this.props.user.alias}</td>
				<td>{this.props.user.profileName}</td>
                <td>
					<div className="btn-group">
						<button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
							Action
						</button>
						<div className="dropdown-menu">
							<a className="dropdown-item" href="javascript:;" onClick={this.handleShowDetail}>Display Details</a>
							<a className="dropdown-item" href="javascript:;" onClick={this.handleGeneratePassword}>Generate Password</a>
						</div>
					</div>
                </td>
			</tr>
		);
	} 
} 

export default UserRow;