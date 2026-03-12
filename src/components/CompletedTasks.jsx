import React, { useContext } from 'react';
import { TempoContext } from '../context/Context';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

const CompletedTasks = () => {
  const { archivedTempo, restoreTask, deleteArchivedTask } = useContext(TempoContext);

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Completed & Archived Tasks</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr className="text-center">
            <th>DATE</th>
            <th>TASK DETAILS</th>
            <th>ARCHIVED ON</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {archivedTempo && archivedTempo.length > 0 ? (
            archivedTempo.map((t) => (
              <tr key={t.id} className="text-center">
                <td>{t.date}</td>
                <td>{t.task}</td>
                <td>{t.archivedAt ? new Date(t.archivedAt).toLocaleDateString() : 'N/A'}</td>
                <td>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => restoreTask(t.id)}
                    className="me-2"
                  >
                    Restore ↺
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteArchivedTask(t.id)}
                  >
                    Delete 🗑️
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-4">No archived tasks found.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default CompletedTasks;
