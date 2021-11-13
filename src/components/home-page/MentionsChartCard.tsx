import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import { Chart } from '../reviews-page/Chart';
import { IHomeReviewSiteMentions } from '../../lib/interfaces';

interface IProps {
  sitesData: IHomeReviewSiteMentions[];
}

const MentionsChartCard: React.FC<IProps> = ({ sitesData }) => {
  const [chartDataNumbers, setChartDataNumbers] = React.useState([0, 0, 0]);
  const [chartDataSites, setChartDataSites] = React.useState<Array<string>>([]);

  React.useEffect(() => {
    setChartDataNumbers(sitesData?.map((d) => d.numOfReviews));
    setChartDataSites(sitesData?.map((d) => d.platform));
  }, [sitesData]);

  return (
    <Card className='mb-3'>
      <Container className='py-2'>
        <h2 className='mb-0'>Review Site Mentions</h2>
        <div className='d-flex justify-content-center'>
          <div className='chart-wrapp'>
            <Doughnut
              data={Chart(chartDataNumbers, chartDataSites)}
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
