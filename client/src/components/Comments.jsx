import React from 'react';
import './styles.css';
const path = require('path');


class Comments extends React.Component{

    render() {
        return (
            <div class='comments-component'>
                <div class='flex-row'>
                    <div>
                        <svg width="21" height="21" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><title>stats_comment</title><path d="M5 3c-1.105 0-2 .887-2 2.006v2.988C3 9.102 3.887 10 5 10h6c1.105 0 2-.887 2-2.006V5.006A1.998 1.998 0 0 0 11 3H5zm0 7v3l3-3H5z" fill="#999" fill-rule="evenodd"/></svg>
                    </div>
                    <div className='comments-stats'>1 comment</div>
                </div>

                <div class='comment-container-asi'>
                    <div>
                        <img className='comment-pic' src='http://localhost:4000/songs/headshot.jpg'></img>
                    </div>
                    <div class='flex-comment-container-body'>
                        <div class='flex-comment-container-top-bar'>
                            <div class='flex-comment-container-top-bar-name'>
                                Aruna
                            </div>

                            <div class='at'>
                                at
                            </div>

                            <div class='flex-comment-container-top-bar-time'>
                                0:08:
                            </div>
                            <div class='flex-comment-container-top-bar-posted'>
                                4 months ago
                            </div>
                        </div>
                        <div class='comment-text-asi'>
                            fire
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Comments;