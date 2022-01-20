import React from "react";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from "react-bootstrap";
import Auth from "../utils/auth";
import { removeShowId } from "../utils/localStorage";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { REMOVE_SHOW } from "../utils/mutations";

const SavedShows = () => {
  const { loading, data } = useQuery(GET_ME);
  const [removeShow, { error }] = useMutation(REMOVE_SHOW);
  const userData = data?.me || {};

  // create function that accepts the show's mongo _id value as param and deletes the show from the database
  const handleDeleteShow = async (showId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeShow({
        variables: { showId },
      });

      removeShowId(showId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Viewing saved shows!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedShows.length
            ? `Viewing ${userData.savedShows.length} saved ${
                userData.savedShows.length === 1 ? 'show' : 'shows'
              }:`
            : "You have no saved shows!"}
        </h2>
        <CardColumns>
          {userData.savedShows.map((show) => {
            return (
              <Card key={show.showId} border="dark">
                {show.image ? (
                  <Card.Img
                    src={show.image}
                    alt={`The cover for ${show.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{show.title}</Card.Title>
                  <Card.Link>{show.address}</Card.Link>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteShow(show.showId)}
                  >
                    Delete this Show!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedShows;
