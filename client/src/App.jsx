import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [date, setDate] = useState("");

  const handleGenerate = async () => {
    if (!name || !course || !date) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          course,
          date,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Something went wrong");
        return;
      }

      alert("Certificate generated successfully!");

      window.open(data.downloadUrl, "_blank");
    } catch (error) {
      console.error(error);
      alert("Backend connection failed");
    }
  };

  return (
    <div className="app">

      <nav className="navbar">
        <div className="logo">CertiFlow</div>

        <div className="nav-links">
          <span>Home</span>
          <span>Generate</span>
          <span>About</span>
        </div>
      </nav>

      <section className="hero">

        <div className="hero-text">
          <p className="tag">CERTIFICATE GENERATOR</p>

          <h1>
            Create Beautiful
            <br />
            Certificates <span>Instantly.</span>
          </h1>

          <p className="description">
            Generate professional certificates quickly and easily
            for your events, courses and achievements.
          </p>
        </div>

        <div className="certificate-card">

          <div className="certificate-border">

            <p className="small-title">
              CERTIFICATE OF ACHIEVEMENT
            </p>

            <h2>Certificate</h2>

            <p className="presented">
              This certificate is proudly presented to
            </p>

            <h3>
              {name || "Your Name"}
            </h3>

            <p className="course">
              for successfully completing{" "}
              <strong>
                {course || "Your Course"}
              </strong>
            </p>

            <div className="certificate-bottom">
              <span>{date || "DD-MM-YYYY"}</span>
              <span>CertiFlow</span>
            </div>

          </div>

        </div>

      </section>

      <section className="generator">

        <div className="generator-header">

          <p className="tag">CREATE CERTIFICATE</p>

          <h2>Enter Certificate Details</h2>

          <p>
            Fill in the details below to generate your certificate.
          </p>

        </div>

        <div className="form-card">

          <div className="input-group">

            <label>Recipient Name</label>

            <input
              type="text"
              placeholder="Enter recipient name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

          </div>

          <div className="input-group">

            <label>Course / Event</label>

            <input
              type="text"
              placeholder="Enter course or event"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            />

          </div>

          <div className="input-group">

            <label>Date</label>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

          </div>

          <button onClick={handleGenerate}>
            Generate Certificate
          </button>

        </div>

      </section>

      <footer>
        <p>
          © 2026 CertiFlow — Bulk Certificate Generator
        </p>
      </footer>

    </div>
  );
}

export default App;