import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { pb } from "../../../lib/db";
import Head from "next/head";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (pb.authStore.isValid) {
      router.replace("/admin/dashboard");
    } else {
      setChecking(false);
    }
  }, [router]);

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      await pb.collection("users").authWithPassword(email, password);
      router.replace("/admin/dashboard");
    } catch (err: any) {
      setError(err?.message || "Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          fontFamily: "sans-serif",
        }}
      >
        <p>Checking authentication...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Admin Login</title>
      </Head>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
      `}</style>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          background: "#f4f4f5",
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: "0.5rem",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            padding: "2rem",
            width: "100%",
            maxWidth: "400px",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                marginBottom: "0.25rem",
              }}
            >
              Admin Panel
            </h1>
            <p style={{ color: "#71717a", fontSize: "0.875rem" }}>
              Admin Panel Login
            </p>
          </div>

          {error && (
            <div
              style={{
                background: "#fef2f2",
                color: "#dc2626",
                padding: "0.75rem",
                borderRadius: "0.375rem",
                fontSize: "0.875rem",
                marginBottom: "1rem",
                border: "1px solid #fecaca",
              }}
            >
              {error}
            </div>
          )}

          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: 500,
                marginBottom: "0.375rem",
                color: "#18181b",
              }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.5rem 0.75rem",
                border: "1px solid #d4d4d8",
                borderRadius: "0.375rem",
                fontSize: "0.875rem",
                outline: "none",
              }}
              placeholder="admin@example.com"
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: 500,
                marginBottom: "0.375rem",
                color: "#18181b",
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.5rem 0.75rem",
                border: "1px solid #d4d4d8",
                borderRadius: "0.375rem",
                fontSize: "0.875rem",
                outline: "none",
              }}
              placeholder="Enter your password"
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>

          <button
            type="button"
            disabled={loading}
            onClick={handleLogin}
            style={{
              width: "100%",
              padding: "0.625rem",
              background: loading ? "#a1a1aa" : "#18181b",
              color: "#fff",
              border: "none",
              borderRadius: "0.375rem",
              fontSize: "0.875rem",
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </div>
      </div>
    </>
  );
}
