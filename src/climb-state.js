import { Webbit, html, css } from '@webbitjs/webbit';
import { startCase } from 'lodash';
import "@vaadin/vaadin-button"

class ClimbState extends Webbit {

  static get styles() {
    return css`
      :host {
        display: inline-block;
        font-size: 15px;
        flex-direction: row;
        height: 100px;
        width: 430px;
      }
      
      .labels {
        position: absolute;
        width: 100%;
        display: flex;
        align-items: center;
        height: 100%;
        color: white;
        font-size: 15px;
        font-family: Sans-Serif;
      }

      .labels div {
          text-align: center;
      }

      .background {
        height: 100%;
        width: 100%;
        /* flex-shrink: 0; */
        margin-right: 2px;
        position: absolute;
        display: flex;
      }

      .background div {
        transform: skew(-45deg, 0deg);
        height: 100%;
        margin-right: 5px;
        width: 25%;
      }

      .background .pistonUp, .labels .pistonUp {
        margin-left: -20px;
        width: 30%;
      }

      .background .pistonDown, .labels .pistonDown {
        width: 30%;
      }

      .background .climb, .labels .climb {
        width: 20%
      }
      
      .background .stop, .labels .stop {
        /* margin-right: -20px; */
        margin-right: -60px;
        width: 30%;
      }

      .tracker {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 4.25em;
        align-self: center;
        border-radius: 2.625em;
        overflow: hidden; 
        position: relative;
        /* background-color: rgb(0, 100, 145); */
        /*border: 3px solid rgb(0, 100, 145);*/
  
      }

      .incomplete {
          background-color: grey;
      }

      .current {
          background-color: red;
      }

      .complete {
          background-color: rgb(0, 100, 145);
      }

      vaadin-button {
        height: 50px;
        width: 50px;
        margin-top: 10px;
        margin-right: 10px;
      }

      iron-icon {
        height: 100%;
        width: 100%;
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
    this.stages = ['disabled', 'pistonUp', 'pistonDown', 'climb', 'stop'];
    this.value = 'disabled';
  }

  setValue(value) {
    this.value = value;
  }

  getCompletionClass(stage) {
    if (this.value == stage) {
        return 'current';
    } else if (this.stages.indexOf(this.value) >= this.stages.indexOf(stage)) {
        return 'complete';
    }
    return 'incomplete';
  }

  setNextValue() {
    if (this.value == 'stop') {
      this.value = 'stop';
    } else {
      this.value = this.stages[this.stages.indexOf(this.value)+1];
    }
  }

  restart() {
    if (this.value == 'pistonDown') {
      this.value = 'disabled';
    }
  }

  render() {
    return html`   
      <div class="tracker">
            <div class="background">
                <div class="pistonUp ${this.getCompletionClass('pistonUp')}"></div>
                <div class="pistonDown ${this.getCompletionClass('pistonDown')}"></div>
                <div class="climb ${this.getCompletionClass('climb')}"></div>
                <div class="stop ${this.getCompletionClass('stop')}"></div>
            </div>
            <div class="labels">
                <div class="pistonUp">Piston Up</div>
                <div class="pistonDown">Piston Down</div>
                <div class="climb">Climb</div>
                <div class="stop">Stop</div>
            </div>
        </div>
        <vaadin-button
          @click="${this.setNextValue}" 
          theme="icon">
          <iron-icon icon="vaadin:play"></iron-icon>
        </vaadin-button>
        <vaadin-button
          @click="${this.restart}" 
          theme="icon">
          <iron-icon icon="vaadin:rotate-left"></iron-icon>
        </vaadin-button>
    `;
  }
}

webbitRegistry.define('climb-state', ClimbState);