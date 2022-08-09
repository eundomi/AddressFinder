import styled from "styled-components"
import {useRecoilState} from "recoil";
import {nameState} from "../recoil/states";

const Name = (): JSX.Element=> {
    const [name,setName]=useRecoilState<string>(nameState);
    return (
        <InputWrapper>
            <Input value={name}
                   onChange={e => setName(e.target.value)}/>
        </InputWrapper>

    );
};
export default Name;

const InputWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #FDE6F0;
  border-radius: 40px;
  border: 2px solid #FECBE0;
  padding-left: 20px;
`;
const Input = styled.input.attrs({placeholder:"등록자의 이름을 입력해주세요."})`
  width: 60%;
  height: 54px;
  background-color: #FDE6F0;
  font-size: 14px;
  font-weight: 700;
  border: 0;
  cursor: text;
  overflow: scroll;
`;