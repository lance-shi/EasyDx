import React, { Component } from "react";
import SourceList from "./SourceList";

function SourceListCard(props) {
	return (
		<div className="card mb-4">
            <div className="card-body">
                <SourceList sources={props.remoteChanges}
                    title="Remote Changes" 
                    key="RemoteChanges"/>
                <div className="divider"></div>
                <SourceList sources={props.localChanges}
                    title="Local Changes" 
                    key="LocalChanges"/>  
                <button type="button" className="btn btn-primary" 
					onClick={props.handleRefreshStatus}>Refresh Source Status</button>
            </div>
        </div>
	);
}

export default SourceListCard;