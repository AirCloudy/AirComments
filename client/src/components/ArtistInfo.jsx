import React from 'react';
import './styles.css';
const path = require('path');


class ArtistInfo extends React.Component{

    render() {
        return (

        <div>
            <div class="flex-container-artist">
              <div><img className='artistPic' src='http://localhost:4000/songs/artistpic.jpg'></img></div>
              <div className='artistName'>Tierra Whack</div>
              <div class='stats-artist'>
                <div>
                  <svg viewBox="0 0 28 28" className='fol-icon' xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path fill="rgba(153, 153, 153, 0.7)" d="M18.4 18.5l2.5 5 .2.5H28l-2.1-4.3-4.1-1.5v-2.5c1.2-1.1 1.8-3.2 1.8-5.1 0-2.1-2-3.6-3.5-3.6s-3.5 1.6-3.5 3.6c0 1.9.5 4 1.8 5.1v2.5h-.1l.1.3z"/><path fill="#999" d="M17.5 19l-5-1.8v-3c1.4-1.2 2-3.8 2-5.9 0-2.4-2.3-4.3-4-4.3-1.7 0-4 1.8-4 4.3 0 2.2.6 4.7 2 5.9v3l-5 1.8L1 24h19l-2.5-5z"/></svg>
                </div>
                <div className='fol-stats'>29.7k</div>
                <div>
                  <svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" width="16" height='16'><path fill="#222" d="M5 12h2v4H5zM21 12h2v4h-2zM17 10h2v8h-2zM9 8h2v12H9zM13 5h2v18h-2z"/></svg>
                </div>
                <div className='fol-stats'>28</div>

              </div>
                <button className='followButton'>Follow</button>
           </div>
           <div className='flex-container-report'>
            <div className='report-icon'></div>
            <div className='report'>Report</div>
          </div>
        </div>
        )
    }
}

export default ArtistInfo;