import Head from "next/head";
import styled from "styled-components";
import List from "../components/List";
import {useRecoilState} from "recoil";
import {contentsState, IAddressTypes} from "../recoil/states";
import {useEffect} from "react";
import {GetServerSideProps} from "next";

const defaultEndPoint="http://localhost:3000/api/contents"

export const getServerSideProps:GetServerSideProps = async()=>{
  const res=await fetch(defaultEndPoint);
  const data=await res.json();
  return{
    props: {
      data
    }
  }
}

const Home = ({data}:any) => {
  const [contents, setContents] = useRecoilState<IAddressTypes[]>(contentsState);
  useEffect(()=>{
    setContents(data)
  },[])
  return (
    <>
      <Head>
        <title>주소 등록 및 삭제</title>
      </Head>
      <HomeWrapper>
        <HomeText>등록된 주소 목록</HomeText>
        <List></List>
      </HomeWrapper>
    </>
  );
};

export default Home;

const HomeWrapper = styled.div`
  padding: 16px;
`;
const HomeText = styled.h3`
  font-size: 14px;
  font-weight: 400;
  padding: 8px 0;
  color: #72757e;
`;
