import {useEffect, useState} from 'react';
import axios from 'axios'

export default function useSpotifyAPI (playlistID){
    const [token, setToken] = useState('')
    const [playlistItems, setPlaylistItems] = useState([])

    const client_id = 'de1840e2c1ce41cdabaa0663e1495b5c'
    const client_secret = process.env.REACT_APP_CLIENT_SECRET

    useEffect(()=>{
        axios('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Authorization': ('Basic ' + btoa(client_id+ ':' + client_secret)),
                'Content-Type':'application/x-www-form-urlencoded',
            },
            data: 'grant_type=client_credentials'
        }).then(tokenResponse => {
            //console.log(tokenResponse.data.access_token)
            setToken(tokenResponse.data.access_token)
        }).catch(error => console.log(error));
    }, [])

    useEffect(()=>{
        if(playlistID!=''){
            (async () => {
                const {data} = await axios.get(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                console.log({data})
                setPlaylistItems(data.items)
            })();  
        }
    }, [playlistID])

    return playlistItems
}
