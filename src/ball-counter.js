
import { Webbit, html, css, svg } from '@webbitjs/webbit';

class BallCounter extends Webbit {
  
  static get styles() {
    return css`
        :host {
            display: inline-block;
        }

        img {
            width: 40px;
            margin-right: 3px;
        }

        .ball-images {
            display: block;
            margin-bottom: 10px;
        }

        vaadin-number-field {
            width: 200px;
        }

        vaadin-number-field::part(label) {
            font-size: 20px;
            font-family: "Comic Sans MS", "Comic Sans", cursive;

        }

        vaadin-number-field::part(value) {
            font-size: 25px;
            font-family: "Comic Sans MS", "Comic Sans", cursive;

        }

        vaadin-number-field::part(decrease-button), vaadin-number-field::part(increase-button) {
            width: 50px; 
            height: 50px;
            line-height: 35px;
            font-size: 35px;
            font-weight: bold;
            font-family: "Comic Sans MS", "Comic Sans", cursive;

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
        <div class="ball-images">
            ${[0,1,2,3,4].map(index => {
                if (index <= this.ballCount-1) {
                    return html`<img src="/images/power-cell-filled.png"/>`;
                }
                return html`<img src="/images/power-cell-empty.png"/>`;
            })}
        </div>
      <vaadin-number-field .value="${this.ballCount}" min="0" max="5" has-controls
      @change ="${this.onChange}"
      @input="${this.onfocus}"
      ?clear-button-visible=${this.ballCount !== 0}></vaadin-number-field>

    `;
  }
}


webbitRegistry.define('ball-counter', BallCounter);

