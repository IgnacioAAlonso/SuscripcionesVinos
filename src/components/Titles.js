import React, { Component } from "react";
import Common from "./Common";

class Titles extends Component {

    render() {

        return (
            <>
                <Common.TitlePage tilte={this.props.textoTitulo} />
            </>
        )
    }
}

export default Titles;