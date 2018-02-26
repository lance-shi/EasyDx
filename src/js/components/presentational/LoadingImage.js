import React, { Component } from "react";

class LoadingImage extends Component {
    render() {
        return (
            <div id="loading">
                <img id="loading-image" src="img/loading.gif" alt="Loading..." />
            </div>
        );
    }
}

export default LoadingImage;