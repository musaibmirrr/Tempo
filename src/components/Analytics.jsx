import React, { useContext } from 'react';
import { TempoContext } from '../context/Context';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';

const Analytics = () => {
  const { tempo } = useContext(TempoContext);

  const totalTasks = tempo ? tempo.length : 0;
  const completedTasks = tempo ? tempo.filter(t => t.status === 'Completed ✅').length : 0;
  const inProgressTasks = tempo ? tempo.filter(t => t.status === 'In Progress 🔄').length : 0;

  const totalEst = tempo ? tempo.reduce((acc, t) => acc + parseFloat(t.est || 0), 0) : 0;
  const totalAct = tempo ? tempo.reduce((acc, t) => acc + parseFloat(t.act || 0), 0) : 0;

  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="analytics-container mx-4 mt-4">
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center bg-dark text-light">
            <Card.Body>
              <Card.Title>Total Tasks</Card.Title>
              <Card.Text className="h2">{totalTasks}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center bg-success text-light">
            <Card.Body>
              <Card.Title>Completed</Card.Title>
              <Card.Text className="h2">{completedTasks}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center bg-primary text-light">
            <Card.Body>
              <Card.Title>In Progress</Card.Title>
              <Card.Text className="h2">{inProgressTasks}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center bg-info text-light">
            <Card.Body>
              <Card.Title>Completion Rate</Card.Title>
              <Card.Text className="h2">{completionRate}%</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Hours Analytics (Actual vs Estimated)</Card.Title>
          <ProgressBar>
            <ProgressBar striped variant="success" now={Math.min((totalAct / (totalEst || 1)) * 100, 100)} key={1} label={`${totalAct.toFixed(1)}h`} />
            <ProgressBar variant="secondary" now={Math.max(0, 100 - (totalAct / (totalEst || 1)) * 100)} key={2} label={`${totalEst.toFixed(1)}h`} />
          </ProgressBar>
          <div className="mt-2 text-muted small">
            Actual Hours: {totalAct.toFixed(1)}h / Estimated Hours: {totalEst.toFixed(1)}h
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Analytics;
