import React from "react";
import AddTempo from "./AddTempo";
import TableComponent from "./TableComponent";
import Analytics from "./Analytics";

export default function Home() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage your tasks and track your productivity.</p>
        </div>
        <AddTempo />
      </header>

      <Analytics />

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">Main Tasks</h2>
        <TableComponent />
      </div>
    </div>
  );
}
