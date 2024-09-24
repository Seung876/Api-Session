import React, { useEffect, useState } from 'react';
import { fetchAccidentTypes, fetchAccidentByRegion } from './requests';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  font-family: sans-serif;
  background-color: #f8f9fa;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const Title = styled.h1`
  color: #ffffff;
  text-align: center;
  width: 100%;
  font-size: 2.5em;
  margin-bottom: 20px;
  padding: 20px;
  background: linear-gradient(90deg, #007bff, #00bfff);
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
  position: relative; 
  
`;


const Subtitle = styled.h2`
  color: #343a40;
  text-align: center;
  width: 100%;
  margin-top: 20px;
`;

const ListContainer = styled.div`
  flex: 1;
  max-width: 400px;
  margin: 10px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
`;

const ListItem = styled.div`
  background-color: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 10px; 
  padding: 20px;
  margin: 10px;
  width: 100%;
  text-align: center;
  transition: transform 0.2s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const Highlight = styled.span`
  color: #007bff;
  font-weight: bold;
`;

const SomeComponent = () => {
  const [accidentTypes, setAccidentTypes] = useState([]);
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const typesResult = await fetchAccidentTypes(1, 10);
    const regionsResult = await fetchAccidentByRegion(1, 10);

    if (typesResult && typesResult.data) {
      setAccidentTypes(typesResult.data);
    } else {
      console.log('사고 유형 데이터가 없습니다.');
    }

    if (regionsResult && regionsResult.data) {
      setRegions(regionsResult.data);
    } else {
      console.log('시도별 데이터가 없습니다.');
    }

    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <Container>
      <Title>교통사고 통계</Title>
      
      <ListContainer>
        <Subtitle>사고 유형별 데이터</Subtitle>
        {accidentTypes.length === 0 ? (
          <p>사고 유형 데이터가 없습니다.</p>
        ) : (
          <List>
            {accidentTypes.map((item, index) => (
              <ListItem key={index}>
                <Highlight>사고유형: {item.사고유형_대분류}</Highlight><br />
                사건건수: {item.사고건수}건<br />
                사망자수: {item.사망자수}명
              </ListItem>
            ))}
          </List>
        )}
      </ListContainer>

      <ListContainer>
        <Subtitle>시도별 데이터</Subtitle>
        {regions.length === 0 ? (
          <p>시도별 데이터가 없습니다.</p>
        ) : (
          <List>
            {regions.map((item, index) => (
              <ListItem key={index}>
                <Highlight>시도: {item.시도}</Highlight><br />
                사건건수: {item.사고건수}건<br />
                사망자수: {item.사망자수}명
              </ListItem>
            ))}
          </List>
        )}
      </ListContainer>
    </Container>
  );
};

export default SomeComponent;
