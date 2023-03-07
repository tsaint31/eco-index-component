import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('eco-index')
export class EcoIndex extends LitElement {
  static override styles = css`
    :host {
      position:fixed;
      bottom:1%;
      right:1%;
      z-index:9999;
      padding: 16px;
      border: solid 1px gray;
      opacity: 60%;
    }
  `;

  @property()
  task = '';
  @property()
  status = '';
  @property()
  grade = '';
  @property()
  nodes = '';
  @property()
  requests = '';
  @property()
  size = '';
  @property()
  warning = '';

  override render() {
    return html`
      <p>${this.getButtonRequestVisibility()}</p>
      <p>${this.warning}</p>
      <p>${this.getStatusReport()}</p>
      <slot></slot>
    `;
  }

  private _onClickAnalysis() {
    fetch('http://localhost:8002/v1/tasks/ecoindexes',
    {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "width": 1920,
      "height": 1080,
      "url": "https://www.lemonde.fr"})
    }).then(response => response.json())
    .then(data => {
      console.log("data.message",data)
      if (data?.detail?.message) {this.warning=data.detail.message} else {this.task=data;}
      this.grade='';
      this.nodes='';
      this.requests='';
      this.size='';
      this.status='';
    })
  }

  private _onClickReport() {
    fetch(`http://localhost:8002/v1/tasks/ecoindexes/${this.task}`,
    {
      method: "GET",
      headers: {
        'Accept': 'application/json',
      },
    }).then(response => response.json())
    .then(data => {
      this.status=data.status;
      if (data.status === 'SUCCESS') {
        this.grade=data.ecoindex_result.detail.grade;
        this.nodes=data.ecoindex_result.detail.nodes;
        this.requests=data.ecoindex_result.detail.requests;
        this.size=data.ecoindex_result.detail.size;
      }
    })
  }

  getButtonRequestVisibility() {
    if (this.task === '' && this.warning === '') {
      return html`<button @click=${this._onClickAnalysis} part="button">
      Ecoindex
      </button>`;
    } else return null
  }

  getButtonReportVisibility = () => {
    if (this.status !== 'SUCCESS') {
      return html`<button @click=${this._onClickReport} part="button">
      Request Report
      </button>`;
    } else return null
  }

  getStatusReport() {
    if (this.task !== '') {
      return html`
      <p>task : ${this.task}</p>
      <p>${this.getButtonReportVisibility()}</p>
      <p>status : ${this.status}</p>
      <p>grade : ${this.grade}</p>
      <p>nodes : ${this.nodes}</p>
      <p>requests : ${this.requests}</p>
      <p>size : ${this.size}</p>`;
    } else return null
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eco-index': EcoIndex;
  }
}