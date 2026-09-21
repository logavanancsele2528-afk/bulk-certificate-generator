import { useState } from "react";
import * as XLSX from "xlsx";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [date, setDate] = useState("");

  // Excel Upload
  const handleExcelUpload = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);

      const workbook = XLSX.read(data, {
        type: "array",
      });

      const sheetName = workbook.SheetNames[0];

      const sheet = workbook.Sheets[sheetName];

      const rows = XLSX.utils.sheet_to_json(sheet);

      if (rows.length > 0) {
        const firstRow = rows[0];

        setName(
          firstRow.Name ||
            firstRow.name ||
            firstRow.NAME ||
            ""
        );

        setCourse(
          firstRow.Course ||
            firstRow.course ||
            firstRow.COURSE ||
            ""
        );

        setDate(
          firstRow.Date ||
            firstRow.date ||
            firstRow.DATE ||
            ""
        );
      }
    };

    reader.readAsArrayBuffer(file);
  };

  // Generate / Print Certificate
  const handleGenerateCertificate = () => {
    if (!name || !course || !date) {
      alert("Please enter Student Name, Course and Date.");
      return;
    }

    window.print();
  };

  return (
    <div className="app">

      {/* HEADER */}
      <header className="header">

        <div>
          <h1>CertiFlow</h1>

          <p>
            Bulk Certificate Generator
          </p>
        </div>

        <span className="badge">
          Certificate Studio
        </span>

      </header>

      {/* MAIN */}
      <main className="container">

        {/* DETAILS PANEL */}
        <section className="panel">

          <h2>Student Details</h2>

          {/* Excel */}
          <label>
            Upload Excel File
          </label>

          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleExcelUpload}
          />

          <p className="hint">
            Excel columns: Name, Course, Date
          </p>

          {/* Name */}
          <label>
            Student Name
          </label>

          <input
            type="text"
            placeholder="Enter student name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          {/* Course */}
          <label>
            Course
          </label>

          <input
            type="text"
            placeholder="Enter course name"
            value={course}
            onChange={(e) =>
              setCourse(e.target.value)
            }
          />

          {/* Date */}
          <label>
            Date
          </label>

          <input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
          />

          {/* Generate Button */}
          <button
            className="download-btn"
            onClick={handleGenerateCertificate}
          >
            Generate Certificate
          </button>

        </section>

        {/* CERTIFICATE */}
        <section className="certificate-area">

          <h2 className="preview-title">
            Certificate Preview
          </h2>

          <div
            className="certificate"
            id="certificate"
          >

            <div className="certificate-border">

              <p className="brand">
                CERTIFLOW
              </p>

              <h1>
                CERTIFICATE
              </h1>

              <h3>
                OF ACHIEVEMENT
              </h3>

              <p className="presented">
                This certificate is proudly presented to
              </p>

              <h2 className="student-name">
                {name || "Student Name"}
              </h2>

              <p className="completed">
                for successfully completing
              </p>

              <h2 className="course-name">
                {course || "Course Name"}
              </h2>

              <div className="certificate-footer">

                <div>
                  <span>
                    {date || "DD / MM / YYYY"}
                  </span>

                  <small>
                    DATE
                  </small>
                </div>

                <div>
                  <span>
                    CertiFlow
                  </span>

                  <small>
                    ISSUED BY
                  </small>
                </div>

              </div>

            </div>

          </div>

          <p className="print-info">
            Click <b>Generate Certificate</b> to print
            or save your certificate as PDF.
          </p>

        </section>

      </main>

    </div>
  );
}

export default App;