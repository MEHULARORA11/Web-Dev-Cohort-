import { Link } from "@tanstack/react-router";

function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(to right,rgb(15, 23, 42),rgb(30, 41, 59))",
        color: "white",
        fontFamily: "Arial",
        padding: "20px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          maxWidth: "500px",
        }}
      >
        <h1
          style={{
            fontSize: "120px",
            margin: 0,
            fontWeight: "bold",
            opacity: 0.9,
          }}
        >
          404
        </h1>

        <h2
          style={{
            fontSize: "32px",
            marginBottom: "10px",
          }}
        >
          Page Not Found
        </h2>

        <p
          style={{
            color: "#cbd5e1",
            lineHeight: 1.6,
            marginBottom: "30px",
          }}
        >
          The page you are trying to access does not exist or may have been
          moved.
        </p>

        <Link
          to="/"
          style={{
            textDecoration: "none",
            background: "#3b82f6",
            color: "white",
            padding: "12px 24px",
            borderRadius: "10px",
            fontWeight: "bold",
            transition: "0.3s",
          }}
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;