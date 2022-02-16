import { render } from '@testing-library/react';
import {useEffect, useState, useRef} from 'react';
import './App.css';
import useSpotifyAPI from './useSpotifyAPI';
import Title from './components/Title';
import Counter from './components/Counter';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

function App() {
  const [playlistID, setPlaylistID] = useState('')
  const playlistItems = useSpotifyAPI(playlistID)
  const [currentTrack, setCurrentTrack] = useState(null)
  const [gameState, setGameState] = useState(-1) 
  //-1 = game not started, 0 = game in progress, 1 = won, 2 = lost
  const [hearsAudio, setHearsAudio] = useState(true)
  //0 = track does not have preview_url, 1 = track has preview_url, 2 = track has preview_url but user says it does not
  const i = useRef(0);
  const len = useRef(0);
  const counter = useRef(0);

  function handleGameStartClick(){
    setGameState(0);
    len.current = playlistItems.length;
    console.log('game started!')
    repeatGame();
  }

  function repeatGame(){
    i.current = Math.floor(Math.random() * playlistItems.length);
    counter.current++;
    setHearsAudio(true);
    //console.log(i.current);
    console.log(playlistItems[i.current])
    setCurrentTrack(playlistItems[i.current].track);
  }

  function resetGame(){
    setGameState(-1)
    setPlaylistID('')
    setCurrentTrack(null)
    i.current = 0
    counter.current = 0;
  }

  function handleGuessLogic(guess){
    if(guess.toUpperCase() === currentTrack.name.toUpperCase()){
      playlistItems.splice(i.current, 1);
      if(playlistItems.length === 0){
        console.log("you win!")
        setGameState(1)
      } else{ 
        repeatGame();
      }

    } else{
      console.log("wrong, u lose")
      setGameState(2)
    }
  }

  //
  const TrackVisual = () => (
    <div style={{display: "none"}}>
      <AudioPlayer
          src={currentTrack.preview_url}
          autoPlay={true}
          volume={0.3}
        />
    </div>
  )

// onSubmit = {e => {e.preventDefault(); handleGuess(e.target[0].value)}}
  const GuessForm = () => (
     <div className="guessForm">
        <form onSubmit = {e => {e.preventDefault(); handleGuessLogic(e.target[0].value)}}>
          <label>guess the current song: </label>
          <input autoFocus type="text" placeholder="Good Song (ft. A)"></input>
          <button type={"Submit"}>guess</button>
        </form>
      <button onClick={() => {setHearsAudio(false)}}>i don't hear audio</button>
      {!hearsAudio ? <div>Sorry about that :( <br></br> The current track is: <strong>{currentTrack.name}</strong></div> : null}

    </div>
  )

  return (
    <div className="App">
      <header className="App-header">

        {gameState===-1 ? 
          <div>
            <Title />
            <form onSubmit= {e => {e.preventDefault(); setPlaylistID(((e.target[0].value).substring(0, e.target[0].value.indexOf('?'))).replace("https://open.spotify.com/playlist/", ""))}}>
              <label>enter a playlist link: </label>
              <input autoFocus type="text" placeholder="https://open.spotify.com/playlist/4T5XgcTRrcdlmQLW1ULC0U?si=0e0f20e0546d4358"></input>
              <button type={"Submit"}>enter</button>
            </form> 
          </div>: null}

        {(playlistID && gameState===-1) ? 
          <div>
            <br></br>
            <iframe className="playlist-iframe" src={`https://open.spotify.com/embed/playlist/${playlistID}?utm_source=generator`} width="100%" height="380" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
            <button onClick = {handleGameStartClick}>Start Game</button>
          </div> : null}
  
        {gameState === 0 ? <div><TrackVisual /> <GuessForm /> <Counter counter = {counter.current} len={len.current}/></div> : null}
        {gameState === 1 ? <div>You Win!!</div> : null}
        {gameState === 2 ? <div>That's wrong...<br></br> The current track was: <strong>{currentTrack.name}</strong></div> : null}
        {(gameState === 1 || gameState === 2) ? <button onClick = {resetGame}>Play Again?</button> : null}
        
      </header>
    </div>
  );
}

export default App;
