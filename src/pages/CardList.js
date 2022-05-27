import React from 'react';
import {useCardsQuery} from '../http/useCardsQuery';
import styled from 'styled-components';
import {Typography} from 'antd';
import 'moment/locale/ru';
import {getRangeDate, getYear, getYearsCards} from '../utils/timeUtils';
import {useNavigate} from 'react-router-dom';

const {Title, Text} = Typography;

const tempStyle = {textAlign: 'center', color: '#fff', margin: '5px'};

export const CardList = () => {
  const {data} = useCardsQuery();
  const navigate = useNavigate();

  const years = getYearsCards(data);

  if (!data) {
    return <Container>
      <div>Кажется карточек нет...</div>
    </Container>;
  }

  const getCardData = (year) => {
    const filteredData = data?.filter(({dateStart}) => getYear(dateStart) === year);

    const sortedData = filteredData?.sort((a, b) => {
      const dateA = new Date(a.dateStart);
      const dateB = new Date(b.dateStart);
      return dateB-dateA;
    });

    return sortedData?.map(({id, dateStart, dateEnd, category, color, city})=>
      <CardBlock
        key={id}
        color={color}
        onClick={()=>navigate(`card/${id}`)}
      >
        <StyledWhiteTitle level={3} style={tempStyle}>
          {category}
        </StyledWhiteTitle>
        <StyledWhiteTitle level={5} style={tempStyle}>
          {city}
        </StyledWhiteTitle>

        {dateStart && dateEnd && <Text type="secondary" style={{margin: 0}}>
          {getRangeDate(dateStart, dateEnd)}
        </Text>}
      </CardBlock>,
    );
  };

  return (
    <Container>
      <StyledTitle level={3}>Общения-урал.рф</StyledTitle>
      {years.map((year) =>
        <CardContainer key={year}>
          <Title level={5} style={{margin: 0, textAlign: 'center'}}>
            {year}
          </Title>
          {getCardData(year)}
        </CardContainer>,
      )}

    </Container>
  );
};

const Container = styled.div`
  display: block;
  margin: 50px auto;
  max-width: 400px; 
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  width: 100%;
`;

const CardBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  background: ${({color}) => color};
  color: #fff;
  width: 100%;
  height: 150px;
  margin: 10px auto;
  border-radius: 15px;
`;

const StyledTitle = styled(Title)`
  text-align: center; 
`;

const StyledWhiteTitle = styled(Title)`
  text-align: center;
  color: #fff;
  margin: 10px 0;
`;
