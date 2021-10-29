import React, { useState } from 'react';
import "./contact.css";

export function Contact() {
  const [data, setData] = useState({
    title: "",
    message: "",
  });

  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div id="contactWrapper">
      <div id="contactContent">
        <form name="contact" method="post">
          <input type="hidden" name="form-name" value="contact" />
          <header id="contactHeader">
            <p id="contactHeaderText">Contact Us</p>
          </header>
          <div id="fieldContainer">
            <p>
              Title
            </p>
            <input type="text" id="titleField" placeholder="Subject" name="title" value={data.title} onChange={handleChange} required />
            <p>
              Message
            </p>
            <textarea name="message" id="messageField" placeholder="Your message here.." value={data.message} onChange={handleChange} required />
          </div>
          <div>
            <input type="submit" value="Submit" id="submitForm" />
          </div>
        </form>
      </div>
    </div>
  );
}
