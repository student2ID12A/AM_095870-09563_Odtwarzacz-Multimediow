import { createContext, useContext,useState } from "react";

type logincontextdata={
    logged:string|null;
    setlogged:(logged:string|null)=>void;
}

const loginpasser=createContext<logincontextdata|null>(null);

export const LoginProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [logged, setlogged] = useState<string | null>(null);

  return (
    <loginpasser.Provider value={{ logged, setlogged }}>
      {children}
    </loginpasser.Provider>
  );
};

export const uselogprovider=()=>{
    const context=useContext(loginpasser);
    if(!context) throw new Error("Inicjacja obiektu z Logprovidera w nieodpowiednim miejscu. Powinna byc w srodku funkcji!");
    return context;
}

export const filest={
    "ExampleFiles":[
        {name:"film.mp4",path:require("../../assets/ExampleFiles/film.mp4")},
        {name:"przyklad.mp3",path:require("../../assets/ExampleFiles/przyklad.mp3")},
        {name:"przyklad2.mp3",path:require("../../assets/ExampleFiles/przyklad2.mp3")},
        {name:"ruchomy.gif",path:require("../../assets/ExampleFiles/ruchomy.gif")},
        {name:"motor.jpg",path:require("../../assets/ExampleFiles/motor.jpg")},
        {name:"tier.png",path:require("../../assets/ExampleFiles/tier.png")},
        {name:"architektura.png",path:require("../../assets/ExampleFiles/architektura.png")},
        {name:"faza.mp3",path:require("../../assets/ExampleFiles/faza.mp3")},
        {name:"liga.png",path:require("../../assets/ExampleFiles/liga.png")},
        {name:"mc.mp4",path:require("../../assets/ExampleFiles/mc.mp4")},
        {name:"muza.mp3",path:require("../../assets/ExampleFiles/muza.mp3")},
        {name:"scp.jpg",path:require("../../assets/ExampleFiles/scp.jpg")},
    ],
}


export const database={
    "Jakub":{
        "Playlists":[
            {
                "name":"Main",
                "Files":[
                    "przyklad.mp3",
                    "przyklad2.mp3",
                    "liga.png",
                    "faza.mp3"
                ]
            }

        ]
    },
    "Kamil":{
        "Playlists":[
            {
                "name":"Main",
                "Files":[
                    "architektura.png",
                    "scp.jpg"
                ]
            }
            
        ]
    }
}

export let filetypefilter=""; // przypadkowo to tez dziala do szukania liter w nazwie (jak w wyszukiwarkach)