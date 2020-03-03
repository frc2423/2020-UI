import "@webbitjs/frc";
import { addSourceProvider, getSourceProvider } from "@webbitjs/store";
import { html, css, LitElement } from 'lit-element';
import './boolean-box2';
import './control-panel';
import './ball-counter';
import './gear-shift';
import '@vaadin/vaadin';

addSourceProvider('NetworkTables', 'NetworkTables');

class UI extends LitElement {

  static get styles() {
    return css`

      control-panel {
        width: 500px;
      }

      p {
        color: green;
        background: blueviolet;
      }

      frc-boolean-box {
        color: blue;
        white-space: nowrap;
      }

      frc-boolean-box::part(box) {
        border-radius: 50%;
      }
    `;
  }

  constructor() {
    super();

  }

  render() {
    return html`
      <control-panel>

      </control-panel>
      <ball-counter
        source-key="/ballCount"
        source-provider="NetworkTables"
      ></ball-counter>

      <gear-shift
        source-key="/gear"
        source-provider="NetworkTables"
      >
      </gear-shift>
      <!-- <boolean-box2
        source-key="/boxColor/color"
        source-provider="NetworkTables"
      ></boolean-box2>
      <frc-boolean-box 
        source-key="/box"
        source-provider="NetworkTables"
        default-color="gray"
        true-color="purple"
        false-color="silver"
      >
        sudhhciudsiusfsfsfsdsdfiuhdfuihui
      </frc-boolean-box>

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
      ></frc-toggle-button> -->
    `;
  }
}

customElements.define('robot-ui', UI);
