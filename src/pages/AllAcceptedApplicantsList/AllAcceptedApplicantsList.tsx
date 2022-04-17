import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import UserList from './UserList';

export default function List() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);

  const back = () => {
    return navigate('/precampain-list');
  };

  useEffect(() => {
    fetch('/data/userData.json')
      .then((res) => res.json())
      .then((res) => {
        setUserData(res.data);
      });
  }, []);

  return (
    <>
      <Container>
        <Nav>
          <GoBack onClick={back}>뒤로 가기</GoBack>
        </Nav>
        <ListContainer>
          <TitleBox>
            <ThumbnailTitle>Thumbnail</ThumbnailTitle>
            <NameTitle>Name</NameTitle>
            <GenderTitle>Gender</GenderTitle>
            <AccountNameTitle>Account Name</AccountNameTitle>
            <HeightTitle>Height</HeightTitle>
            <WeightTitle>Weight</WeightTitle>
            <KeywordTitle>Keyword</KeywordTitle>
            <CampaignNameTitle>Campaign Name</CampaignNameTitle>
          </TitleBox>
          {userData.map(({ name, thumbnail, gender, accountName, height, weight, keyword, campaignName }) => {
            return (
              <UserList
                name={name}
                thumbnail={thumbnail}
                gender={gender}
                accountName={accountName}
                height={height}
                weight={weight}
                keyword={keyword}
                campaignName={campaignName}
              />
            );
          })}
        </ListContainer>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: sans-serif;
`;

const Nav = styled.div`
  width: 1500px;
  height: 100px;
`;

const GoBack = styled.button`
  width: 125px;
  height: 50px;
  background-color: lightgray;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid gray;
  font-size: 16px;
  cursor: pointer;
  :hover {
    background-color: gray;
    border: 1px solid darkgrey;
  }
`;

const ListContainer = styled.div`
  width: 1500px;
  height: 750px;
  border-radius: 5px;
  overflow: auto;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: lightgray;
  border-radius: 10px;
  position: sticky;
  top: 0;
`;

const Title = styled.div`
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-right: 1px solid gray;
`;

const ThumbnailTitle = styled(Title)`
  width: 20%;
`;

const NameTitle = styled(Title)`
  width: 10%;
`;

const GenderTitle = styled(Title)`
  width: 5%;
`;

const AccountNameTitle = styled(Title)`
  width: 15%;
`;

const HeightTitle = styled(Title)`
  width: 5%;
`;

const WeightTitle = styled(Title)`
  width: 5%;
`;

const KeywordTitle = styled(Title)`
  width: 15%;
`;

const CampaignNameTitle = styled(Title)`
  width: 25%;
  border-right: none;
`;
