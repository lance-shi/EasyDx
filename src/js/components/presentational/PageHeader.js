import React, { Component } from "react";

function PageHeader(props) {
	return (
		<header className="page-header row">
            <div className="col-md-6 col-lg-8" >
                <h1 className="float-left text-center text-md-left">{props.title}</h1>
            </div>
        </header>
	);
}

export default PageHeader;