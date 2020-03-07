import { Webbit, html, css } from '@webbitjs/webbit';
import '@vaadin/vaadin-button';

class IntakeState extends Webbit {

  static get styles() {
    return css`
      :host {
        display: inline-block;
        font-size: 15px;
        display: flex;
        flex-direction: row;
        height: 100px;
        width: 400px;
      }
      vaadin-button {
        border-radius: 0;
        margin: 0;
        flex: 1;
        font-size: inherit;
        text-transform: capitalize;
        height: 100%;
        font-family: "Comic Sans MS", "Comic Sans", cursive;
      }
    `;
  }

  static get properties() {
    return {
      value: { type: String, primary: true }
    };
  }

  constructor() {
    super();
    this.buttons = ['intake', 'none', 'outake'];
    this.value = 'intake';
  }

  setValue(value) {
    this.value = value;
  }

  render() {
    return html`   
      ${this.buttons.map(button => html`
        <vaadin-button 
          theme="contrast ${this.value == button ? 'primary' : ''}" 
          @click="${() => this.setValue(button)}"
        >
          ${button}
        </vaadin-button>
      `)}
    `;
  }
}

webbitRegistry.define('intake-state', IntakeState);