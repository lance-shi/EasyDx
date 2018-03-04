import React, { Component } from "react";

class AlertMessage extends Component {
    render() {
        let alertClass="alert alert-" + this.props.alertClass;
        return (
            <div className={alertClass}>
                {this.props.message}
            </div>
        );
    }
}

export default AlertMessage;