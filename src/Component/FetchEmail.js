import React from 'react'

class FetchEmail extends React.Component {

  constructor() {
    super()
    this.state = {
      emails: [],
      currentEmail: {},
    }

    this.getEmail = this.getEmail.bind(this);
  }
  async componentDidMount() {
    fetch("http://localhost:3001/emails")
      .then(response => response.json())
      .then(json => this.setState({ emails: json }))
      .then(() => console.log(this.state.emails[0].sender))
  }

  getEmail(event) {
    console.log(this.state)
    let index = event.target.id
    let email = this.state.emails[index]
    this.setState({ currentEmail: email })
    this.open()
  }

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
        <ol>{this.state.emails.map((email, ind) => {
          return <li><a id={ind} onClick={this.getEmail} >{email.subject} {email.sender}</a></li>
        })}</ol>
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
      </div>)
  }
}

export default FetchEmail;