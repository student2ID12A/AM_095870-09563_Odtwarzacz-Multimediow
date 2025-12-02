import React,{JSX, useEffect, useState} from "react";
import FileLoader from "../Components/FileLoader/FileLoader";
import StyledContainer from "./StyledContainer";

export default function FilelistScreen({navigation}):JSX.Element{
const defaultfolder="ExampleFiles";
    
    return(
        <StyledContainer title={"Lista plikow"} subtitle={""}>
            <FileLoader folder={defaultfolder} typefilter={""}></FileLoader>
        </StyledContainer>
        
    );
}
