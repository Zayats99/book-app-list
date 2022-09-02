import { FC, useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config";
import { useApi } from "../../service/hooks/useApi";

import classes from "./Dashboard.module.css";

export type resultProps = {
	email: string;
	gender: string;
};

export interface IBook {
	id: string;
	title: string;
	author: string;
	category: string;
	isbm: string;
}
export const Dashboard: FC = () => {
	const navigate = useNavigate();

	const [books, setBooks] = useState<IBook[] | []>([]);
	// const [book, setBook] = useState(null);
	const { getData, deleteData } = useApi(BASE_URL);

	useEffect(() => {
		getData().then((res) => setBooks(res));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleOpenUpdatePage = (id: number | string) => {
		navigate(`edit-book/${id}`);
	};

	const handleDeleteBook = (id: string | number) => {
		deleteData(id).then(() => setBooks(books.filter((item) => item.id !== id)));
	};

	return (
		<Container>
			<Row>
				<Col>
					<Table striped bordered hover variant="dark" className="mt-5">
						<thead>
							<tr>
								<th>#</th>
								<th>Book title</th>
								<th>Author name</th>
								<th>Category</th>
								<th>ISBN</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{books.length > 0
								? books.map((item, i) => (
										<tr key={item.id}>
											<td>{i + 1}</td>
											<td>{item.title}</td>
											<td>{item.author}</td>
											<td>{item.category}</td>
											<td>{item.isbm}</td>
											<td className={`${classes.actionColumn} p-auto`}>
												<Button
													variant="outline-warning mx-3"
													onClick={() => handleOpenUpdatePage(item.id)}
												>
													update
												</Button>
												<Button
													variant="outline-danger"
													onClick={() => handleDeleteBook(item.id)}
												>
													delete
												</Button>
											</td>
										</tr>
								  ))
								: null}
						</tbody>
					</Table>
				</Col>
			</Row>
		</Container>
	);
};
