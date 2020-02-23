
import { Webbit, html, css, svg } from '@webbitjs/webbit';
import '@vaadin/vaadin-button';

class ControlPanel extends Webbit {
  
  static get styles() {
    return css`

      :host {
        display: flex;
        width: 300px;
        align-items: center;
        flex-direction: column;
        
      }

      label {
        font-family: sans-serif;
        font-size: 25px;
        margin-right: 10px;
      }

      .switch {
        display: flex;
        align-items: center;
      }

      frc-toggle-switch {
        width: 80px;
        height: 45px;
      }

      .control-panel {
        width: 100%;
        display: inline-block;
        border-radius: 50%;
        border: 1px solid black;
        box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
        position: relative;
        margin: 20px 0 25px;
      }

      svg {
        width: 100%;
        transition: all 2s;
      }



      .red, .yellow, .green, .blue, .unknown {
        stroke: black;
        stroke-width: 0;
        fill: white;
        transition: all .2s;
      }

      .unknown {
        stroke-width: .015;
      }

      .red {
        fill: red;
      }

      .yellow {
        fill: yellow;
      }

      .green {
        fill: green;
      }

      .blue {
        fill: blue;
      }

      .question-mark {
        font: .2px sans-serif;
        text-anchor: middle;
        opacity: 1;
      }

      .no-question-mark {
        opacity: 0;
      }

      .indicator {
        display: block;
        position: absolute;
        top: 50%;
        line-height: 0;
        z-index: 10;
        font-size: 35px;
        right: -55px;
      }

      .rotate-buttons vaadin-button{
        width: 60px;
        height: 60px;
        display: inline-block;
        padding: 0;
        min-width: 0px;
        font-size: 25px;
      }

      .rotate-buttons label {
        margin-right: 5px;
      }
    `;
  }

  static get properties() {
    return {
      desiredColor: {type: String, attribute:'desired-color'},
      currentColor: {type: String, attribute:'current-color'},
      desiredRotations: {type: Number, attribute: 'desired-rotations'},
      mode: {type: String, attribute:'mode'},
      currentRotations: {type: Number, attribute: 'current-rotations'},
      wheelPosition: { type: Number, attribute: false }
    };
  }

  constructor() {
    super();
    this.colors = ['red','yellow','blue','green','red','yellow','blue','green'];
    this.desiredColor = 'unknown';
    this.currentColor = 'unknown';
    this.desiredRotations = 0;
    this.currentRotations = 0;
    this.mode = 'disable';
    this.wheelPosition = 0;
    this.startingWheelPosition = {
      'red': 157.5, 
      'green': 22.5, 
      'blue': 67.5, 
      'yellow': 112.5
    };

  }

  getCoordinatesForPercent(percent) {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  }

  getPath(index) {
    const [startX, startY] = this.getCoordinatesForPercent(.125 * index);
    const [endX, endY] = this.getCoordinatesForPercent(.125 * (index + 1));
    return  [
      `M ${startX} ${startY}`, // Move
      `A 1 1 0 0 1 ${endX} ${endY}`, // Arc
      `L 0 0`, // Line
    ].join(' ');
  }

  updated(changedProperties) {

    if (changedProperties.has('currentColor')) {
      if(changedProperties.get('currentColor') === 'unknown') {
        this.wheelPosition = this.startingWheelPosition[this.currentColor];
      } else if (this.currentColor !== 'unknown') {
        const colors = ['red','yellow','blue','green'];
        const prevColorIndex = colors.indexOf(changedProperties.get('currentColor'));
        const colorIndex = colors.indexOf(this.currentColor);
        let positionDelta = (colorIndex - prevColorIndex);
        if (positionDelta < 0) {
          positionDelta += 4;
        }
        this.wheelPosition += positionDelta * -45.0;
      }
    }
  
  }

  toColor(color) {
    if (this.mode !== 'disable') {
      this.desiredColor = color;
      this.mode = 'toColor';
    }
  }

  rotate(desiredRotations) {
    if (this.mode !== 'disable') {
      this.desiredRotations += desiredRotations
      this.mode = 'rotate'
    }
  }

  toggleDisable(value) {
    if (value.detail.checked) {
      this.mode = 'stop';
    } else {
      this.mode = 'disable';
    }
  }

  render() {

    return html`
      <div class="switch">
        <label>${this.mode === 'disable' ? 'Disabled' : 'Enabled'}</label>
        <frc-toggle-switch 
          @check="${this.toggleDisable}"
          ?checked="${this.mode !== 'disable'}"
        ></frc-toggle-switch>
      </div>
      <div class="control-panel">
      ${svg`
        <svg viewBox="-1 -1 2 2" style="transform: rotate(${this.wheelPosition}deg)">
          ${this.colors.map((color, index) => svg`
            <path
              class="${this.currentColor === 'unknown' ? 'unknown' : color}"
              @click="${() => this.toColor(color)}"
              d="${this.getPath(index)}"
            >
            </path> 
          `)}   

          ${this.colors.map((color, index) => svg`
            <text 
              class="${this.currentColor !== 'unknown' ? 'no-question-mark' : '' } question-mark" 
              y="-.55" x="-.01" 
              style="transform: rotate(${22.5 + index * 45}deg)"
            >
              ?
            </text>
          `)}    
        </svg>
      `}
      <span 
        class="indicator"
        style="color: ${this.currentColor}"
      >◀</span>
      </div>
    <div class="rotate-buttons">
      <label>Rotate</label>
      <vaadin-button
        @click="${() => this.rotate(1)}"
        theme="primary contrast"
      >1</vaadin-button>
      <vaadin-button
        @click="${() => this.rotate(2)}"
        theme="primary contrast"
      >2</vaadin-button>
      <vaadin-button
        @click="${() => this.rotate(3)}"
        theme="primary contrast"
      >3</vaadin-button>
  </div>
    `;
  }
}


webbitRegistry.define('control-panel', ControlPanel);

