
import { Webbit, html, css, svg } from '@webbitjs/webbit';

class GearShift extends Webbit {
  
  static get styles() {
    return css`
        :host {
            display: inline-block;
        }

        vaadin-radio-group::part(label) {
            font-size: 20px;
            padding-bottom: 5px;
        }

        vaadin-radio-button::part(label) {
            font-size: 20px;
        }

      `;
  }

  static get properties() {
    return {
        gear: {type: String, attribute:'gear', primary: true},
    };
  }

  constructor() {
    super();
    this.gear = 'slow';

  }

  swapGear(ev) {
    this.gear = ev.detail.value;
  }
    
  render() {
    return html`
      <vaadin-radio-group value="${this.gear}" label="Robot Speed" theme="horizontal" @value-changed="${this.swapGear}">
        <vaadin-radio-button checked value="fast">Fast</vaadin-radio-button>
        <vaadin-radio-button value="slow" >Slow</vaadin-radio-button>
      </vaadin-radio-group>
    `;
  }
}


webbitRegistry.define('gear-shift', GearShift);

