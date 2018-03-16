import React, {Component} from 'react';

class Header extends Component {
    render() {
        return(
            <header className="app-header navbar">
                <a href="javascript:;" className="navbar-brand"></a>
                <button type="button" className="d-lg-none navbar-toggler">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <ul className="d-md-down-none navbar-nav">
                    <li className="px-3 nav-item">
                        <a href="javascript:;" className="nav-link">Users</a>
                    </li>
                </ul>
            </header>
        );
    }
}

export default Header;