
import { Webbit, html, css, svg } from '@webbitjs/webbit';

class ControlPanel extends Webbit {
  
  static get styles() {
    return css`

      :host {
        height: 300px;
        display: inline-block;
      }

      svg {
        height: 100%;
        transition: all 2s;
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
    console.log('changedProperties:', changedProperties);

    console.log('this.currentColor:', this.currentColor);


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

  render() {
    return svg`
      <svg viewBox="-1 -1 2 2" style="transform: rotate(${this.wheelPosition}deg)">
        ${this.colors.map((color, index) => svg`
          <path
            @click="${() => console.log(color)}"
            fill="${color}" 
            d="${this.getPath(index)}"
          ></path> 
        `)}
      </svg>
    `;
  }
}


webbitRegistry.define('control-panel', ControlPanel);

