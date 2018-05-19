import * as React from "react";
import {chain} from "lodash";

import styled from "styled-components";

const fs = require('fs');

type BookEntry = {
    path: string;
    title: string;
}

type State = {
    books: BookEntry[]
}

type Props = {
    dir: string
}
export default class BookList extends React.Component<Props, any> {
    state : State = {
        books: []
    };

    constructor(props: Props) {
        super(props);
        fs.readdir(this.props.dir, (err: any, files: any) => {
            const books: BookEntry[] = chain(files)
                .filter((file: string) => file.split(".").pop() == "epub")
                .map((file: string) => ({
                    path: "../" + file,
                    title: file.split(".")[0]
                }))
                .value();

            this.setState({ books})
        });

    }


    render() {
        const { books } = this.state;
        const bookList = books.map((book: BookEntry) =>
            <Book key={book.path}>{book.title}</Book>
        );
        return (
            <div>
                {bookList}
            </div>
        );
    }
}

const Book = styled.div`
    color: black;
    width: 30em;
    /* height: 100%; */
    position: relative;
    background: #c2c2eb;
    border: solid;
    border-radius: 5px;
    padding: 5px;

    &:hover {
        background: #c2cfff;
    }
`;
