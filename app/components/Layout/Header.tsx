import React from "react";
import {Container, Icon, Title} from "./Header.components";


export const Header: React.VFC<{}> = function () {
    return (
        <Container>
            <Icon/>
            <Title>Wordle</Title>
            <Icon/>
        </Container>
    )
}
