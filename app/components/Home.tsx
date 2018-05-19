import * as React from "react";
import {Link} from "react-router-dom";
import {Collection} from "../backend";
import {BookEntry} from "../containers/HomePage";
import styled from "styled-components";


type Props = {
    collections: Collection[],
    books: BookEntry[]
}

export default class Home extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }


    selectCollection = (e: any) => {
        console.log(e);
    };

    renderCollection = (collection: Collection) => {
        return <Link to={`/readerView/${collection.id}`} key={collection.id} onClick={this.selectCollection}>
            {collection.title}
        </Link>
    };


  render() {
    const {collections} = this.props;

    return (
        <ContainerDiv>
          <CenterDiv>
              <Title>rePUB</Title>
              <h2>Your collections</h2>
              <CollectionsList>
                  {collections.map(this.renderCollection)}
              </CollectionsList>

          </CenterDiv>
        </ContainerDiv>
    );
  }
}

const ContainerDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const CenterDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;


const Title = styled.h1`
    font-size: 7em;
`;


const CollectionsList = styled.div`
    margin-left: 1em;
    display: flex;
    flex-direction: column;
`;
