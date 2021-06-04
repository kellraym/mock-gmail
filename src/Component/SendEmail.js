import React from 'react';

class SendEmails extends React.Component {

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
        id: document.querySelector(`.id`).value,
      })
    })
      .then(response => response.json())
      .then(json => console.log(json));
    this.componentDidMount();
  }

  openEmail() {
    document.getElementById("sendModal").classList.remove(`hidden`);
    // document.getElementById("sendModal").classList.remove(`hidden`);
  }

  closeEmail() {
    document.getElementById("sendModal").classList.add(`hidden`);
  }

  render() {
    return (
      <div>
        <input type="button" onClick={this.openEmail} value="Compose email" />
        <div id="sendModal" className="sendModal hidden">
          <div className="modal-content">
            <span className="close" onClick={this.closeEmail}>&times;</span>
            <div className="modalEmail"></div>
            <form>
              <input className="sender" type="text" placeholder="sender" /><br />
              <input className="recipient" type="text" placeholder="recipient" /><br />
              <input className="subject" type="text" placeholder="subject" /><br />
              <input className="message" type="text" placeholder="message" /><br />
              <input className="date" type="text" placeholder="date" />
              <input className="id" type="text" value={this.props.index} />
              <input type="button" onClick={this.post} value="send" />
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default SendEmails;