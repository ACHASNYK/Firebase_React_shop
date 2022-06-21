import React, { Component } from "react"
import {loadFromStorage} from './loadFromStorage'

class Title extends Component {
    render() {

        return (

            <div className="title">
                <h1>{this.props.name||loadFromStorage("category")}</h1>
            </div>
        )
    }
}

export default Title;   