import { useContext, useEffect } from "react";
import AddTempo from "./AddTempo";
import TableComponent from "./TableComponent";
import Analytics from "./Analytics";

export default function Home() {
  return (
    <>
      <Analytics />
      <AddTempo />
      <TableComponent />
    </>
  );
}
