import React from 'react'
import PropTypes from 'prop-types'

const API_KEY = 'AIzaSyB5GLM0ZcS3MwmMbazTcz4qKL867jJlP-w'

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
    console.log(text)
    console.log(input)
    input.value = text
  }

  componentDidMount(){
  }

  render () {
    return (
      <div>
        <section>
          <table><tbody>
            <tr>
              <th>Search YouTube</th>
              <td>
                <form onSubmit={(event) => {
                  event.preventDefault()
                  this.fetchVideos(this.state.search)}
                }>
                  <input type='text' value={this.state.search} onChange={this.handleInput} placeholder='Search YouTube'/>
                </form>
              </td>
            </tr>
          </tbody></table>
        </section>

        <section>
          <table><tbody>
            {this.state.videos.map(video => <tr key={video.id.videoId} onClick={() => this.getLoadUrl(`https://www.youtube.com/embed/${video.id.videoId}`)}><th><img src={video.snippet.thumbnails.default.url} /></th><td>{video.snippet.title}</td></tr>)}
          </tbody></table>
        </section>

      </div>
    )
  }
}

export default YouTubeVideoContainer;
