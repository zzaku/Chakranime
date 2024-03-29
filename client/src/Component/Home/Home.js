import Extrait from "./Extrait/Extrait"
import List from "./List/List"
import { useEffect, useMemo, useState } from "react"
import { useMediaQuery } from "@mui/material"
import "./style/Home.css"
import { useAuth } from "../Context/AuthContext"
import { isSafari } from "react-device-detect"

const Home = ({allAnimes, setNotAtHome}) => {

    const genres = useMemo(() => ["S-F", "Action", "Aventure", "Comédie", "Tranche de vie", "Drame", "Fantasy", "Surnaturel", "Mystère", "Shonen", "Psychologique", "Romance", "Films", "Les plus regardés", "Reprendre", "Nouveaux Episodes"], [])

    const {currentUser, currentUserID} = useAuth()
    const mobile = useMediaQuery("(max-width:968px)");

    //const [genre1, setGenre1] = useState([{}])
    //const [genre2, setGenre2] = useState([{}])
    const [genre3, setGenre3] = useState([{}])
    const [genre4, setGenre4] = useState([{}])
    //const [genre5, setGenre5] = useState([{}])
    //const [genre6, setGenre6] = useState([{}])
    //const [genre7, setGenre7] = useState([{}])
    const [genre8, setGenre8] = useState([{}])
    const [genre9, setGenre9] = useState([{}])
    //const [genre10, setGenre10] = useState([{}])
    //const [genre11, setGenre11] = useState([{}])
    const [genre12, setGenre12] = useState([{}])
    const [genre13, setGenre13] = useState([{}])
    const [resume, setResume] = useState([{}])
    const [mostWatched, setMostWatched] = useState([{}])
    const [lastAnime, setLastAnime] = useState([{}])
    const [ready, setReady] = useState(false)

    
        const getParam = (parameter) => {
            let params = ""
            for(let i = 2; i <= 12; i++){
                params += `&genre${i}=${parameter}`
            }
            return params
        }
        
        useEffect(() => {

                getByLastAnime()
                getMostWatched()
                getByGenre13()
                getByGenre4()
                getByGenre8()
                getByGenre9()
                getByGenre12()
                getByGenre3()

                return () => {
                    getByLastAnime()
                    getMostWatched()
                    getByGenre13()
                    getByGenre4()
                    getByGenre8()
                    getByGenre9()
                    getByGenre12()
                    getByGenre3()
                }    
        }, [])

        useEffect(() => {
            getResume()

            return () => {
                getResume()
              }
        }, [currentUserID, currentUser])
        

                let getByGenre3 = async () => {
                    fetch(`${process.env.REACT_APP_API_ANIME}/VOD/animes/Allgenres?genre1=${genres[2]}${getParam(genres[2])}`)
                    .then(res => res.json())
                    .then(data => setGenre3([{[genres[2]]: data}]))
                  }
                
                let getByGenre4 = async () => {
                    fetch(`${process.env.REACT_APP_API_ANIME}/VOD/animes/Allgenres?genre1=${genres[3]}${getParam(genres[3])}`)
                    .then(res => res.json())
                    .then(data => setGenre4([{[genres[3]]: data}]))
                  }
        
                let getByGenre8 = async () => {
                    fetch(`${process.env.REACT_APP_API_ANIME}/VOD/animes/Allgenres?genre1=${genres[7]}${getParam(genres[7])}`)
                    .then(res => res.json())
                    .then(data => setGenre8([{[genres[7]]: data}]))
                  }

                let getByGenre9 = async () => {
                    fetch(`${process.env.REACT_APP_API_ANIME}/VOD/animes/Allgenres?genre1=${genres[8]}${getParam(genres[8])}`)
                    .then(res => res.json())
                    .then(data => setGenre9([{[genres[8]]: data}]))
                  }

                let getByGenre12 = async () => {
                    fetch(`${process.env.REACT_APP_API_ANIME}/VOD/animes/Allgenres?genre1=${genres[11]}${getParam(genres[11])}`)
                    .then(res => res.json())
                    .then(data => setGenre12([{[genres[11]]: data}]))
                }

                let getByGenre13 = async () => {
                    fetch(`${process.env.REACT_APP_API_ANIME}/VOD/animes/type/Allfilm`)
                    .then(res => res.json())
                    .then(data => setGenre13([{[genres[12]]: data}]))
                }

                let getByLastAnime = async () => {
                    fetch(`${process.env.REACT_APP_API_ANIME}/VOD/anime/recentlyadded?page=1`)
                    .then(res => res.json())
                    .then(data => setLastAnime([{[genres[15]]: data}]))
                }

                let getMostWatched = async () => {
                    await fetch(`${process.env.REACT_APP_API_ANIME}/VOD/anime/mostWatched`)
                    .then(res => res.json())
                    .then(data => setMostWatched([{[genres[13]]: data}]))
                }

                let getResume = async () => {
                    if(currentUser?.Resume){
                        let ids = currentUser?.Resume?.map(anime => anime.animeId);
                        if(ids){
                            await fetch(`${process.env.REACT_APP_API_ANIME}/VOD/list/animes?animeId=${ids}`)
                            .then(res => res.json())
                            .then(data => setResume([{[genres[14]]: data}]))
                        }
                        }
                }

        return (
            <div className="anime-list">
                <div className="anime-container">
                    <div className="extrait" style={{height: isSafari && "26vh"}}>
                       <Extrait />
                    </div>
                    <div className="list">
                        <div className="list-container" style={{gridTemplateRows: !mobile ? (currentUserID ? (resume[0]?.[genres[14]]?.length > 0 ? "repeat(9, 600px)" : "repeat(8, 600px)") : "repeat(8, 600px)") : (currentUserID ? (resume[0]?.[genres[14]]?.length > 0 ? "repeat(9, 313px)" : "repeat(8, 313px)") : "repeat(8, 313px)")}}>
                            {lastAnime && genres[14] ? <List allAnimes={allAnimes} genres={genres[15]} genre={lastAnime} setGenre={setLastAnime} setNotAtHome={setNotAtHome} /> : null}

                            {!currentUserID || resume[0]?.Reprendre?.message?.name === "CastError" || resume[0]?.[genres[14]]?.length === 0 ? null : <List allAnimes={allAnimes} genres={genres[14]} genre={resume} setGenre={setLastAnime} setNotAtHome={setNotAtHome} />}

                            {mostWatched ? <List allAnimes={allAnimes} genres={genres[13]} genre={mostWatched} setGenre={setMostWatched} setNotAtHome={setNotAtHome} /> : null}
                            
                            {genre3 && genres[2] ?<List allAnimes={allAnimes} genres={genres[2]} genre={ genre3} setGenre={setGenre3} setNotAtHome={setNotAtHome}/> : null}
                            {genre4 && genres[3] ?<List allAnimes={allAnimes} genres={genres[3]} genre={ genre4} setGenre={setGenre4} setNotAtHome={setNotAtHome}/> : null}
                            

                            
                            {genre8 && genres[7] ?<List allAnimes={allAnimes} genres={genres[7]} genre={ genre8} setGenre={setGenre8} setNotAtHome={setNotAtHome}/> : null}
                            {genre9 && genres[8] ?<List allAnimes={allAnimes} genres={genres[8]} genre={ genre9} setGenre={setGenre9} setNotAtHome={setNotAtHome}/> : null}
                            
                            {genre12 && genres[11] ?<List allAnimes={allAnimes} genres={genres[11]} genre={ genre12} setGenre={setGenre12} setNotAtHome={setNotAtHome}/> : null}
                            {genre13 && genres[12] ?<List allAnimes={allAnimes} genres={genres[12]} genre={ genre13} setGenre={setGenre13} setNotAtHome={setNotAtHome}/> : null}
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Home