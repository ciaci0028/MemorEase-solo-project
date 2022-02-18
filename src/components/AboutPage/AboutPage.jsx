import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <p>Technologies used:</p>
        <ul>
          <li>JavaScript</li>
          <li>Express / Node</li>
          <li>React / Redux / Sagas</li>
          <li>SQL</li>
          <li>MUI</li>
          <li>Moment</li>
        </ul>
        <hr></hr>
        <p>Challenges:</p>
        <p>Figuring out all the different ways that I needed the data to move back
          and forth from the database was both challenging but really fun!
          I love accomplishing a good SQL query!
        </p>
        <hr></hr>
        <p>For the future:</p>
        <ul>
          <li>A way to download and save collages to email or print</li>
        </ul>
      </div>
    </div>
  );
}

export default AboutPage;
