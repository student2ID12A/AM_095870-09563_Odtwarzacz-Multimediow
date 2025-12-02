import React,{JSX, useEffect,useState} from "react";
import {FlatList, StyleSheet,Text,Image} from "react-native";
import { Asset} from "expo-asset";
import {filest} from "./data";
import FileScheme from "./FileScheme";
import { Directory, Paths,File } from "expo-file-system";


type FLProp={
    folder:string
    typefilter?:string
}


export default function FileLoader({folder,typefilter}:FLProp):JSX.Element{

type oprop={
  inf:Asset;
  path:any;
}


const [result, setResult] = useState<oprop[]>([]);
const filenames = filest[folder];

const loadfiles = async () => {
  try {
    const fetchedfiles: oprop[] = [];

    for (let i = 0; i < filenames.length; i++) {
      const asset = Asset.fromModule(filenames[i].path);
      await asset.downloadAsync();
      fetchedfiles.push({
        inf:asset,
        path:filenames[i].path
      })
    }

    const filtered = fetchedfiles.filter(it => it.inf.name.includes(typefilter));
    console.log("znaleziono: ",filtered)
    return filtered;
  } catch (e) {
    console.error("error:", e);
  }
};

useEffect(() => {
  (async () => {
    const val = await loadfiles();
    if (val) setResult(val);
  })();
}, []);
    return(
       <FlatList style={styles.container} data={result} renderItem={({item})=><FileScheme 
                inf={item.inf}
                ref={item.path}></FileScheme>}>
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
<FlatList style={styles.container} data={filtered} renderItem={({item})=><FileScheme 
       name={item.name} 
       size={(item.size/1024).toPrecision(4).toString()}
       dir={folder}
       lastMod={item.info().modificationTime}></FileScheme>}>
       </FlatList>

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