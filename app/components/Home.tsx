import * as React from "react";
import {Link} from "react-router-dom";
import {Collection} from "../backend";


type Props = {
    collections: Collection[]
}

export default class Home extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }


    selectCollection = (e: any) => {
        console.log(e);
    };

    renderCollection = (collection: Collection) => {
        return <div key={collection.id} onClick={this.selectCollection}>
            {collection.title}
        </div>
    };


  render() {
    const {collections} = this.props;

    return (
      <div>
          <div>
          <h2>Home</h2>
          <Link to="/counter">to Counter</Link>
          <Link to="/readerView">to ReaderView</Link>
            {collections.map(this.renderCollection)}
        </div>
      </div>
    );
  }
}
