import React from 'react'
import ReactPlayer from 'react-player'
import YouTubePlayer from 'react-player/lib/players/YouTube'

import { findDOMNode } from 'react-dom'
import { hot } from 'react-hot-loader'
import screenfull from 'screenfull'
import { version } from '../../package.json'
import { connect } from 'react-redux'
import { ActionCable } from 'react-actioncable-provider'


class CurrentVideo extends React.Component {

  state = {
    url: 'https://www.youtube.com/watch?v=cmpRLQZkTb8',
    playing: true,
    volume: 0.8,
    muted: false,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false,
    played: 0,
    playedSeconds: 0
  }

  handleSocketResponse = (data) => {
    switch (data.type) {
      case 'PAUSE_VIDEO':
        console.log(data)
        this.setState({playing: false})
        break;
      case 'PLAY_VIDEO':
        this.setState({playing: true})
        break;
      case 'CONTROL_VIDEO':
        console.log('Control Video',data)
        this.player.seekTo(data.payload.played)
        break;
      default:
        console.log(data);
    }
  };

  getVideo = () => {
    fetch('http://localhost:3000/chatrooms')
    .then(res => res.json())
    .then(json => {
      console.log(json)
      let currentRoom = json.chatrooms.find(room => room.id = this.props.currentChatRoom.id)
      this.currentRoomVideo = currentRoom.video
      this.setState({
        url: this.currentRoomVideo.url,
        playing: this.currentRoomVideo.playing,
        played: this.currentRoomVideo.played,
        playedSeconds: this.currentRoomVideo.playedSeconds
      }, () => this.player.seekTo(this.state.playedSeconds))
    })
  }


  load = url => {
    this.setState({
      url,
      played: 0,
      loaded: 0
    })
  }
  playPause = () => {
    this.setState({ playing: !this.state.playing })
  }
  stop = () => {
    this.setState({ url: null, playing: false })
  }
  toggleLoop = () => {
    this.setState({ loop: !this.state.loop })
  }
  setVolume = e => {
    this.setState({ volume: parseFloat(e.target.value) })
  }
  toggleMuted = () => {
    this.setState({ muted: !this.state.muted })
  }
  setPlaybackRate = e => {
    this.setState({ playbackRate: parseFloat(e.target.value) })
  }
  onPlay = () => {
    console.log('onPlay')
    this.setState({ playing: true }, () => {
      fetch(`http://localhost:3000/chatrooms/${this.props.currentChatRoom.id}/play_video`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          playing: this.state.playing
        }
      })
    })
  }

  onPause = () => {
    console.log('onPause')
    this.setState({ playing: false }, () => {
      fetch(`http://localhost:3000/chatrooms/${this.props.currentChatRoom.id}/pause_video`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          playing: this.state.playing
        }
      })
    })
  }

  onSeekMouseDown = e => {
    this.setState({ seeking: true })
  }
  onSeekChange = e => {
    let seekingFloat = parseFloat(e.target.value)
    console.log('Seeking float',seekingFloat)
    this.setState({ played: parseFloat(e.target.value) }, () => {
      fetch(`http://localhost:3000/chatrooms/${this.props.currentChatRoom.id}/control_video`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          played: seekingFloat
        })
      })
    })
  }
  onSeekMouseUp = e => {
    this.setState({ seeking: false })
    this.player.seekTo(parseFloat(e.target.value))
  }
  onProgress = state => {
    console.log('onProgress', state)
    console.log('this.state',this.state)
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state)
    }
  }
  onEnded = () => {
    console.log('onEnded')
    this.setState({ playing: this.state.loop })
  }
  onDuration = (duration) => {
    console.log('onDuration', duration)
    this.setState({ duration })
  }
  onClickFullscreen = () => {
    screenfull.request(findDOMNode(this.player))
  }
  renderLoadButton = (url, label) => {
    return (
      <button onClick={() => this.load(url)}>
        {label}
      </button>
    )
  }
  ref = player => {
    this.player = player
  }
  render () {
    const { url, playing, volume, muted, loop, played, loaded, duration, playbackRate } = this.state
    const SEPARATOR = ' · '

    return (
      <div className='app'>
        <ActionCable
          channel={{ channel: 'VideoChannel', video_id: this.props.currentChatRoom.video.id }}
          onReceived={this.handleSocketResponse}
        />
        <section className='section'>
          <div className='player-wrapper'>
            <ReactPlayer
              ref={this.ref}
              className='react-player'
              width='100%'
              height='500px'
              url={url}
              playing={playing}
              loop={loop}
              playbackRate={playbackRate}
              volume={volume}
              muted={muted}
              onReady={() => /*this.getVideo()*/console.log('onReady')}
              onStart={() => console.log('onStart')}
              onPlay={this.onPlay}
              onPause={this.onPause}
              onBuffer={() => console.log('onBuffer')}
              onSeek={e => console.log('onSeek', e)}
              onEnded={this.onEnded}
              onError={e => console.log('onError', e)}
              onProgress={this.onProgress}
              onDuration={this.onDuration}
            />
          </div>

          <table><tbody>
            <tr>
              <th>Controls</th>
              <td>
                <button onClick={this.stop}>Stop</button>
                <button onClick={this.playPause}>{playing ? 'Pause' : 'Play'}</button>
                <button onClick={this.onClickFullscreen}>Fullscreen</button>
                <button onClick={this.setPlaybackRate} value={1}>1</button>
                <button onClick={this.setPlaybackRate} value={1.5}>1.5</button>
                <button onClick={this.setPlaybackRate} value={2}>2</button>
              </td>
            </tr>
            <tr>
              <th>Seek</th>
              <td>
                <input
                  type='range' min={0} max={1} step='any'
                  value={played}
                  onMouseDown={this.onSeekMouseDown}
                  onChange={this.onSeekChange}
                  onMouseUp={this.onSeekMouseUp}
                />
              </td>
            </tr>
            <tr>
              <th>Volume</th>
              <td>
                <input type='range' min={0} max={1} step='any' value={volume} onChange={this.setVolume} />
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor='muted'>{this.state.muted ? 'Muted' : 'Not muted'}</label>
              </th>
              <td>
                <input id='muted' type='checkbox' checked={muted} onChange={this.toggleMuted} />
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor='loop'>{this.state.loop ? 'Is looping' : 'Not looping'}</label>
              </th>
              <td>
                <input id='loop' type='checkbox' checked={loop} onChange={this.toggleLoop} />
              </td>
            </tr>

          </tbody></table>
        </section>
        <section className='section'>
          <table><tbody>
            <tr>
              <th>Custom URL</th>
              <td>
                <input ref={input => { this.urlInput = input }} type='text' placeholder='Enter URL' />
                <button onClick={() => this.setState({ url: this.urlInput.value })}>Load</button>
              </td>
            </tr>
          </tbody></table>
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    chatRooms: state.chatRooms,
    currentChatRoom: state.currentChatRoom
  }
}

export default connect(mapStateToProps)(CurrentVideo);
