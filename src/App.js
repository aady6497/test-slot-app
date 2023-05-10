import './App.css'
import React from 'react'

function RepeatButton(props) {
  return (
    <button
      aria-label="Play again."
      id="repeatButton"
      onClick={props.onClick}
    ></button>
  )
}

function WinningSound() {
  return (
    <audio autoPlay="autoplay" className="player" preload="true">
      <source src="https://andyhoffman.codes/random-assets/img/slots/winning_slot.wav" />
    </audio>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      winner: null,
      mouseposition: (0, 0),
    }
    this.finishHandler = this.finishHandler.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
  }
  onMouseDown(e) {
    //  console.log('onMouseDown', e.nativeEvent.clientX, e.nativeEvent.clientY)
    //  this.setState({
    //    mouseposition: (e.nativeEvent.clientX, e.nativeEvent.clientY),
    //  })
    console.log('onMouseDown', (e.nativeEvent.clientX, e.nativeEvent.clientY))
  }
  onMouseMove(e) {
    this.setState({
      mouseposition: (e.nativeEvent.clientX, e.nativeEvent.clientY),
    })
    console.log(
      'onMouseMove>>',
      e.nativeEvent.clientX,
      '<<>>',
      e.nativeEvent.clientY,
      '<<>>',
      this.state.mouseposition,
      '<<',
    )
  }

  onMouseUp(e) {
    this.setState({
      mouseposition: (e.nativeEvent.clientX, e.nativeEvent.clientY),
    })
    console.log('onMouseUp', this.state.mouseposition)
  }

  handleClick() {
    this.setState({ winner: null })
    this.emptyArray()
    this._child1.forceUpdateHandler()
    this._child2.forceUpdateHandler()
    this._child3.forceUpdateHandler()
  }
  static loser = [
    'Not quite',
    'Stop gambling',
    'Hey, you lost!',
    'Ouch! I felt that',
    "Don't beat yourself up",
    'There goes the college fund',
    'I have a cat. You have a loss',
    "You're awesome at losing",
    'Coding is hard',
    "Don't hate the coder",
  ]

  static matches = []

  finishHandler(value) {
    App.matches.push(value)
    if (App.matches.length === 1) {
      const { winner } = this.state
      const first = App.matches[0]
      let results = App.matches.every((match) => match === first)
      this.setState({ winner: results })
    }
  }

  emptyArray() {
    App.matches = []
  }

  reel1_onMouseOver() {
    console.log('reel1_reel1_onMouseOver')
  }

  render() {
    const { winner } = this.state
    const getLoser = () => {
      return App.loser[Math.floor(Math.random() * App.loser.length)]
    }
    let repeatButton = null
    let winningSound = null

    if (winner !== null) {
      repeatButton = <RepeatButton onClick={this.handleClick} />
    }

    if (winner) {
      winningSound = <WinningSound />
    }

    return (
      <div>
        {/*        {winningSound}
        <h1 style={{ color: 'white' }}>
          <span>
            {winner === null
              ? 'Waiting…'
              : winner
              ? '🤑 Pure skill! 🤑'
              : getLoser()}
          </span>
        </h1>
            */}
        <div
          onMouseOver={this.reel1_onMouseOver}
          className={`spinner-container`}
          onDrag={this.reels1_onDrag}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
          onMouseMove={this.onMouseMove}
        >
          <Spinner
            onFinish={this.finishHandler}
            ref={(child) => {
              this._child1 = child
            }}
            timer="1500"
          />
          <Spinner
            onFinish={this.finishHandler}
            ref={(child) => {
              this._child2 = child
            }}
            timer="2000"
          />
          <Spinner
            onFinish={this.finishHandler}
            ref={(child) => {
              this._child3 = child
            }}
            timer="4500"
          />
          <div className="gradient-fade"></div>
        </div>
        {repeatButton}
      </div>
    )
  }
}

class Spinner extends React.Component {
  constructor(props) {
    super(props)
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this)
  }

  forceUpdateHandler() {
    this.reset()
  }

  reset() {
    if (this.timer) {
      clearInterval(this.timer)
    }

    this.start = this.setStartPosition()

    this.setState({
      position: this.start,
      timeRemaining: this.props.timer,
    })

    this.timer = setInterval(() => {
      this.tick()
    }, 100)
  }

  state = {
    position: 0,
    lastPosition: null,
  }
  static iconHeight = 500
  multiplier = Math.floor(Math.random() * (4 - 1) + 1)

  start = this.setStartPosition()
  speed = Spinner.iconHeight * this.multiplier

  setStartPosition() {
    let val = Math.floor(Math.random() * 1) * Spinner.iconHeight * -1
    console.log('val', val)
    //val = 2000
    return -val
  }

  moveBackground() {
    this.setState({
      position: this.state.position - this.speed,
      timeRemaining: this.state.timeRemaining - 100,
    })
  }

  getSymbolFromPosition() {
    let { position } = this.state
    const totalSymbols = 15
    const maxPosition = Spinner.iconHeight * (totalSymbols - 1) * -1
    let moved = (this.props.timer / 100) * this.multiplier
    let startPosition = this.start
    let currentPosition = startPosition
    console.log('moved', moved)

    for (let i = 0; i < moved; i++) {
      currentPosition -= Spinner.iconHeight

      if (currentPosition < maxPosition) {
        currentPosition = 0
      }
    }
    console.log('currentPosition', currentPosition)

    this.props.onFinish(currentPosition)
  }

  tick() {
    if (this.state.timeRemaining <= 0) {
      clearInterval(this.timer)
      this.getSymbolFromPosition()
    } else {
      this.moveBackground()
    }
  }

  componentDidMount() {
    clearInterval(this.timer)

    this.setState({
      position: this.start,
      timeRemaining: this.props.timer,
    })

    this.timer = setInterval(() => {
      this.tick()
    }, 100)
  }

  render() {
    let { position, current } = this.state
    return (
      <div
        style={{ backgroundPosition: '0px ' + position + 'px' }}
        className={`icons`}
      />
    )
  }
}

export default App
