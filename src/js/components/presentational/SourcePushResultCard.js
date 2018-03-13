import React, { Component } from "react";
import SourcePushResultList from "./SourceList";

function SourcePushResultCard(props) {
	return (
		<div className="card mb-4">
            <div className="card-body">
                <SourcePushResultList changes={props.pushResult}/>
                <div className="divider"></div>
            </div>
        </div>
	);
}

export default SourcePushResultCard;