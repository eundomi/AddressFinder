import {useCallback, useState, useEffect} from "react";
import styled from "styled-components";
import {useRecoilState} from "recoil";
import {
  contentsState,
  IAddressTypes,
} from "../recoil/states";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";

export default function List(): JSX.Element {
  const [winReady, setwinReady] = useState<boolean>(false);
  const [contents, setContents] = useRecoilState<IAddressTypes[]>(contentsState);
  const defaultEndPoint = "http://localhost:3000/api/contents"

  useEffect(() => {
    setwinReady(true);
  }, []);

  function handleOnDragEnd(result: any) {
    if (!result.destination) return;
    const items = Array.from(contents);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setContents(items);
  }
  const fetchContents=async ()=>{
    const response = await fetch(defaultEndPoint)
    const data = await response.json()
    setContents(data)
  }
  const ListItem = ({id, name, zonecode, address}: IAddressTypes) => {
    const [editMode, setEditMode] = useState(false);
    const [newName, setNewName] = useState(name);

    const changeToEditMode = () => {
      setEditMode(false);
    };

    const deleteContent = async (contentId:Number) => {
      const response = await fetch(`http://localhost:3000/api/contents/${contentId}`, {
        method: 'DELETE',
      })
      const data = await response.json();
      fetchContents();
    }

    const editContent = (): void => {
      setEditMode(!editMode);
    }

    const completeContent = (): void => {
      changeToEditMode();

      const newContents = [...contents];
      const newContent: IAddressTypes = {
        id: id,
        name: newName,
        zonecode: zonecode,
        address: address,
      };

      for (let i = 0; i < newContents.length; i++) {
        if (newContents[i].id === id) {
          newContents[i] = newContent;
          break;
        }
      }
      setContents(newContents);
    };

    return (
      <>
        <Item>
          {editMode ? (<><BoxInput placeholder="이름" value={newName}
                                   onChange={(e) => setNewName(e.target.value)}/><Box>{zonecode}<br/>{address}
            </Box></>) :
            (<>
              <Text>{name}</Text><Address>
              <Text>{zonecode}<br/>{address}</Text>
            </Address>
            </>)}

        </Item>
        <Img>
          {editMode ? (<Edit
            src="/Check.svg"
            onClick={completeContent}
          />) : (<Edit
            src="/Edit.svg"
            onClick={editContent}
          />)}
          <Delete
            src="/Delete.svg"
            onClick={() => deleteContent(id)}
          />
        </Img>
      </>
    );
  };


  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      {winReady && (
        <Droppable droppableId="contents">
          {(provided) => (
            <div
              className="List"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {contents.map(({id, name, zonecode, address}: IAddressTypes, index) => {

                return (
                  <Draggable key={id} draggableId={String(id)} index={index}>
                    {(provided) => (
                      <ListWrapper
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <ListItem key={index}
                                  id={id}
                                  name={name}
                                  address={address}
                                  zonecode={zonecode}
                        ></ListItem>

                      </ListWrapper>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      )}
    </DragDropContext>
  );
}
const ListWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-height: 120px;
  border-radius: 8px;
  background-color: #fdfdfd;
  border: none;
  padding: 16px;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 16px;
  overflow: visible;
`;
const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const Edit = styled.img`
  width: 24px;

  :hover {
    cursor: pointer;
  }
`;
const Delete = styled.img`
  width: 24px;

  :hover {
    cursor: pointer;
  }
`;
const Img = styled.div`
  display: flex;
  width: 55px;
  justify-content: space-between;`
const Address = styled.div``
const Text = styled.span`
  color: #72757e;
  font-weight: 400;
  font-size: 14px;
  overflow: visible;
  height: auto;`
const BoxInput = styled.input`
  color: #72757e;
  font-weight: 400;
  font-size: 14px;
  overflow: visible;
  height: auto;
  padding: 0 5px`
const Box = styled.div`
  display: flex;
  width: 100%;
  border: solid black 1px;
  color: #72757e;
  font-weight: 400;
  font-size: 14px;
  overflow: visible;
  height: auto;
  padding: 0 5px`