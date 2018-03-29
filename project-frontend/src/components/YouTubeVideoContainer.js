import React from 'react'
import { connect } from 'react-redux'
import { toggleUrlField } from '../actions'

const API_KEY = 'KEY'

class YouTubeVideoContainer extends React.Component {

  state = {
    videos: [],
    search: ''
  }

  handleInput = (event) => {
    this.setState({search: event.target.value})
  }

  fetchVideos = (search) => {
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&key=${API_KEY}&q=${search}&type=video`)
    .then(res => res.json())
    .then(videos => {
      console.log(videos.items)
      this.setState({videos: videos.items})
    })
  }

  getLoadUrl = (text) => {
    let input = document.getElementById('load-url')
    if(input){
      console.log(text)
      console.log(input)
      input.value = text
    }else{
      this.props.toggleUrlField(this.props.urlField)
    }
  }

  componentDidMount(){
  }

  render () {
    return (
      <div className="searchYoutube">
        <table>
          <tbody>
            <tr>
              <td>
                <form onSubmit={(event) => {
                  event.preventDefault()
                  this.fetchVideos(this.state.search)}
                }>
                  <input type='text' value={this.state.search} onChange={this.handleInput} placeholder='Search YouTube'/>
                  <input className="waves-effect waves-light btn red darken-1" type='submit' value="Search" />
              </form>
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <table className="highlight"><tbody>
            {this.state.videos.map(video => <tr key={video.id.videoId} onClick={() => this.getLoadUrl(`https://www.youtube.com/watch?v=${video.id.videoId}`)}><th><img src={video.snippet.thumbnails.default.url} /></th><td>{video.snippet.title}</td></tr>)}
          </tbody></table>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    urlField: state.urlField
  }
}

export default connect(mapStateToProps, {toggleUrlField})(YouTubeVideoContainer);
