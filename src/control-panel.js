
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
      }
    `;
  }

  static get properties() {
    return {
      
    };
  }

  constructor() {
    super();
    this.colors = ['red','yellow','blue','green','red','yellow','blue','green'];

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

  render() {
    return svg`
      <svg viewBox="-1 -1 2 2" style="transform: rotate(-90deg)">
        ${this.colors.map((color, index) => svg`
          <path 
            fill="${color}" 
            d="${this.getPath(index)}"
          ></path> 
        `)}
      </svg>
    `;
  }
}


webbitRegistry.define('control-panel', ControlPanel);

