import {Modal} from "antd";
import DaumPostCode from "react-daum-postcode";
import styled from "styled-components";
import {useRecoilState} from "recoil";
import {
    addressState,
    zoneCodesState,
    contentsState,
    isModalVisible,
    IAddressTypes, nameState,
} from "../recoil/states";
import swal from "sweetalert"

const Button = (): JSX.Element => {
    const [modalVisible, setModalVisible] = useRecoilState<boolean>(isModalVisible);
    const [name, setName] = useRecoilState<string>(nameState);
    const [address, setAddress] = useRecoilState<string>(addressState);
    const [zoneCode, setZonecode] = useRecoilState<string>(zoneCodesState);
    const [contents, setContents] =
        useRecoilState<IAddressTypes[]>(contentsState);
    const defaultEndPoint="http://localhost:3000/api/contents"

    const showModal = () => {
        if(name.trim().length == 0){
            return swal("이름을 입력해주세요.");
        }
        setModalVisible(true);
    };

    const handleOk = ():void => {
        setModalVisible(true);
    };

    const handleCancel = ():void => {
        setModalVisible(false);
    };

    const onCompleteDaumPostCode = async (addr : any ) => {
        setAddress(addr.address);
        setZonecode(addr.zonecode);
        setModalVisible(false);
        setName("");
        const nextId =
            contents.length > 0 ? contents[contents.length - 1].id + 1 : 0;
        const content: IAddressTypes = {
            id: nextId,
            name: name,
            zonecode: addr.zonecode,
            address: addr.address,
        };
        await fetch(defaultEndPoint, {
            method: 'POST',
            body: JSON.stringify({content}),
            headers: {
                'Content-type': 'application/json'
            }
        })

        setContents([...contents, content]);
    };

    return (
        <>
            <ButtonWrapper>
                <But onClick={showModal}>주소 검색</But>
            </ButtonWrapper>
            {modalVisible && (
                <Modal
                    title="주소 검색하기"
                    visible={true}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <DaumPostCode onComplete={onCompleteDaumPostCode}/>
                </Modal>

            )}

        </>
    );
};
export default Button;
const ButtonWrapper = styled.div`

  position: absolute;
  width: 40%;
  padding: 0 16px;
  right: 0;
  bottom: 2px;
`;
const But = styled.button`
  width: 100%;
  height: 56px;
  background-color: #fe2bb2;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  border-radius: 40px;
  border: #FF2C75;
  cursor: pointer;

  :hover {
    background: #c50070;
  }
`;
