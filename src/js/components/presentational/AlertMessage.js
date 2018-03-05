import React, { Component } from "react";

class AlertMessage extends Component {
    render() {
        let alertClass="alert alert-" + this.props.alertClass;
        return (
            <div className={alertClass}>
                <i className="fas fa-exclamation-circle fa-lg"></i> {this.props.message}
            </div>
        );
    }
}

export default AlertMessage;