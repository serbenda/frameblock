import React from 'react'
import packageInfo from '../../../package.json'

import './Footer.css'

const Footer = () => {

  return (
    <section className="footer">
      <div className="versioning">
        <span>
          Simple AI Collection version:  <i>1.0.0</i>
        </span>

      </div>
      <section className="footer-links">
        <span className="social-links">
          <a
            className="footer-icon github"
            href="tobe"
            target="_blank"
            rel="noopener noreferrer"
            title="Github"
          >
            <p> </p>
          </a>
          <span>Chek our GitHub</span>
        </span>
        <span className="social-links">
          <a
            className="footer-icon discord"
            href="tobe"
            target="_blank"
            rel="noopener noreferrer"
            title="Discord"
          >
            <p> </p>
          </a>
          <span>Join our Discord</span>
        </span>
        <span className="social-links">
          <a
            className="footer-icon twitter"
            href="tobe"
            target="_blank"
            rel="noopener noreferrer"
            title="Twitter"
          >
            <p> </p>
          </a>
          <span>SimpleAICollection Twitter</span>
        </span>
      </section>

    </section>
  )
}

export default Footer
