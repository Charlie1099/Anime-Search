import React, { useEffect, useState } from "react";
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from "react-bootstrap";
import Auth from '../utils/auth';
import { saveShowIds, getSavedShowIds } from "../utils/localStorage"
import { useMutation } from '@apollo/client';
import { SAVE_SHOW } from "../utils/mutations"

const SearchShows = () => {
  const [searchedShows, setSearchedShows] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [savedShowIds, setSavedShowIds] = useState(getSavedShowIds());

  const [saveShow, { error }] = useMutation(SAVE_SHOW);

  useEffect(() => {
    return () => saveShowIds(savedShowIds)
  })

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    const options = {
      method: "GET",
      
      headers: {
        "x-rapidapi-host": "top-anime.p.rapidapi.com",
        "x-rapidapi-key": "985c5a5a52msh5e525b5f3d5f2adp1c9239jsn6cfdc252f604",
        useQueryString: true,
      },
      
      };
    fetch(`https://top-anime.p.rapidapi.com/anime/${searchInput}`, options)
    .then(data => data.json())
      .then(data => setSearchedShows(data))
    };

    const handleSaveShow = async (showId) => {
      const showToSave = searchedShows.find((show) => show.showId === showId);
      const token = Auth.loggedIn() ? Auth.getToken() : null;
      console.log(showId);

      if (!token) {
        return false;
      }

      try {
        const { data } = await saveShow({
          variables: { newShow: { ...showToSave } },
        });

        setSavedShowIds([...savedShowIds, showToSave.showId]);
      } catch (err) {
        console.error(err);
      }
    };

  return (
    <>
      <Jumbotron fluid className="text-light ">
        <Container>
          <h1>Search for Shows!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a show"
                />
              </Col>
              <Col xs={12} sm={12} md={4} className ="btn-div">
                <Button type="submit" size="lg">
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
      <h2>
        {searchedShows.length
          ? `Viewing ${searchedShows.length} results:`
          : 'Search for a show to begin'}
      </h2>
        <CardColumns>
          {searchedShows.length && searchedShows.map((show, i) => {
                return (
                  <Card key={i} border='dark'>
                    {show.image ? (
                      <Card.Img src={show.image} alt={`The cover for ${show.title}`} variant='top' />
                    ) : null}
                    <Card.Body>
                      <Card.Title>{show.title}</Card.Title>
                      <Card.Link>{show.address}</Card.Link>
                      {Auth.loggedIn() && (
                        <Button
                          disabled={savedShowIds?.some((savedShowId) => savedShowId === show.showId)}
                          className='btn-block btn-info'
                          onClick={() => handleSaveShow(show.showId)}>
                          {savedShowIds?.some((savedShowId) => savedShowId === show.showId)
                            ? 'This show has already been saved!'
                            : 'Save this Show!'}
                          </Button>
                      )}
                    </Card.Body>
                  </Card>
                );
              })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SearchShows;
