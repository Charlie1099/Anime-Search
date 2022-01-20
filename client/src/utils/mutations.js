import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login(
    $email: String!
    $password: String!
  ) {
    login(
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const SAVE_SHOW = gql`
  mutation saveShow($newShow: InputShow!) {
    saveShow(newShow: $newShow) {
      _id
      username
      email
      savedShows {
        showId
        title
        address
        image
      }
    }
  }
`;

export const REMOVE_SHOW = gql`
mutation removeShow($showId: ID!) {
  removeShow(showId: $showId) {
    _id
    username
    email
    savedShows {
      showId
      title
      address
      image
    }
  }
}
`;
