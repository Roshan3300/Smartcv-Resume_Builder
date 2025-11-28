import type { ResumeData } from "@/components/resume-builder"
import { formatDate } from "@/lib/utils"

interface ResumePdfTemplateProps {
  resumeData: ResumeData
  selectedCompany?: string
}

// Google PDF Template
const GooglePdfTemplate = ({ resumeData }: { resumeData: ResumeData }) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      width: "210mm",
      minHeight: "297mm",
      padding: "15mm",
      boxSizing: "border-box",
      fontSize: "16px",
      lineHeight: "1.4",
      backgroundColor: "white",
      color: "black",
    }}
  >
    {/* Google-style header */}
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <h1 style={{ fontSize: "36px", fontWeight: "300", margin: "0 0 5px 0", color: "#333" }}>
        {resumeData.personalInfo.name}
      </h1>
      <p style={{ fontSize: "24px", color: "#4285f4", margin: "0 0 15px 0" }}>{resumeData.personalInfo.title}</p>
      <div style={{ fontSize: "16px", color: "#666", display: "flex", justifyContent: "center", gap: "15px" }}>
        <span>{resumeData.personalInfo.email}</span>
        <span>•</span>
        <span>{resumeData.personalInfo.phone}</span>
        <span>•</span>
        <span>{resumeData.personalInfo.location}</span>
      </div>
    </div>

    {/* Summary */}
    {resumeData.personalInfo.summary && (
      <div style={{ marginBottom: "20px" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "500",
            color: "#333",
            marginBottom: "10px",
            borderBottom: "1px solid #ddd",
            paddingBottom: "5px",
          }}
        >
          Summary
        </h2>
        <p style={{ fontSize: "16px", color: "#555", margin: "0", lineHeight: "1.5" }}>
          {resumeData.personalInfo.summary}
        </p>
      </div>
    )}

    {/* Education */}
    {resumeData.education.length > 0 && (
      <div style={{ marginBottom: "20px" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "500",
            color: "#333",
            marginBottom: "10px",
            borderBottom: "1px solid #ddd",
            paddingBottom: "5px",
          }}
        >
          Education
        </h2>
        {resumeData.education.map((edu) => (
          <div key={edu.id} style={{ marginBottom: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "500", color: "#333", margin: "0" }}>
                {edu.degree} in {edu.field}
              </h3>
              <span style={{ fontSize: "16px", color: "#666" }}>
                {formatDate(edu.startDate)} - {edu.current ? "Present" : formatDate(edu.endDate)}
              </span>
            </div>
            <p style={{ fontSize: "16px", color: "#555", margin: "0" }}>{edu.institution}</p>
          </div>
        ))}
      </div>
    )}

    {/* Experience */}
    {resumeData.experience.length > 0 && (
      <div style={{ marginBottom: "20px" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "500",
            color: "#333",
            marginBottom: "10px",
            borderBottom: "1px solid #ddd",
            paddingBottom: "5px",
          }}
        >
          Experience
        </h2>
        {resumeData.experience.map((exp) => (
          <div key={exp.id} style={{ marginBottom: "15px" }}>
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "5px" }}
            >
              <h3 style={{ fontSize: "18px", fontWeight: "500", color: "#333", margin: "0" }}>{exp.position}</h3>
              <span style={{ fontSize: "16px", color: "#666" }}>
                {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
              </span>
            </div>
            <p style={{ fontSize: "16px", color: "#4285f4", fontWeight: "500", margin: "0 0 8px 0" }}>{exp.company}</p>
            {exp.achievements.map((achievement, index) => (
              <p key={index} style={{ fontSize: "16px", color: "#555", margin: "0 0 3px 0" }}>
                • {achievement}
              </p>
            ))}
          </div>
        ))}
      </div>
    )}

    {/* Projects */}
    {resumeData.projects.length > 0 && (
      <div style={{ marginBottom: "20px" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "500",
            color: "#333",
            marginBottom: "10px",
            borderBottom: "1px solid #ddd",
            paddingBottom: "5px",
          }}
        >
          Projects
        </h2>
        {resumeData.projects.map((project) => (
          <div key={project.id} style={{ marginBottom: "15px" }}>
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "5px" }}
            >
              <h3 style={{ fontSize: "18px", fontWeight: "500", color: "#333", margin: "0" }}>{project.name}</h3>
              <span style={{ fontSize: "16px", color: "#666" }}>
                {formatDate(project.startDate)} - {project.current ? "Present" : formatDate(project.endDate)}
              </span>
            </div>
            <p style={{ fontSize: "16px", color: "#666", margin: "0 0 8px 0" }}>{project.description}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "8px" }}>
              {project.technologies
                .filter((tech) => tech.trim())
                .map((tech, index) => (
                  <span
                    key={index}
                    style={{
                      padding: "2px 6px",
                      backgroundColor: "#e3f2fd",
                      color: "#1976d2",
                      borderRadius: "3px",
                      fontSize: "14px",
                    }}
                  >
                    {tech}
                  </span>
                ))}
            </div>
            {project.achievements.map((achievement, index) => (
              <p key={index} style={{ fontSize: "16px", color: "#555", margin: "0 0 3px 0" }}>
                • {achievement}
              </p>
            ))}
          </div>
        ))}
      </div>
    )}

    {/* Internships */}
    {resumeData.internships.length > 0 && (
      <div style={{ marginBottom: "20px" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "500",
            color: "#333",
            marginBottom: "10px",
            borderBottom: "1px solid #ddd",
            paddingBottom: "5px",
          }}
        >
          Internships
        </h2>
        {resumeData.internships.map((int) => (
          <div key={int.id} style={{ marginBottom: "15px" }}>
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "5px" }}
            >
              <h3 style={{ fontSize: "18px", fontWeight: "500", color: "#333", margin: "0" }}>{int.position}</h3>
              <span style={{ fontSize: "16px", color: "#666" }}>
                {formatDate(int.startDate)} - {int.current ? "Present" : formatDate(int.endDate)}
              </span>
            </div>
            <p style={{ fontSize: "16px", color: "#4285f4", fontWeight: "500", margin: "0 0 8px 0" }}>{int.company}</p>
            {int.achievements.map((achievement, index) => (
              <p key={index} style={{ fontSize: "16px", color: "#555", margin: "0 0 3px 0" }}>
                • {achievement}
              </p>
            ))}
          </div>
        ))}
      </div>
    )}

    {/* Certifications */}
    {resumeData.certifications.length > 0 && (
      <div style={{ marginBottom: "20px" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "500",
            color: "#333",
            marginBottom: "10px",
            borderBottom: "1px solid #ddd",
            paddingBottom: "5px",
          }}
        >
          Certifications
        </h2>
        {resumeData.certifications.map((cert) => (
          <div key={cert.id} style={{ marginBottom: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "500", color: "#333", margin: "0" }}>{cert.name}</h3>
              <span style={{ fontSize: "16px", color: "#666" }}>
                {formatDate(cert.issueDate)} - {cert.expiryDate ? formatDate(cert.expiryDate) : "Present"}
              </span>
            </div>
            <p style={{ fontSize: "16px", color: "#555", margin: "0" }}>{cert.issuer}</p>
          </div>
        ))}
      </div>
    )}

    {/* Skills */}
    {resumeData.skills.length > 0 && (
      <div style={{ marginBottom: "20px" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "500",
            color: "#333",
            marginBottom: "10px",
            borderBottom: "1px solid #ddd",
            paddingBottom: "5px",
          }}
        >
          Technical Skills
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {resumeData.skills.map((skill) => (
            <span
              key={skill.id}
              style={{
                padding: "4px 8px",
                backgroundColor: "#e3f2fd",
                color: "#1976d2",
                borderRadius: "12px",
                fontSize: "16px",
              }}
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    )}
  </div>
)

// Microsoft PDF Template
const MicrosoftPdfTemplate = ({ resumeData }: { resumeData: ResumeData }) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      width: "210mm",
      minHeight: "297mm",
      padding: "15mm",
      boxSizing: "border-box",
      fontSize: "16px",
      lineHeight: "1.4",
      backgroundColor: "white",
      color: "black",
    }}
  >
    {/* Microsoft-style header */}
    <div
      style={{
        backgroundColor: "#0078d4",
        color: "white",
        padding: "15px",
        margin: "-15mm -15mm 20px -15mm",
      }}
    >
      <h1 style={{ fontSize: "34px", fontWeight: "bold", margin: "0 0 5px 0" }}>{resumeData.personalInfo.name}</h1>
      <p style={{ fontSize: "24px", margin: "0 0 10px 0" }}>{resumeData.personalInfo.title}</p>
      <div style={{ fontSize: "16px", opacity: "0.9" }}>
        {resumeData.personalInfo.email} | {resumeData.personalInfo.phone} | {resumeData.personalInfo.location}
      </div>
    </div>

    {/* Professional Summary */}
    {resumeData.personalInfo.summary && (
      <div style={{ marginBottom: "20px" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            color: "#0078d4",
            marginBottom: "10px",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          Professional Summary
        </h2>
        <div
          style={{
            backgroundColor: "#f5f5f5",
            padding: "10px",
            borderLeft: "4px solid #0078d4",
          }}
        >
          <p style={{ fontSize: "16px", color: "#333", margin: "0", lineHeight: "1.5" }}>
            {resumeData.personalInfo.summary}
          </p>
        </div>
      </div>
    )}

    {/* Education */}
    {resumeData.education.length > 0 && (
      <div style={{ marginBottom: "20px" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            color: "#0078d4",
            marginBottom: "10px",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          Education
        </h2>
        {resumeData.education.map((edu) => (
          <div
            key={edu.id}
            style={{ marginBottom: "10px", backgroundColor: "#f5f5f5", padding: "8px", borderRadius: "3px" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#333", margin: "0" }}>
                {edu.degree} in {edu.field}
              </h3>
              <span style={{ fontSize: "16px", color: "#666" }}>
                {formatDate(edu.startDate)} - {edu.current ? "Present" : formatDate(edu.endDate)}
              </span>
            </div>
            <p style={{ fontSize: "16px", color: "#333", margin: "0" }}>{edu.institution}</p>
          </div>
        ))}
      </div>
    )}

    {/* Professional Experience */}
    {resumeData.experience.length > 0 && (
      <div style={{ marginBottom: "20px" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            color: "#0078d4",
            marginBottom: "10px",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          Professional Experience
        </h2>
        {resumeData.experience.map((exp) => (
          <div key={exp.id} style={{ marginBottom: "15px", borderLeft: "2px solid #ccc", paddingLeft: "10px" }}>
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "5px" }}
            >
              <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#333", margin: "0" }}>{exp.position}</h3>
              <span
                style={{
                  fontSize: "16px",
                  color: "#666",
                  backgroundColor: "#f0f0f0",
                  padding: "2px 6px",
                  borderRadius: "3px",
                }}
              >
                {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
              </span>
            </div>
            <p style={{ fontSize: "16px", color: "#0078d4", fontWeight: "600", margin: "0 0 8px 0" }}>{exp.company}</p>
            {exp.achievements.map((achievement, index) => (
              <div key={index} style={{ fontSize: "16px", color: "#333", margin: "0 0 3px 0" }}>
                → {achievement}
              </div>
            ))}
          </div>
        ))}
      </div>
    )}

    {/* Projects */}
    {resumeData.projects.length > 0 && (
      <div style={{ marginBottom: "20px" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            color: "#0078d4",
            marginBottom: "10px",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          Projects
        </h2>
        {resumeData.projects.map((project) => (
          <div key={project.id} style={{ marginBottom: "15px", borderLeft: "2px solid #ccc", paddingLeft: "10px" }}>
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "5px" }}
            >
              <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#333", margin: "0" }}>{project.name}</h3>
              <span
                style={{
                  fontSize: "16px",
                  color: "#666",
                  backgroundColor: "#f0f0f0",
                  padding: "2px 6px",
                  borderRadius: "3px",
                }}
              >
                {formatDate(project.startDate)} - {project.current ? "Present" : formatDate(project.endDate)}
              </span>
            </div>
            <p style={{ fontSize: "16px", color: "#666", margin: "0 0 8px 0" }}>{project.description}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "8px" }}>
              {project.technologies
                .filter((tech) => tech.trim())
                .map((tech, index) => (
                  <span
                    key={index}
                    style={{
                      padding: "2px 6px",
                      backgroundColor: "#e3f2fd",
                      color: "#1976d2",
                      borderRadius: "3px",
                      fontSize: "14px",
                    }}
                  >
                    {tech}
                  </span>
                ))}
            </div>
            {project.achievements.map((achievement, index) => (
              <div key={index} style={{ fontSize: "16px", color: "#333", margin: "0 0 3px 0" }}>
                → {achievement}
              </div>
            ))}
          </div>
        ))}
      </div>
    )}

    {/* Internships */}
    {resumeData.internships.length > 0 && (
      <div style={{ marginBottom: "20px" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            color: "#0078d4",
            marginBottom: "10px",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          Internships
        </h2>
        {resumeData.internships.map((int) => (
          <div key={int.id} style={{ marginBottom: "15px", borderLeft: "2px solid #ccc", paddingLeft: "10px" }}>
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "5px" }}
            >
              <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#333", margin: "0" }}>{int.position}</h3>
              <span
                style={{
                  fontSize: "16px",
                  color: "#666",
                  backgroundColor: "#f0f0f0",
                  padding: "2px 6px",
                  borderRadius: "3px",
                }}
              >
                {formatDate(int.startDate)} - {int.current ? "Present" : formatDate(int.endDate)}
              </span>
            </div>
            <p style={{ fontSize: "16px", color: "#555", margin: "2px 0" }}>{int.company}</p>
            {int.achievements.map((achievement, index) => (
              <div key={index} style={{ fontSize: "16px", color: "#333", margin: "0 0 3px 0" }}>
                → {achievement}
              </div>
            ))}
          </div>
        ))}
      </div>
    )}

    {/* Certifications */}
    {resumeData.certifications.length > 0 && (
      <div style={{ marginBottom: "20px" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            color: "#0078d4",
            marginBottom: "10px",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          Certifications
        </h2>
        {resumeData.certifications.map((cert) => (
          <div
            key={cert.id}
            style={{
              marginBottom: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#333", margin: "0" }}>{cert.name}</h3>
              <p style={{ fontSize: "16px", color: "#333", margin: "0" }}>{cert.issuer}</p>
              {cert.credentialId && (
                <p style={{ fontSize: "16px", color: "#666", margin: "0" }}>ID: {cert.credentialId}</p>
              )}
            </div>
            <div style={{ textAlign: "right" }}>
              <span style={{ fontSize: "16px", color: "#666" }}>
                {formatDate(cert.issueDate)}
                {cert.expiryDate && ` - ${formatDate(cert.expiryDate)}`}
              </span>
            </div>
          </div>
        ))}
      </div>
    )}

    {/* Skills */}
    {resumeData.skills.length > 0 && (
      <div>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            color: "#0078d4",
            marginBottom: "10px",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          Skills
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {resumeData.skills.map((skill) => (
            <span
              key={skill.id}
              style={{
                padding: "3px 8px",
                backgroundColor: "#f0f0f0",
                color: "#333",
                borderRadius: "3px",
                fontSize: "16px",
              }}
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    )}
  </div>
)

// Amazon PDF Template
const AmazonPdfTemplate = ({ resumeData }: { resumeData: ResumeData }) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      width: "210mm",
      minHeight: "297mm",
      padding: "15mm",
      boxSizing: "border-box",
      fontSize: "16px",
      lineHeight: "1.4",
      backgroundColor: "#ffd800",
      color: "black",
    }}
  >
    {/* Amazon-style header */}
    <div style={{ marginBottom: "20px" }}>
      <h1 style={{ fontSize: "36px", fontWeight: "bold", margin: "0", color: "#333" }}>
        {resumeData.personalInfo.name}
      </h1>
      <p style={{ fontSize: "24px", color: "#333", margin: "5px 0 10px 0" }}>{resumeData.personalInfo.title}</p>
      <div
        style={{
          fontSize: "16px",
          color: "#333",
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
        {resumeData.personalInfo.location && <span>{resumeData.personalInfo.location}</span>}
        {resumeData.personalInfo.phone && <span>{resumeData.personalInfo.phone}</span>}
        {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
        {resumeData.personalInfo.linkedin && <span>{resumeData.personalInfo.linkedin}</span>}
        {resumeData.personalInfo.website && <span>{resumeData.personalInfo.website}</span>}
      </div>
    </div>

    {/* Summary */}
    {resumeData.personalInfo.summary && (
      <div style={{ marginBottom: "20px" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            borderBottom: "1px solid #ccc",
            paddingBottom: "3px",
            marginBottom: "8px",
            color: "#333",
          }}
        >
          Summary
        </h2>
        <p style={{ fontSize: "16px", color: "#333", margin: "0", lineHeight: "1.5" }}>
          {resumeData.personalInfo.summary}
        </p>
      </div>
    )}

    {/* Education */}
    {resumeData.education.length > 0 && (
      <div style={{ marginBottom: "20px" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            borderBottom: "1px solid #ccc",
            paddingBottom: "3px",
            marginBottom: "8px",
            color: "#333",
          }}
        >
          Education
        </h2>
        {resumeData.education.map((edu) => (
          <div key={edu.id} style={{ marginBottom: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#333", margin: "0" }}>
                {edu.degree} in {edu.field}
              </h3>
              <span style={{ fontSize: "16px", color: "#333" }}>
                {formatDate(edu.startDate)} - {edu.current ? "Present" : formatDate(edu.endDate)}
              </span>
            </div>
            <p style={{ fontSize: "16px", color: "#333", margin: "0" }}>{edu.institution}</p>
            {edu.description && (
              <p style={{ fontSize: "16px", color: "#333", margin: "3px 0 0 0" }}>{edu.description}</p>
            )}
          </div>
        ))}
      </div>
    )}

    {/* Experience */}
    {resumeData.experience.length > 0 && (
      <div style={{ marginBottom: "20px" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            borderBottom: "1px solid #ccc",
            paddingBottom: "3px",
            marginBottom: "8px",
            color: "#333",
          }}
        >
          Experience
        </h2>
        {resumeData.experience.map((exp) => (
          <div key={exp.id} style={{ marginBottom: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#333", margin: "0" }}>{exp.position}</h3>
              <span style={{ fontSize: "16px", color: "#333" }}>
                {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
              </span>
            </div>
            <p style={{ fontSize: "16px", color: "#333", margin: "2px 0" }}>{exp.company}</p>
            {exp.description && <p style={{ fontSize: "16px", color: "#333", margin: "3px 0" }}>{exp.description}</p>}
            {exp.achievements.length > 0 && (
              <ul style={{ marginLeft: "15px", paddingLeft: "0", marginTop: "3px" }}>
                {exp.achievements.map((ach, idx) => (
                  <li
                    key={idx}
                    style={{
                      fontSize: "16px",
                      color: "#333",
                      marginBottom: "2px",
                      listStyleType: "disc",
                    }}
                  >
                    {ach}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    )}

    {/* Projects */}
    {resumeData.projects.length > 0 && (
      <div style={{ marginBottom: "20px" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            borderBottom: "1px solid #ccc",
            paddingBottom: "3px",
            marginBottom: "8px",
            color: "#333",
          }}
        >
          Projects
        </h2>
        {resumeData.projects.map((proj) => (
          <div key={proj.id} style={{ marginBottom: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#333", margin: "0" }}>{proj.name}</h3>
              <span style={{ fontSize: "16px", color: "#333" }}>
                {formatDate(proj.startDate)} - {proj.current ? "Present" : formatDate(proj.endDate)}
              </span>
            </div>
            <p style={{ fontSize: "16px", color: "#333", margin: "3px 0" }}>{proj.description}</p>
            {/* technologies */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "6px" }}>
              {proj.technologies.map(
                (tech, idx) =>
                  tech.trim() && (
                    <span
                      key={idx}
                      style={{
                        padding: "2px 6px",
                        backgroundColor: "#f0f0f0",
                        color: "#333",
                        borderRadius: "3px",
                        fontSize: "14px",
                      }}
                    >
                      {tech}
                    </span>
                  ),
              )}
            </div>
            {proj.achievements.length > 0 && (
              <ul style={{ marginLeft: "15px", paddingLeft: "0", marginTop: "3px" }}>
                {proj.achievements.map((ach, idx) => (
                  <li
                    key={idx}
                    style={{
                      fontSize: "16px",
                      color: "#333",
                      marginBottom: "2px",
                      listStyleType: "disc",
                    }}
                  >
                    {ach}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    )}

    {/* Internships */}
    {resumeData.internships.length > 0 && (
      <div style={{ marginBottom: "20px" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            borderBottom: "1px solid #ccc",
            paddingBottom: "3px",
            marginBottom: "8px",
            color: "#333",
          }}
        >
          Internships
        </h2>
        {resumeData.internships.map((int) => (
          <div key={int.id} style={{ marginBottom: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#333", margin: "0" }}>{int.position}</h3>
              <span style={{ fontSize: "16px", color: "#333" }}>
                {formatDate(int.startDate)} - {int.current ? "Present" : formatDate(int.endDate)}
              </span>
            </div>
            <p style={{ fontSize: "16px", color: "#333", margin: "2px 0" }}>{int.company}</p>
            {int.achievements.length > 0 && (
              <ul style={{ marginLeft: "15px", paddingLeft: "0", marginTop: "3px" }}>
                {int.achievements.map((ach, idx) => (
                  <li
                    key={idx}
                    style={{
                      fontSize: "16px",
                      color: "#333",
                      marginBottom: "2px",
                      listStyleType: "disc",
                    }}
                  >
                    {ach}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    )}

    {/* Certifications */}
    {resumeData.certifications.length > 0 && (
      <div style={{ marginBottom: "20px" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            borderBottom: "1px solid #ccc",
            paddingBottom: "3px",
            marginBottom: "8px",
            color: "#333",
          }}
        >
          Certifications
        </h2>
        {resumeData.certifications.map((cert) => (
          <div
            key={cert.id}
            style={{
              marginBottom: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#333", margin: "0" }}>{cert.name}</h3>
              <p style={{ fontSize: "16px", color: "#333", margin: "0" }}>{cert.issuer}</p>
              {cert.credentialId && (
                <p style={{ fontSize: "16px", color: "#333", margin: "0" }}>ID: {cert.credentialId}</p>
              )}
            </div>
            <div style={{ textAlign: "right" }}>
              <span style={{ fontSize: "16px", color: "#333" }}>
                {formatDate(cert.issueDate)}
                {cert.expiryDate && ` - ${formatDate(cert.expiryDate)}`}
              </span>
            </div>
          </div>
        ))}
      </div>
    )}

    {/* Skills */}
    {resumeData.skills.length > 0 && (
      <div>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            borderBottom: "1px solid #ccc",
            paddingBottom: "3px",
            marginBottom: "8px",
            color: "#333",
          }}
        >
          Skills
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {resumeData.skills.map((skill) => (
            <span
              key={skill.id}
              style={{
                padding: "3px 8px",
                backgroundColor: "#f0f0f0",
                color: "#333",
                borderRadius: "3px",
                fontSize: "16px",
              }}
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    )}
  </div>
)

// Consulting PDF Template
const ConsultingPdfTemplate = ({ resumeData }: { resumeData: ResumeData }) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      width: "210mm",
      minHeight: "297mm",
      padding: "15mm",
      boxSizing: "border-box",
      fontSize: "16px",
      lineHeight: "1.4",
      backgroundColor: "#0078d4",
      color: "white",
    }}
  >
    {/* Consulting-style header */}
    <div style={{ marginBottom: "20px" }}>
      <h1 style={{ fontSize: "36px", fontWeight: "bold", margin: "0", color: "#fff" }}>
        {resumeData.personalInfo.name}
      </h1>
      <p style={{ fontSize: "24px", color: "#fff", margin: "5px 0 10px 0" }}>{resumeData.personalInfo.title}</p>
      <div
        style={{
          fontSize: "16px",
          color: "#fff",
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
        {resumeData.personalInfo.location && <span>{resumeData.personalInfo.location}</span>}
        {resumeData.personalInfo.phone && <span>{resumeData.personalInfo.phone}</span>}
        {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
        {resumeData.personalInfo.linkedin && <span>{resumeData.personalInfo.linkedin}</span>}
        {resumeData.personalInfo.website && <span>{resumeData.personalInfo.website}</span>}
      </div>
    </div>

    {/* Summary */}
    {resumeData.personalInfo.summary && (
      <div style={{ marginBottom: "20px" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            borderBottom: "1px solid #ccc",
            paddingBottom: "3px",
            marginBottom: "8px",
            color: "#fff",
          }}
        >
          Summary
        </h2>
        <p style={{ fontSize: "16px", color: "#fff", margin: "0", lineHeight: "1.5" }}>
          {resumeData.personalInfo.summary}
        </p>
      </div>
    )}

    {/* Education */}
    {resumeData.education.length > 0 && (
      <div style={{ marginBottom: "20px" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            borderBottom: "1px solid #ccc",
            paddingBottom: "3px",
            marginBottom: "8px",
            color: "#fff",
          }}
        >
          Education
        </h2>
        {resumeData.education.map((edu) => (
          <div key={edu.id} style={{ marginBottom: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#fff", margin: "0" }}>
                {edu.degree} in {edu.field}
              </h3>
              <span style={{ fontSize: "16px", color: "#fff" }}>
                {formatDate(edu.startDate)} - {edu.current ? "Present" : formatDate(edu.endDate)}
              </span>
            </div>
            <p style={{ fontSize: "16px", color: "#fff", margin: "0" }}>{edu.institution}</p>
            {edu.description && (
              <p style={{ fontSize: "16px", color: "#fff", margin: "3px 0 0 0" }}>{edu.description}</p>
            )}
          </div>
        ))}
      </div>
    )}

    {/* Experience */}
    {resumeData.experience.length > 0 && (
      <div style={{ marginBottom: "20px" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            borderBottom: "1px solid #ccc",
            paddingBottom: "3px",
            marginBottom: "8px",
            color: "#fff",
          }}
        >
          Experience
        </h2>
        {resumeData.experience.map((exp) => (
          <div key={exp.id} style={{ marginBottom: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#fff", margin: "0" }}>{exp.position}</h3>
              <span style={{ fontSize: "16px", color: "#fff" }}>
                {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
              </span>
            </div>
            <p style={{ fontSize: "16px", color: "#fff", margin: "2px 0" }}>{exp.company}</p>
            {exp.description && <p style={{ fontSize: "16px", color: "#fff", margin: "3px 0" }}>{exp.description}</p>}
            {exp.achievements.length > 0 && (
              <ul style={{ marginLeft: "15px", paddingLeft: "0", marginTop: "3px" }}>
                {exp.achievements.map((ach, idx) => (
                  <li
                    key={idx}
                    style={{
                      fontSize: "16px",
                      color: "#fff",
                      marginBottom: "2px",
                      listStyleType: "disc",
                    }}
                  >
                    {ach}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    )}

    {/* Projects */}
    {resumeData.projects.length > 0 && (
      <div style={{ marginBottom: "20px" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            borderBottom: "1px solid #ccc",
            paddingBottom: "3px",
            marginBottom: "8px",
            color: "#fff",
          }}
        >
          Projects
        </h2>
        {resumeData.projects.map((proj) => (
          <div key={proj.id} style={{ marginBottom: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#fff", margin: "0" }}>{proj.name}</h3>
              <span style={{ fontSize: "16px", color: "#fff" }}>
                {formatDate(proj.startDate)} - {proj.current ? "Present" : formatDate(proj.endDate)}
              </span>
            </div>
            <p style={{ fontSize: "16px", color: "#fff", margin: "3px 0" }}>{proj.description}</p>
            {/* technologies */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "6px" }}>
              {proj.technologies.map(
                (tech, idx) =>
                  tech.trim() && (
                    <span
                      key={idx}
                      style={{
                        padding: "2px 6px",
                        backgroundColor: "#f0f0f0",
                        color: "#fff",
                        borderRadius: "3px",
                        fontSize: "14px",
                      }}
                    >
                      {tech}
                    </span>
                  ),
              )}
            </div>
            {proj.achievements.length > 0 && (
              <ul style={{ marginLeft: "15px", paddingLeft: "0", marginTop: "3px" }}>
                {proj.achievements.map((ach, idx) => (
                  <li
                    key={idx}
                    style={{
                      fontSize: "16px",
                      color: "#fff",
                      marginBottom: "2px",
                      listStyleType: "disc",
                    }}
                  >
                    {ach}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    )}

    {/* Internships */}
    {resumeData.internships.length > 0 && (
      <div style={{ marginBottom: "20px" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            borderBottom: "1px solid #ccc",
            paddingBottom: "3px",
            marginBottom: "8px",
            color: "#fff",
          }}
        >
          Internships
        </h2>
        {resumeData.internships.map((int) => (
          <div key={int.id} style={{ marginBottom: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#fff", margin: "0" }}>{int.position}</h3>
              <span style={{ fontSize: "16px", color: "#fff" }}>
                {formatDate(int.startDate)} - {int.current ? "Present" : formatDate(int.endDate)}
              </span>
            </div>
            <p style={{ fontSize: "16px", color: "#fff", margin: "2px 0" }}>{int.company}</p>
            {int.achievements.length > 0 && (
              <ul style={{ marginLeft: "15px", paddingLeft: "0", marginTop: "3px" }}>
                {int.achievements.map((ach, idx) => (
                  <li
                    key={idx}
                    style={{
                      fontSize: "16px",
                      color: "#fff",
                      marginBottom: "2px",
                      listStyleType: "disc",
                    }}
                  >
                    {ach}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    )}

    {/* Certifications */}
    {resumeData.certifications.length > 0 && (
      <div style={{ marginBottom: "20px" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            borderBottom: "1px solid #ccc",
            paddingBottom: "3px",
            marginBottom: "8px",
            color: "#fff",
          }}
        >
          Certifications
        </h2>
        {resumeData.certifications.map((cert) => (
          <div
            key={cert.id}
            style={{
              marginBottom: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#fff", margin: "0" }}>{cert.name}</h3>
              <p style={{ fontSize: "16px", color: "#fff", margin: "0" }}>{cert.issuer}</p>
              {cert.credentialId && (
                <p style={{ fontSize: "16px", color: "#fff", margin: "0" }}>ID: {cert.credentialId}</p>
              )}
            </div>
            <div style={{ textAlign: "right" }}>
              <span style={{ fontSize: "16px", color: "#fff" }}>
                {formatDate(cert.issueDate)}
                {cert.expiryDate && ` - ${formatDate(cert.expiryDate)}`}
              </span>
            </div>
          </div>
        ))}
      </div>
    )}

    {/* Skills */}
    {resumeData.skills.length > 0 && (
      <div>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            borderBottom: "1px solid #ccc",
            paddingBottom: "3px",
            marginBottom: "8px",
            color: "#fff",
          }}
        >
          Skills
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {resumeData.skills.map((skill) => (
            <span
              key={skill.id}
              style={{
                padding: "3px 8px",
                backgroundColor: "#f0f0f0",
                color: "#fff",
                borderRadius: "3px",
                fontSize: "16px",
              }}
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    )}
  </div>
)

// Indian IT PDF Template
const IndianITPdfTemplate = ({ resumeData }: { resumeData: ResumeData }) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      width: "210mm",
      minHeight: "297mm",
      padding: "15mm",
      boxSizing: "border-box",
      fontSize: "16px",
      lineHeight: "1.4",
      backgroundColor: "#0078d4",
      color: "white",
    }}
  >
    {/* Indian IT-style header */}
    <div style={{ marginBottom: "20px" }}>
      <h1 style={{ fontSize: "36px", fontWeight: "bold", margin: "0", color: "#fff" }}>
        {resumeData.personalInfo.name}
      </h1>
      <p style={{ fontSize: "24px", color: "#fff", margin: "5px 0 10px 0" }}>{resumeData.personalInfo.title}</p>
      <div
        style={{
          fontSize: "16px",
          color: "#fff",
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
        {resumeData.personalInfo.location && <span>{resumeData.personalInfo.location}</span>}
        {resumeData.personalInfo.phone && <span>{resumeData.personalInfo.phone}</span>}
        {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
        {resumeData.personalInfo.linkedin && <span>{resumeData.personalInfo.linkedin}</span>}
        {resumeData.personalInfo.website && <span>{resumeData.personalInfo.website}</span>}
      </div>
    </div>

    {/* Summary */}
    {resumeData.personalInfo.summary && (
      <div style={{ marginBottom: "20px" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            borderBottom: "1px solid #ccc",
            paddingBottom: "3px",
            marginBottom: "8px",
            color: "#fff",
          }}
        >
          Summary
        </h2>
        <p style={{ fontSize: "16px", color: "#fff", margin: "0", lineHeight: "1.5" }}>
          {resumeData.personalInfo.summary}
        </p>
      </div>
    )}

    {/* Education */}
    {resumeData.education.length > 0 && (
      <div style={{ marginBottom: "20px" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            borderBottom: "1px solid #ccc",
            paddingBottom: "3px",
            marginBottom: "8px",
            color: "#fff",
          }}
        >
          Education
        </h2>
        {resumeData.education.map((edu) => (
          <div key={edu.id} style={{ marginBottom: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#fff", margin: "0" }}>
                {edu.degree} in {edu.field}
              </h3>
              <span style={{ fontSize: "16px", color: "#fff" }}>
                {formatDate(edu.startDate)} - {edu.current ? "Present" : formatDate(edu.endDate)}
              </span>
            </div>
            <p style={{ fontSize: "16px", color: "#fff", margin: "0" }}>{edu.institution}</p>
            {edu.description && (
              <p style={{ fontSize: "16px", color: "#fff", margin: "3px 0 0 0" }}>{edu.description}</p>
            )}
          </div>
        ))}
      </div>
    )}

    {/* Experience */}
    {resumeData.experience.length > 0 && (
      <div style={{ marginBottom: "20px" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            borderBottom: "1px solid #ccc",
            paddingBottom: "3px",
            marginBottom: "8px",
            color: "#fff",
          }}
        >
          Experience
        </h2>
        {resumeData.experience.map((exp) => (
          <div key={exp.id} style={{ marginBottom: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#fff", margin: "0" }}>{exp.position}</h3>
              <span style={{ fontSize: "16px", color: "#fff" }}>
                {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
              </span>
            </div>
            <p style={{ fontSize: "16px", color: "#fff", margin: "2px 0" }}>{exp.company}</p>
            {exp.description && <p style={{ fontSize: "16px", color: "#fff", margin: "3px 0" }}>{exp.description}</p>}
            {exp.achievements.length > 0 && (
              <ul style={{ marginLeft: "15px", paddingLeft: "0", marginTop: "3px" }}>
                {exp.achievements.map((ach, idx) => (
                  <li
                    key={idx}
                    style={{
                      fontSize: "16px",
                      color: "#fff",
                      marginBottom: "2px",
                      listStyleType: "disc",
                    }}
                  >
                    {ach}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    )}

    {/* Projects */}
    {resumeData.projects.length > 0 && (
      <div style={{ marginBottom: "20px" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            borderBottom: "1px solid #ccc",
            paddingBottom: "3px",
            marginBottom: "8px",
            color: "#fff",
          }}
        >
          Projects
        </h2>
        {resumeData.projects.map((proj) => (
          <div key={proj.id} style={{ marginBottom: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#fff", margin: "0" }}>{proj.name}</h3>
              <span style={{ fontSize: "16px", color: "#fff" }}>
                {formatDate(proj.startDate)} - {proj.current ? "Present" : formatDate(proj.endDate)}
              </span>
            </div>
            <p style={{ fontSize: "16px", color: "#fff", margin: "3px 0" }}>{proj.description}</p>
            {/* technologies */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "6px" }}>
              {proj.technologies.map(
                (tech, idx) =>
                  tech.trim() && (
                    <span
                      key={idx}
                      style={{
                        padding: "2px 6px",
                        backgroundColor: "#f0f0f0",
                        color: "#fff",
                        borderRadius: "3px",
                        fontSize: "14px",
                      }}
                    >
                      {tech}
                    </span>
                  ),
              )}
            </div>
            {proj.achievements.length > 0 && (
              <ul style={{ marginLeft: "15px", paddingLeft: "0", marginTop: "3px" }}>
                {proj.achievements.map((ach, idx) => (
                  <li
                    key={idx}
                    style={{
                      fontSize: "16px",
                      color: "#fff",
                      marginBottom: "2px",
                      listStyleType: "disc",
                    }}
                  >
                    {ach}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    )}

    {/* Internships */}
    {resumeData.internships.length > 0 && (
      <div style={{ marginBottom: "20px" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            borderBottom: "1px solid #ccc",
            paddingBottom: "3px",
            marginBottom: "8px",
            color: "#fff",
          }}
        >
          Internships
        </h2>
        {resumeData.internships.map((int) => (
          <div key={int.id} style={{ marginBottom: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#fff", margin: "0" }}>{int.position}</h3>
              <span style={{ fontSize: "16px", color: "#fff" }}>
                {formatDate(int.startDate)} - {int.current ? "Present" : formatDate(int.endDate)}
              </span>
            </div>
            <p style={{ fontSize: "16px", color: "#fff", margin: "2px 0" }}>{int.company}</p>
            {int.achievements.length > 0 && (
              <ul style={{ marginLeft: "15px", paddingLeft: "0", marginTop: "3px" }}>
                {int.achievements.map((ach, idx) => (
                  <li
                    key={idx}
                    style={{
                      fontSize: "16px",
                      color: "#fff",
                      marginBottom: "2px",
                      listStyleType: "disc",
                    }}
                  >
                    {ach}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    )}

    {/* Certifications */}
    {resumeData.certifications.length > 0 && (
      <div style={{ marginBottom: "20px" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            borderBottom: "1px solid #ccc",
            paddingBottom: "3px",
            marginBottom: "8px",
            color: "#fff",
          }}
        >
          Certifications
        </h2>
        {resumeData.certifications.map((cert) => (
          <div
            key={cert.id}
            style={{
              marginBottom: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#fff", margin: "0" }}>{cert.name}</h3>
              <p style={{ fontSize: "16px", color: "#fff", margin: "0" }}>{cert.issuer}</p>
              {cert.credentialId && (
                <p style={{ fontSize: "16px", color: "#fff", margin: "0" }}>ID: {cert.credentialId}</p>
              )}
            </div>
            <div style={{ textAlign: "right" }}>
              <span style={{ fontSize: "16px", color: "#fff" }}>
                {formatDate(cert.issueDate)}
                {cert.expiryDate && ` - ${formatDate(cert.expiryDate)}`}
              </span>
            </div>
          </div>
        ))}
      </div>
    )}

    {/* Skills */}
    {resumeData.skills.length > 0 && (
      <div>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            borderBottom: "1px solid #ccc",
            paddingBottom: "3px",
            marginBottom: "8px",
            color: "#fff",
          }}
        >
          Skills
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {resumeData.skills.map((skill) => (
            <span
              key={skill.id}
              style={{
                padding: "3px 8px",
                backgroundColor: "#f0f0f0",
                color: "#fff",
                borderRadius: "3px",
                fontSize: "16px",
              }}
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    )}
  </div>
)

// General PDF Template
const GeneralPdfTemplate = ({ resumeData }: { resumeData: ResumeData }) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      width: "210mm",
      minHeight: "297mm",
      padding: "15mm",
      boxSizing: "border-box",
      fontSize: "16px",
      lineHeight: "1.4",
      backgroundColor: "white",
      color: "black",
    }}
  >
    {/* Simple header */}
    <div style={{ marginBottom: "15px" }}>
      <h1 style={{ fontSize: "32px", fontWeight: "bold", margin: "0", color: "#333" }}>
        {resumeData.personalInfo.name}
      </h1>
      <p style={{ fontSize: "22px", color: "#555", margin: "5px 0 10px 0" }}>{resumeData.personalInfo.title}</p>
      <div
        style={{
          fontSize: "16px",
          color: "#666",
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
        {resumeData.personalInfo.location && <span>{resumeData.personalInfo.location}</span>}
        {resumeData.personalInfo.phone && <span>{resumeData.personalInfo.phone}</span>}
        {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
        {resumeData.personalInfo.linkedin && <span>{resumeData.personalInfo.linkedin}</span>}
        {resumeData.personalInfo.website && <span>{resumeData.personalInfo.website}</span>}
      </div>
    </div>

    {/* Summary */}
    {resumeData.personalInfo.summary && (
      <div style={{ marginBottom: "15px" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "600",
            borderBottom: "1px solid #ccc",
            paddingBottom: "3px",
            marginBottom: "8px",
            color: "#333",
          }}
        >
          Summary
        </h2>
        <p style={{ fontSize: "16px", color: "#555", margin: "0", lineHeight: "1.5" }}>
          {resumeData.personalInfo.summary}
        </p>
      </div>
    )}

    {/* Education */}
    {resumeData.education.length > 0 && (
      <div style={{ marginBottom: "15px" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "600",
            borderBottom: "1px solid #ccc",
            paddingBottom: "3px",
            marginBottom: "8px",
            color: "#333",
          }}
        >
          Education
        </h2>
        {resumeData.education.map((edu) => (
          <div key={edu.id} style={{ marginBottom: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#333", margin: "0" }}>
                {edu.degree} in {edu.field}
              </h3>
              <span style={{ fontSize: "16px", color: "#666" }}>
                {formatDate(edu.startDate)} - {edu.current ? "Present" : formatDate(edu.endDate)}
              </span>
            </div>
            <p style={{ fontSize: "16px", color: "#555", margin: "0" }}>{edu.institution}</p>
            {edu.description && (
              <p style={{ fontSize: "16px", color: "#666", margin: "3px 0 0 0" }}>{edu.description}</p>
            )}
          </div>
        ))}
      </div>
    )}

    {/* Experience */}
    {resumeData.experience.length > 0 && (
      <div style={{ marginBottom: "15px" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "600",
            borderBottom: "1px solid #ccc",
            paddingBottom: "3px",
            marginBottom: "8px",
            color: "#333",
          }}
        >
          Experience
        </h2>
        {resumeData.experience.map((exp) => (
          <div key={exp.id} style={{ marginBottom: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#333", margin: "0" }}>{exp.position}</h3>
              <span style={{ fontSize: "16px", color: "#666" }}>
                {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
              </span>
            </div>
            <p style={{ fontSize: "16px", color: "#555", margin: "2px 0" }}>{exp.company}</p>
            {exp.description && <p style={{ fontSize: "16px", color: "#666", margin: "3px 0" }}>{exp.description}</p>}
            {exp.achievements.length > 0 && (
              <ul style={{ marginLeft: "15px", paddingLeft: "0", marginTop: "3px" }}>
                {exp.achievements.map((ach, idx) => (
                  <li
                    key={idx}
                    style={{
                      fontSize: "16px",
                      color: "#666",
                      marginBottom: "2px",
                      listStyleType: "disc",
                    }}
                  >
                    {ach}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    )}

    {/* Projects */}
    {resumeData.projects.length > 0 && (
      <div style={{ marginBottom: "15px" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "600",
            borderBottom: "1px solid #ccc",
            paddingBottom: "3px",
            marginBottom: "8px",
            color: "#333",
          }}
        >
          Projects
        </h2>
        {resumeData.projects.map((proj) => (
          <div key={proj.id} style={{ marginBottom: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#333", margin: "0" }}>{proj.name}</h3>
              <span style={{ fontSize: "16px", color: "#666" }}>
                {formatDate(proj.startDate)} - {proj.current ? "Present" : formatDate(proj.endDate)}
              </span>
            </div>
            <p style={{ fontSize: "16px", color: "#666", margin: "3px 0" }}>{proj.description}</p>
            {/* technologies */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "6px" }}>
              {proj.technologies.map(
                (tech, idx) =>
                  tech.trim() && (
                    <span
                      key={idx}
                      style={{
                        padding: "2px 6px",
                        backgroundColor: "#f0f0f0",
                        color: "#555",
                        borderRadius: "3px",
                        fontSize: "14px",
                      }}
                    >
                      {tech}
                    </span>
                  ),
              )}
            </div>
            {proj.achievements.length > 0 && (
              <ul style={{ marginLeft: "15px", paddingLeft: "0", marginTop: "3px" }}>
                {proj.achievements.map((ach, idx) => (
                  <li
                    key={idx}
                    style={{
                      fontSize: "16px",
                      color: "#555",
                      marginBottom: "2px",
                      listStyleType: "disc",
                    }}
                  >
                    {ach}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    )}

    {/* Internships */}
    {resumeData.internships.length > 0 && (
      <div style={{ marginBottom: "15px" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "600",
            borderBottom: "1px solid #ccc",
            paddingBottom: "3px",
            marginBottom: "8px",
            color: "#333",
          }}
        >
          Internships
        </h2>
        {resumeData.internships.map((int) => (
          <div key={int.id} style={{ marginBottom: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#333", margin: "0" }}>{int.position}</h3>
              <span style={{ fontSize: "16px", color: "#666" }}>
                {formatDate(int.startDate)} - {int.current ? "Present" : formatDate(int.endDate)}
              </span>
            </div>
            <p style={{ fontSize: "16px", color: "#555", margin: "2px 0" }}>{int.company}</p>
            {int.achievements.length > 0 && (
              <ul style={{ marginLeft: "15px", paddingLeft: "0", marginTop: "3px" }}>
                {int.achievements.map((ach, idx) => (
                  <li
                    key={idx}
                    style={{
                      fontSize: "16px",
                      color: "#555",
                      marginBottom: "2px",
                      listStyleType: "disc",
                    }}
                  >
                    {ach}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    )}

    {/* Certifications */}
    {resumeData.certifications.length > 0 && (
      <div style={{ marginBottom: "15px" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "600",
            borderBottom: "1px solid #ccc",
            paddingBottom: "3px",
            marginBottom: "8px",
            color: "#333",
          }}
        >
          Certifications
        </h2>
        {resumeData.certifications.map((cert) => (
          <div
            key={cert.id}
            style={{
              marginBottom: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#333", margin: "0" }}>{cert.name}</h3>
              <p style={{ fontSize: "16px", color: "#555", margin: "0" }}>{cert.issuer}</p>
              {cert.credentialId && (
                <p style={{ fontSize: "16px", color: "#666", margin: "0" }}>ID: {cert.credentialId}</p>
              )}
            </div>
            <div style={{ textAlign: "right" }}>
              <span style={{ fontSize: "16px", color: "#666" }}>
                {formatDate(cert.issueDate)}
                {cert.expiryDate && ` - ${formatDate(cert.expiryDate)}`}
              </span>
            </div>
          </div>
        ))}
      </div>
    )}

    {/* Skills */}
    {resumeData.skills.length > 0 && (
      <div>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "600",
            borderBottom: "1px solid #ccc",
            paddingBottom: "3px",
            marginBottom: "8px",
            color: "#333",
          }}
        >
          Skills
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {resumeData.skills.map((skill) => (
            <span
              key={skill.id}
              style={{
                padding: "3px 8px",
                backgroundColor: "#f0f0f0",
                color: "#555",
                borderRadius: "3px",
                fontSize: "16px",
              }}
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    )}
  </div>
)

export default function ResumePdfTemplate({ resumeData, selectedCompany = "general" }: ResumePdfTemplateProps) {
  const renderTemplate = () => {
    switch (selectedCompany) {
      case "google":
        return <GooglePdfTemplate resumeData={resumeData} />
      case "microsoft":
        return <MicrosoftPdfTemplate resumeData={resumeData} />
      case "amazon":
        return <AmazonPdfTemplate resumeData={resumeData} />
      case "deloitte":
      case "capgemini":
        return <ConsultingPdfTemplate resumeData={resumeData} />
      case "tcs":
      case "infosys":
        return <IndianITPdfTemplate resumeData={resumeData} />
      case "general":
      default:
        return <GeneralPdfTemplate resumeData={resumeData} />
    }
  }

  return renderTemplate()
}
