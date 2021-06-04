import './App.css';
import React from 'react';
import FetchEmail from './Component/FetchEmail';



class App extends React.Component {

  constructor() {
    super()

    this.state = {
      emails: [],
      currentEmail: {},
    }

    // this.displayEmail = this.displayEmail.bind(this);
    this.getEmail = this.getEmail.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.post = this.post.bind(this);
  }

  // async componentDidMount() {
  //   fetch("http://localhost:3001/emails")
  //     .then(response => response.json())
  //     .then(json => this.setState({ emails: json }))
  //     .then(() => console.log(this.state.emails[0].sender))
  // }

  // displayEmail() {
  //   return this.state.emails.map((email, ind) => {
  //     return <li><a id={ind} onClick={this.getEmail} >{email.subject} {email.sender}</a></li>
  //   })
  // }

  getEmail(event) {
    let index = event.target.id
    let email = this.state.emails[index]
    this.setState({ currentEmail: email })
    this.open()
  }

  async post() {

    fetch("http://localhost:3001/send", {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: document.querySelector(`.sender`).value,
        recipient: document.querySelector(`.recipient`).value,
        subject: document.querySelector(`.subject`).value,
        message: document.querySelector(`.message`).value,
        date: document.querySelector(`.date`).value,
        id: this.state.emails.length,
      })
    })
      .then(response => response.json())
      .then(json => console.log(json));
    this.componentDidMount();
  }

  // href={`http://localhost:3001/emails/${ind + 1}`}

  open() {
    document.getElementById("modal").classList.remove(`hidden`);
    // document.getElementById("sendModal").classList.remove(`hidden`);
  }

  close() {
    document.getElementById("modal").classList.add(`hidden`);
  }

  render() {

    let email = this.state.currentEmail;
    return (
      <div>
        <h1>it works</h1>
        <FetchEmail />
        
        <input type="button" onClick={this.open} value="Compose email"/>
        <div id="sendModal" className="sendModal hidden">
          <div className="modal-content">
            <span className="close" onClick={this.close}>&times;</span>
            <div className="modalEmail"></div>
              <form>
                <input className="sender" type="text" placeholder="sender" />
                <input className="recipient" type="text" placeholder="recipient" />
                <input className="subject" type="text" placeholder="subject" />
                <input className="message" type="text" placeholder="message" />
                <input className="date" type="text" placeholder="date" />
                <input type="button" onClick={this.post} value="send" />
              </form>
            </div>
          </div>
        </div>
    )

  }
}

export default App;