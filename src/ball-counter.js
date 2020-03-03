
import { Webbit, html, css, svg } from '@webbitjs/webbit';

class BallCounter extends Webbit {
  
  static get styles() {
    return css`
        :host {
            display: inline-block;
        }

        vaadin-number-field {
            width: 200px;
        }

        vaadin-number-field::part(label) {
            font-size: 20px;
        }

        vaadin-number-field::part(value) {
            font-size: 25px;
        }

        vaadin-number-field::part(decrease-button), vaadin-number-field::part(increase-button) {
            width: 50px; 
            height: 50px;
            line-height: 35px;
            font-size: 35px;
            font-weight: bold;
        }
      `;
  }

  static get properties() {
    return {
        ballCount: {type: Number, attribute:'ball-count', primary: true},
    };
  }

  constructor() {
    super();
    this.ballCount = 0;

  }

  onChange(ev) {
    const value = parseInt(ev.path[0].value);
    this.ballCount = isNaN(value) ? 0 : value;
  }


  firstUpdated() {
      const numberField = this.shadowRoot.querySelector('vaadin-number-field');
      const input = numberField.shadowRoot.querySelector('[part=value]');
      input.onfocus = () => {
        input.blur();
      }
  }

  
  render() {
    return html`
      <vaadin-number-field .value="${this.ballCount}" min="0" max="5" has-controls label="Ball Count"
      @change ="${this.onChange}"
      @input="${this.onfocus}"
      ?clear-button-visible=${this.ballCount !== 0}></vaadin-number-field>
    `;
  }
}


webbitRegistry.define('ball-counter', BallCounter);

