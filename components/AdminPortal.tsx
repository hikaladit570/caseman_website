"use client";

import { useEffect, useState, type SyntheticEvent } from "react";
import { LockKeyhole, LogOut, ShieldCheck } from "lucide-react";
import Home from "@/app/home";
import Link from "@/components/PlainLink";

type SessionState = {
  authenticated: boolean;
  configured: boolean;
  username: string | null;
};

export default function AdminPortal() {
  const [session, setSession] = useState<SessionState | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    void fetch("/api/admin/session", { cache: "no-store" })
      .then((response) => response.json() as Promise<SessionState>)
      .then(setSession)
      .catch(() =>
        setSession({ authenticated: false, configured: false, username: null }),
      );
  }, []);

  const login = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const result = (await response.json()) as { error?: string; username?: string };
      if (!response.ok) throw new Error(result.error ?? "Login gagal.");
      setPassword("");
      setSession({ authenticated: true, configured: true, username: result.username ?? username });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Login gagal.");
    } finally {
      setSubmitting(false);
    }
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setSession({ authenticated: false, configured: true, username: null });
  };

  if (!session) {
    return <main className="admin-gate"><p>Memeriksa sesi admin...</p></main>;
  }

  if (!session.authenticated) {
    return (
      <main className="admin-gate">
        <section className="admin-login-card" aria-labelledby="admin-login-title">
          <div className="admin-login-mark"><LockKeyhole aria-hidden="true" /></div>
          <p className="eyebrow">Area pengelola</p>
          <h1 id="admin-login-title">Login admin CaseMan</h1>
          <p>Masuk untuk mengubah konten website yang dilihat semua pengunjung.</p>
          {!session.configured && (
            <output className="admin-config-note">
              Isi ADMIN_USERNAME, ADMIN_PASSWORD, dan ADMIN_SESSION_SECRET pada environment server.
            </output>
          )}
          <form className="admin-login-form" onSubmit={login}>
            <label>
              Username
              <input
                autoComplete="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </label>
            <button className="btn cyan admin-login-submit" disabled={submitting}>
              <ShieldCheck size={18} />
              {submitting ? "Memeriksa..." : "Masuk ke editor"}
            </button>
          </form>
          <output className="admin-login-message">{message}</output>
          <Link className="admin-back-link" href="/">Kembali ke website</Link>
        </section>
      </main>
    );
  }

  return (
    <>
      <div className="admin-session-bar">
        <span><ShieldCheck size={17} /> Mode admin: {session.username}</span>
        <button onClick={logout}><LogOut size={16} /> Keluar</button>
      </div>
      <Home showEditor />
    </>
  );
}
