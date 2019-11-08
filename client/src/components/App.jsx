import React from 'react';
import Commentbar from './Commentbar.jsx';
import ArtistInfo from './ArtistInfo.jsx';
import TrackInfo from './TrackInfo.jsx';
import Comments from './Comments';
import './styles.css';
import Axios from 'axios'

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentComment:'',
            comments: [],
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
    };

    handleChange(event) {
        var target = event.target;
        var value = target.value;
        this.setState({
            currentComment: value
        })

    }
    handleAdd(event){
        event.preventDefault();
        var comment = this.state.currentComment
        console.log(comment)
        //console.log(this.state, 'this is currentComment')
        Axios.post('/newcomment', comment)
        .then((comment) => {
            this.setState({
                comments: comments.data,
            })
        })
    }

    render() {
        return(
            <div className='comments-component'>
                <Commentbar handleChange={this.handleChange} handleAdd = {this.handleAdd}/>
                <div className='flex-lower'>
                    <ArtistInfo/>
                    <div className='flex-lower-right'>
                        <TrackInfo/>
                        <Comments/>
                    </div>

                </div>
            </div>
        )
    }
}

export default App;