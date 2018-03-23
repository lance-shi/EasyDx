import React, { Component } from "react";
import UserRow from "./UserRow";

function UserList(props) {
	const userRows = props.users.map(user=><UserRow key={user.username} user={user}
        setDetailUser={props.setDetailUser}/>);
	return (
        <div className="card mb-4">
            <div className="card-header">
                <strong>User List</strong>
            </div>
            <div className="card-body">
                <h3 className="card-title">{props.title}</h3>
                <div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Default</th>
                                <th>Alias</th>
                                <th>User Name</th>
                                <th>Profile</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userRows}
                        </tbody>
                    </table>
                </div>
                <button type="button" className="btn btn-primary" 
					onClick={props.refreshUserList}>Refresh User List</button>
            </div>
        </div>
	);
}

export default UserList;