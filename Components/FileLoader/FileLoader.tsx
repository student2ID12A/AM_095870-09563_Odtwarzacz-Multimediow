import React,{JSX, useEffect,useState} from "react";
import {FlatList, StyleSheet} from "react-native";
import { Asset} from "expo-asset";
import {database, filest} from "./data";
import FileScheme from "./FileScheme";

type FLProp={
    folder:string,
    login:string;
    typefilter?:string
}

type oprop={
  inf:Asset;
  path:any;
}

export const loadfiles = async (folder,login,typefilter?) => {
  
const filenames = filest[folder];
const mainplaylist=database[login].Playlists[0].Files;

function getfromfilest(filename:string){
  const cos=filenames.filter(it=>it.name.includes(filename));
  return cos[0];
}
  try {
    const fetchedfiles: oprop[] = [];

    for (let i = 0; i < mainplaylist.length; i++) {
      
      const founded=getfromfilest(mainplaylist[i]);
      const asset = Asset.fromModule(founded.path);
      await asset.downloadAsync();
      fetchedfiles.push({
        inf:asset,
        path:founded.path
      })
    }

    const filtered = fetchedfiles.filter(it => it.inf.name.includes(typefilter));
    console.log("znaleziono: ",filtered)
    return filtered;
  } catch (e) {
    console.error("error:", e);
  }
};


export default function FileLoader({folder,login,typefilter}:FLProp):JSX.Element{

const [result, setResult] = useState<oprop[]>([]);

useEffect(() => {
  (async () => {
    const val = await loadfiles(folder,login,typefilter);
    if (val) setResult(val);
  })();
}, []);
    return(
      <FlatList style={styles.container} 
        data={result} renderItem={({item})=>
        <FileScheme 
        inf={item.inf}
        ref={item.path}>
        </FileScheme>}>
      </FlatList>
    );
}

const styles=StyleSheet.create({
    container:{
        width:"90%",
        margin:20,
        height:"60%",
        alignSelf:"center"
    }
})



/*
    var localfiles=dir.list();
    
    var filtered:(FS.Directory|FS.File)[]=[];
    filtered=localfiles.filter(It=> It.name.includes(typefilter))

*/


/*
    const filenames:string=filest[folder];
    var length=filenames.length;
    function LoadArray():Asset[]{
        var fetchedinfo:Asset[]=new Array(length);
        
        for(let i=0; i<length;i++)
        {
            fetchedinfo[i]=Asset.fromModule(filenames[i]);
        }
        return fetchedinfo;
    }
    const fetchedfiles=LoadArray();
    var dir=new Directory(Paths.document,folder);
    dir.create();
    // var localfiles:File[]=new Array(length);

     Paths.cache.list().filter(It=>{
         for(let i=0; i<length; i++)
         {
             if(It.name.includes(fetchedfiles[i].hash))
             {
                 It.rename(fetchedfiles[i].name+"."+fetchedfiles[i].type);
                 localfiles[i]=new File(Paths.cache,fetchedfiles[i].name+"."+fetchedfiles[i].type);
                 localfiles[i].move(dir);
             }
         }
     })

    */  // do modyfikacji z sprawdzeniem, czy te pliki istnieją (inicjacja plikow z projektu do aplikacji)