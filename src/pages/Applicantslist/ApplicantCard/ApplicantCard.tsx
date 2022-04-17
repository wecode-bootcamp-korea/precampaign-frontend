import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import ApplicantPics from '../RateModal/ApplicantPics/ApplicantPics';
import StarRating from '../RateModal/StarRating/StarRating';
import { ApplicantProps } from '../../types';
import { useRecoilValue, useSetRecoilState } from 'recoil';
// import { useRecoilValue, useSetRecoilState } from 'recoil';
// import { applicantInfoState } from '../../Recoil/Atoms/atomCampaign';

export default function ApplicantCard({
  id,
  name,
  gender,
  height,
  weight,
  platform,
  thumbnail,
  accountName,
  keyword,
  rate,
  campaignApplicantId,
  campaignParam,
  BASE_URL,
}: ApplicantProps) {
  const [modal, setModal] = useState(false);
  const [applicantData, setApplicantData] = useState([]);
  // const;

  // const setApplicantInfoState = useSetRecoilState(applicantInfoState);

  const toggleModal = () => {
    setModal(!modal);
    fetch(`${BASE_URL}/rate/${campaignParam}?applicant-id=${id}`)
      .then((res) => res.json())
      .then((res) => {
        setApplicantData(res.image);
      });
  };

  useEffect(() => {
    fetch('/data/data.json')
      .then((res) => res.json())
      .then((res) => {
        setApplicantData(res.Data);
      });
  }, []);

  //   const sendRate = () => {
  //     fetch('', {
  //       method: 'POST',
  //       body: JSON.stringify({}),
  //     }).then((res) => res.json);
  //   };

  //TODO: campaignApplicantId 보내주기

  return (
    <>
      <Container>
        <Thumbnail>
          <img src={thumbnail} width="140px" />
        </Thumbnail>
        <Name>{name}</Name>
        <Gender>{gender}</Gender>
        <Platform>{platform}</Platform>
        <AccountName>{accountName}</AccountName>
        <Height>{height}</Height>
        <Weight>{weight}</Weight>
        <Keyword>{keyword}</Keyword>
        <Rate>{rate}</Rate>
        <RateModal>
          <ModalOpen onClick={toggleModal}>사진확인</ModalOpen>
          {modal && (
            <ModalWindow>
              <Overlay onClick={toggleModal}></Overlay>
              <ModalContent>
                <ListContainer>
                  <UserInfoBox>
                    <UserInfo>
                      <UserNameBox>Name</UserNameBox>
                      <UserName>{name}</UserName>
                      <UserGenderBox>Gender</UserGenderBox>
                      <UserGender>{gender}</UserGender>
                      <UserHeightBox>Height</UserHeightBox>
                      <UserHeight>{height}</UserHeight>
                      <UserWeightBox>Weight</UserWeightBox>
                      <UserWeight>{weight}</UserWeight>
                      <UserKeywordBox>Keyword</UserKeywordBox>
                      <UserKeyword>{keyword}</UserKeyword>
                    </UserInfo>
                  </UserInfoBox>
                  {applicantData.map((e) => {
                    return <ApplicantPics thumbnail={e} />;
                  })}
                </ListContainer>
                <ModalClose onClick={toggleModal}>닫기</ModalClose>
                <EvaluationStandard>
                  <BackgroundBox>
                    <Background>배경</Background>
                    <StarRate>
                      <StarRating />
                    </StarRate>
                  </BackgroundBox>
                  <TrendBox>
                    <Trend>트렌드</Trend>
                    <StarRate>
                      <StarRating />
                    </StarRate>
                  </TrendBox>
                  <CreativeBox>
                    <Creative>독창성</Creative>
                    <StarRate>
                      <StarRating />
                    </StarRate>
                  </CreativeBox>
                </EvaluationStandard>
                <EvaluationBtn>평가 완료</EvaluationBtn>
              </ModalContent>
            </ModalWindow>
          )}
        </RateModal>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 150px;
  display: flex;
  justify-content: space-around;
  border: 1px solid lightgray;
  border-radius: 10px;
  margin: 5px 0;
`;

const UserCard = styled.div`
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  border-right: 1px solid lightgray;
`;

const Thumbnail = styled(UserCard)`
  width: 18%;
`;
const Name = styled(UserCard)`
  width: 10%;
`;
const Gender = styled(UserCard)`
  width: 8%;
`;
const AccountName = styled(UserCard)`
  width: 12%;
`;
const Platform = styled(UserCard)`
  width: 8%;
`;
const Height = styled(UserCard)`
  width: 6%;
`;
const Weight = styled(UserCard)`
  width: 6%;
`;
const Keyword = styled(UserCard)`
  width: 12%;
`;
const Rate = styled(UserCard)`
  width: 8%;
`;
const RateModal = styled(UserCard)`
  width: 12%;
  border-right: none;
`;

///////////////

const ModalOpen = styled.button`
  padding: 10px 20px;
  display: block;
  background-color: lightgray;
  font-size: 18px;
  border: 1px solid gray;
  border-radius: 10px;
  cursor: pointer;
  :hover {
    background-color: gray;
    border: 1px solid darkgray;
  }
`;

const ModalClose = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 9px 12px;
  cursor: pointer;
  border-radius: 10px;
  background-color: lightgray;
  border: 1px solid gray;
  font-size: 16px;
  :hover {
    background-color: gray;
    border: 1px solid darkgray;
  }
`;

const ModalWindow = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  overflow-y: hidden;
`;

const Overlay = styled(ModalWindow)`
  background: rgba(49, 49, 49, 0.8);
`;

const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: 1.4;
  background: #f1f1f1;
  padding: 14px 28px;
  border-radius: 10px;
  width: 90%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserInfoBox = styled.div`
  margin-top: 30px;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserInfo = styled.div`
  width: 100%;
  height: 75px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserBox = styled.div`
  width: 800px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  border: 2px solid black;
  border-radius: 10px;
  margin-left: 20px;
`;

const UserNameBox = styled(UserBox)``;
const UserGenderBox = styled(UserBox)``;
const UserHeightBox = styled(UserBox)``;
const UserWeightBox = styled(UserBox)``;
const UserKeywordBox = styled(UserBox)``;

const User = styled.div`
  width: 100%;
  font-size: 18px;
  display: flex;
  padding-left: 20px;
  align-items: center;
`;

const UserName = styled(User)``;
const UserGender = styled(User)``;
const UserHeight = styled(User)``;
const UserWeight = styled(User)``;
const UserKeyword = styled(User)``;

const ListContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
`;

const EvaluationStandard = styled.div`
  position: absolute;
  bottom: 100px;
  right: 75px;
  width: 300px;
  height: 150px;
  border: 1px solid black;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Evaluation = styled.div`
  width: 80px;
  height: 40px;
  display: flex;
  align-items: center;
`;

const Background = styled(Evaluation)``;
const Trend = styled(Evaluation)``;
const Creative = styled(Evaluation)``;

const EvaluationBox = styled.div`
  width: 275px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid gray;
  padding-left: 25px;
`;

const BackgroundBox = styled(EvaluationBox)``;
const TrendBox = styled(EvaluationBox)``;
const CreativeBox = styled(EvaluationBox)`
  border-bottom: none;
`;

const EvaluationBtn = styled.button`
  position: absolute;
  bottom: 30px;
  right: 75px;
  width: 150px;
  height: 50px;
  background-color: lightgray;
  font-size: 18px;
  border: 1px solid gray;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  :hover {
    background-color: gray;
    border: 1px solid darkgray;
  }
`;

const StarRate = styled.div`
  width: 210px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
