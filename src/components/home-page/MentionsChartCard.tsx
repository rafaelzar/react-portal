import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import { Chart } from '../reviews-page/Chart';

const MentionsChartCard: React.FC = () => {
  const chartData = [14, 4, 9];
  return (
    <Card className='mb-3'>
      <Container className='py-3'>
        <h2>Review Site Mentions</h2>
        <div className='mt-3 d-flex justify-content-center'>
          <div className='chart-wrapp'>
            <Doughnut
              data={Chart(chartData)}
              options={{
                animation: {
                  duration: 0,
                },
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      usePointStyle: true,
                      font: {
                        size: 16,
                      },
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </Container>
    </Card>
  );
};

export default MentionsChartCard;
