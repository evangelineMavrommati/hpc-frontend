import React, { Component } from 'react';
import './home.css';
import LoginModal from '../LoginModal';
import RegisterModal from '../RegisterModal';
import ExpansionPanel from '../ExpansionPanel';

class Home extends Component {

  render() {
    return (
      <div>
        <header className='masthead'>
          <link rel="stylesheet" href="about.css"></link>

          <p className='masthead-intro'>Welcome to </p>
          <h1 className='masthead-heading'>Host, Post, Compost</h1>
        </header>

        <section className="introduction-section">
          <h1>Have extra room for compost?</h1>
          <p>Whether you're a business owner or homeowner allow your community to contribute to your compost pile! </p>
        </section>

        <section className="location-section">
          <h1>Looking to compost?</h1>
          <p>Become a contributor and you'll have the ability to contribute compost to a host near you!</p>
        </section>

        <section className="location-section">
          <h1>Ready to join the composting community?</h1>
          <LoginModal />
          <br />
          <RegisterModal />
        </section>

        <section className="location-section">
          <h1> Composting tips and tricks </h1>

          <section className="questions-section">

            <ExpansionPanel />

          </section>

          <footer className="content-footer">
            <h6>Find us on:</h6>
            <ul className="social">
              <li><a className="css-is-deranged" href="https://www.instagram.com">Instagram</a></li>
              <li><a className="css-is-deranged" href="https://twitter.com/home">Twitter</a></li>
              <li><a className="css-is-deranged" href="https://www.facebook.com">Facebook</a></li>
            </ul>
          </footer>
        </section>
      </div>
    )
  }
}

export default Home;
