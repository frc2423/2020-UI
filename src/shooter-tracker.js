import { Webbit, html, css } from '@webbitjs/webbit';

// transform: skew(-45deg, 0deg);
//     background-color: #006491;
//     height: 100%;
//     border-radius: 4px;
//     flex-shrink: 0;
//     margin-right: 0.75%;

class ShooterTracker extends Webbit {

  static get styles() {
    return css`
      :host {
        display: inline-block;
        font-size: 15px;
        display: flex;
        flex-direction: row;
        height: 60px;
        width: 500px;
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

      .background .backup, .labels .backup {
        margin-left: -20px;
        width: 30%;
      }

      .background .aim, .labels .aim {
        width: 20%;
      }

      .background .stop, .labels .stop {
        width: 25%
      }
      
      .background .shoot, .labels .shoot {
        /* margin-right: -20px; */
        margin-right: -40px;
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

    `;
  }

  static get properties() {
    return {
      value: { type: String, primary: true }
    };
  }

  constructor() {
    super();
    this.stages = ['disabled', 'backup', 'aim', 'stop', 'shoot'];
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

  render() {
    return html`   
        <div class="tracker">
            <div class="background">
                <div class="backup ${this.getCompletionClass('backup')}"></div>
                <div class="aim ${this.getCompletionClass('aim')}"></div>
                <div class="stop ${this.getCompletionClass('stop')}"></div>
                <div class="shoot ${this.getCompletionClass('shoot')}"></div>
            </div>
            <div class="labels">
                <div class="backup ">Back Up</div>
                <div class="aim">Aim</div>
                <div class="stop">Stop</div>
                <div class="shoot">Shoot</div>
            </div>
        </div>
    `;
  }
}

webbitRegistry.define('shooter-tracker', ShooterTracker);