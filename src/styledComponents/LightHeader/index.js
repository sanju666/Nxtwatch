import styled from 'styled-components'

export const Heading = styled.nav`
  background-color: ${props => (props.item === true ? '#ffffff' : '#231f20')};
  padding: 0px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const Logoutbutton = styled.button`
  height: 43px;
  width: 93px;
  background-color: transparent;
  color: ${props => (props.item === true ? '#4f46e5' : '#f1f5f9')};
  border: 2px solid ${props => (props.item === true ? '#4f46e5' : '#f1f5f9')};
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
`
export const Menupara = styled.p`
  font-weight: 600;
  color: ${props => (props.item === true ? '#1e293b' : '#ffffff')};
  font-size: 19px;
`
export const MenuLeftSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 260px;
  min-height: 89vh;
  background-color: ${props => (props.item === true ? '#ffffff' : '#231f20')};
`

export const ContactHeading = styled.h1`
  color: ${props => (props.item === true ? '#00306e' : '#ffffff')};
`
export const ContactPara = styled.p`
  color: ${props => (props.item === true ? '#00306e' : '#ffffff')};
  font-size: 22px;
`
export const HomeContainer = styled.div`
  background-color: ${props => (props.item === true ? '#f9f9f9' : '#0f0f0f')};
`
export const CricVideoProfile = styled.h1`
  color: ${props => (props.item === true ? '#00306e' : '#ffffff')};
  font-size: 15px;
  margin-left: 8px;
  margin-top: 0px;
`
export const TrendHeader = styled.div`
  background-color: ${props => (props.item === true ? '#f1f1f1' : '#0f0f0f')};
`
export const IconHeader = styled.h1`
  color: ${props => (props.item === true ? '#0f0f0f' : '#f1f5f9')};
`
export const PlayerTitle = IconHeader

export const PlayerDescription = styled.p`
  color: ${props => (props.item === true ? '#0f0f0f' : '#f1f5f9')};
`
