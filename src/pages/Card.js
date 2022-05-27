import React, {useContext} from 'react';
import {Link, useParams} from 'react-router-dom';
import {useOneCardsQuery} from '../http/useOneCardQuery';
import {useLinkByCardIdQuery} from '../http/useLinkQuery';
import {useTypeLinkQuery} from '../http/useTypeLinkQuery';
import {Context} from '../App';
import {CreateLinkModal} from '../components/Link/CreateLinkModal';
import {Typography} from 'antd';
import {Container} from '../HOC/Container';
import styled from 'styled-components';
import {theme} from '../utils/uiConst';
import {getRangeDate, getYear} from '../utils/timeUtils';
import {useRemoveQuery} from '../http/useRemoveQuery';
import {linkRemoveAPI} from '../http/userAPI';

const {Title, Text} = Typography;

export const Card = () => {
  const {id} = useParams();
  const {roleType} = useContext(Context);
  const {data: cardData} = useOneCardsQuery(id);
  const {data: links} = useLinkByCardIdQuery(id);
  const {data: typesLink} = useTypeLinkQuery();
  const {mutate: removeMutate} = useRemoveQuery(['link', id], linkRemoveAPI);

  const LinkItem = (id, url, type) => {
    return <StyledBoxLink
      key={id}
    >
      {roleType.creator && <StyledClose onClick={()=>removeMutate(id)}>x</StyledClose>}

      <StyledLink
        href={url}
        target={'_blank'}
      >
        <StyledTitle
          level={4}
          style={{background: cardData?.color, color: theme.default.white}}
        >
          {type}
        </StyledTitle>
      </StyledLink>
    </StyledBoxLink>;
  };

  return (
    <Container>
      <Title level={2} style={{margin: '5px auto', color: theme.default.greyAverage, textAlign: 'center'}}>{cardData?.category}</Title>
      {/* <Title level={5} style={{margin: '5px auto', color: theme.default.greyAverage}}>{cardData?.title}</Title>*/}
      <Title level={5} style={{margin: '10px auto'}}>
        {cardData?.city}, {getRangeDate(cardData?.dateStart, cardData?.dateEnd)} {getYear(cardData?.dateStart)}
      </Title>
      <StyledListContainer>
        {links?.map(({id, url, typeLink, color}) => LinkItem(id, url, typeLink, color))}
      </StyledListContainer>

      {roleType.creator && <CreateLinkModal typesLink={typesLink} id={id}/>}

      <Link to={'/'}>
        <Text style={{color: theme.default.greyBlue}}>
                    Вернуться к списку общений
        </Text>
      </Link>
      <Text style={{color: theme.default.greyLight, textAlign: 'center', marginTop: 20, fontSize: 10}}>
                Размещение данных материалов на других ресурсах запрещено
      </Text>

    </Container>
  );
};

const StyledBoxLink = styled.div`
  position: relative;
  z-index: 10;

  &:hover{
    opacity: 90%;
  }

  &:hover span{
    display: flex;
  }
`;

const StyledListContainer = styled.div`
  width: 100%;
  margin: 15px auto 10px;
`;

const StyledLink = styled.a`
    width: 100%;
`;

const StyledTitle = styled(Title)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: ${theme.default.white};
  height: 50px;
  margin: 0;
  border-radius: 15px;
`;

const StyledClose = styled.span`
  position: absolute;
  display: none;
  justify-content: center;
  align-items: center;
  right: 0;
  top: 0;
  width: 46px;
  height: 46px;
  padding: 8px;
  font-size: 17px;
  transition: .1s;
  cursor: pointer;
  z-index: 20;
  color: ${theme.default.white};
`;
