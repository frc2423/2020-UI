import "@webbitjs/frc/build/webbit-frc";
import { addSourceProvider } from "@webbitjs/store";
import { html, css, LitElement } from 'lit-element';

addSourceProvider('NetworkTables', 'NetworkTables');


class UI extends LitElement {

  static get styles() {
    return css`
      p {
        color: green;
      }
    `;
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <p>2020 UI!</p>
      <frc-boolean-box 
        source-key="/box"
        source-provider="NetworkTables"
        default-color="gray"
        true-color="purple"
      ></frc-boolean-box>

      <frc-number-slider
        source-provider="NetworkTables"
        source-key="/slider"
      ></frc-number-slider>

      <frc-relay
        source-provider="NetworkTables"
        source-key="/relay"
      ></frc-relay>

      <frc-text-view
        source-provider="NetworkTables"
        source-key="/textView/string"
      ></frc-text-view>

      <frc-toggle-button
        source-provider="NetworkTables"
        source-key="/toggle/toggled"
      ></frc-toggle-button>
    `;
  }
}

customElements.define('robot-ui', UI);
