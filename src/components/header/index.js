import React, { Component } from "react";

export default class Header extends Component {
  render() {
    return (
      <header>
        <div className="header__row">
          <h1>{this.props.text}</h1>
        </div>
      </header>
    );
  }
}
