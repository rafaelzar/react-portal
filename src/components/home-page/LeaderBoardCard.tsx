import React from 'react';
import {
  Container, Spinner
} from 'react-bootstrap';
import EmployeePhoto from '../EmployeePhoto';
import { ILeaderboardData } from '../../lib/interfaces';

type IProps = {
    leaderboardData: ILeaderboardData[]
};

const LeaderBoardCard: React.VFC<IProps> = ({ leaderboardData }) => {

  return (
    <Container className='py-3'>
      <h2>Top Performers</h2>
      {leaderboardData?.length > 0
        ? leaderboardData.map((data, idx) => (
          <div key={data.employee._id} className='d-flex align-items-center mb-2'>
            <h4 className='font-weight-bold mr-2 mb-0'>{idx + 1}</h4>

            <EmployeePhoto userInfo={data.employee} small />

            <div className='d-flex ml-2 flex-column'>
              <h6 className='mb-0 font-weight-bold'>
                {data.employee.first_name}
                {' '}
                {data.employee.last_name}
              </h6>
              <div>
                <span className='font-weight-bold'>{data.mentions}</span>
                {' '}
                Reviews
                {' '}
                |
                {' '}
                <span className='font-weight-bold'>{data.rating}</span>
                {' '}
                Rating
                {' '}
                |
                {' '}
                <span className='font-weight-bold'>
                  $
                  {data.earned}
                </span>
                {' '}
                Earned
              </div>
            </div>
          </div>
        )) : (
          <Spinner className='d-block mx-auto my-4' animation='border' />
        )}
    </Container>
  );
};

export default LeaderBoardCard;
