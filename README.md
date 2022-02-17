# SpotiGuessr by Edward Shao
A web app inspired by the hit internet game GeoGuessr, created using **React** and **Spotify's Web API**.  
Live at: https://exzshao.github.io/spotiguessr/

SpotiGuessr is a game designed for music lovers that are convinced they really know their music.  
The goal of this game is to correctly name every song in your playlist by listening to Spotify's free 30 second preview. 

The game was designed to be very intuitive, but here are instructions anyways:  
How to play **SpotiGuessr by Edward Shao**:  
1. Enter a Spotify playlist link that is publicly accessible. An embedded playlist will appear, confirm it's the same as what you entered.
2. Click the "Start Game" button.
3. A song from the playlist you entered will start playing. In the guess field, simply enter the name of the song (not case sensitive, but otherwise must match song name exactly)
4. If you guess correctly, a different randomly chosen song from the playlist will start playing.
5. You win once you correctly name all the songs!
6. Click the "play again?" button to start a new game.

**NOTE:** Sometimes the song has no preview URL, so it will not play. In these cases, click the "i don't hear audio" button.  
Unfortunately, this is an (un)intended? feature on Spotify's end, and I cannot help this, unless I switch the OAuth Grant Flow. However, this would limit the accessibility of SpotiGuessr to Spotify Premium users only: Depending on the frequency of this issue, I may go this route, or I may try to find a different source for the missing songs.

Have fun!!! This is a very early version of the game so there will be bugs. UI in progress.