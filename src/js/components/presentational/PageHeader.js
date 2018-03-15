import React, { Component } from "react";

function PageHeader(props) {
	return (
        <div>
            <ol className="breadcrumb">
                <li className="active breadcrumb-item">{props.title}</li>
            </ol>
        </div>
	);
}

export default PageHeader;