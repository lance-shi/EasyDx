import React, { Component } from "react";

function PageHeader(props) {
	return (
		<header class="page-header row">
            <div class="col-md-6 col-lg-8" >
                <h1 class="float-left text-center text-md-left">{props.title}</h1>
            </div>
        </header>
	);
}

export default PageHeader;