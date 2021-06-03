import './App.css';
import React from 'react';



class App extends React.Component {

  constructor() {
    super()

    this.state = {
      emails: [],
      currentEmail: {},
    }

    this.displayEmail = this.displayEmail.bind(this);
    this.getEmail = this.getEmail.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  async componentDidMount() {
    fetch("http://localhost:3001/emails")
      .then(response => response.json())
      .then(json => this.setState({ emails: json }))
      .then(() => console.log(this.state.emails[0].sender))
  }

  displayEmail() {
    return this.state.emails.map((email, ind) => {
      return <li><a id={ind} onClick={this.getEmail} >{email.subject} {email.sender}</a></li>
    })
  }

  getEmail(event) {
    let index = event.target.id
    let email = this.state.emails[index]
    this.setState({currentEmail: email})
    this.open()
  }
  // href={`http://localhost:3001/emails/${ind + 1}`}

  open() {
    document.getElementById("modal").classList.remove(`hidden`);

  }

  close() {
    document.getElementById("modal").classList.add(`hidden`);
  }

  render() {

    let email = this.state.currentEmail;
    return (
      <div>
        <h1>it works</h1>
        <ol>{this.displayEmail()}</ol>
        <div id="modal" className="modal hidden">
          <div className="modal-content">
            <span className="close" onClick={this.close}>&times;</span>
            <div className="modalEmail"></div>
            <div>
              <h2>{email.subject}</h2>
              <h3>Sender: {email.sender}  Recipient: {email.recipient}  Date: {email.date}</h3>
              <p>Body: {email.message}</p>
            </div>
          </div>
        </div>
      </div>
    )

  }
}

export default App;
