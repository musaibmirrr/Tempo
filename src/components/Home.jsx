import { useContext, useEffect } from "react";
import AddTempo from "./AddTempo";
import TableComponent from "./TableComponent";

export default function Home() {
  return (
    <>
      <AddTempo />
      <TableComponent />
    </>
  );
}
