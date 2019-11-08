import React from 'react';
import './styles.css';
const path = require('path');

const Commentbar = (props) => {



        return (
        <div class='flex-container-commentbar-interaction'>
            <div class="flex-container-commentbar">
              <div><img className='headshot' src='http://localhost:4000/headshot.jpg'></img></div>
                <div>
                    <form onSubmit = {props.handleAdd}>
                        <input className="form" type="text" name="inputBox" placeholder="Write a comment" size='60' onChange={props.handleChange}/>
                    </form>
                </div>
            </div>

           <div class='flex-container-interaction-bar'>
            <div class='flex-container-interaction'>
                <button class='likes'></button>
                <button class='reposts'></button>
                <button class='share'></button>
                <button class='next'></button>
                <button class='more'></button>
            </div>

            <div class='flex-container-stats'>
                    <div className='interaction-tiny-flex'>
                        <div className='plays-icon'></div>
                        <div className='plays'>267k</div>
                    </div>
                    <div className='likes-icon'></div>
                    <div className='likes-stats'>7,355</div>
                    <div className='reposts-icon'></div>
                    <div className='reposts-stats'>507</div>
            </div>
           </div>

        </div>
        )

}

export default Commentbar;