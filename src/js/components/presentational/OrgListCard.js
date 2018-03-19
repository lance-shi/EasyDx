import React, { Component } from "react";
import OrgList from "./OrgList";

class OrgListCard extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="card mb-4">
                <div className="card-body">
                    <OrgList orgs={this.props.nonScratchOrgs} title="Non Scratch Orgs" 
                        key="nonScratchOrgs"
                        setDetailOrg={this.props.setDetailOrg}
                        toggleLoadingImage={this.props.toggleLoadingImage}
                        showAlertMessage={this.props.showAlertMessage}
                        setDefaultOrg={this.props.setDefaultOrg}
                        setDefaultDevhub={this.props.setDefaultDevhub}
                        deleteOrg={this.props.deleteOrg}/>   
                    <div className="divider"></div>
                    <OrgList orgs={this.props.scratchOrgs} title="Scratch Orgs"
                        key="scratchOrgs"
                        setDetailOrg={this.props.setDetailOrg}
                        toggleLoadingImage={this.props.toggleLoadingImage}
                        showAlertMessage={this.props.showAlertMessage}
                        setDefaultOrg={this.props.setDefaultOrg}
                        setDefaultDevhub={this.props.setDefaultDevhub}
                        deleteOrg={this.props.deleteOrg}/>
                    <button id="orgInfo" type="button" className="btn btn-primary" 
						onClick={this.props.handleRefreshOrgs}>Refresh Org List</button>
                </div>
            </div>
        );
    }
}

export default OrgListCard;