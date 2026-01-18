import React,{JSX} from "react";
import FileLoader from "../Components/FileLoader/FileLoader";
import StyledContainer from "./StyledContainer";
import { uselogprovider } from "../Components/FileLoader/data";

export default function FilelistScreen():JSX.Element{
const defaultfolder="ExampleFiles";

const {logged}=uselogprovider();
return(
        <StyledContainer title={"Lista plikow"} subtitle={""}>
            <FileLoader folder={defaultfolder} login={logged} typefilter=""></FileLoader>
        </StyledContainer>       
    );
}
