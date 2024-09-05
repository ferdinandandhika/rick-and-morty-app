import { gql } from '@apollo/client';

export const GET_CHARACTERS = gql`
  query GetCharacters {
    characters {
      results {
        id
        name
        status
        image
      }
    }
  }
`;

export const GET_CHARACTER_DETAIL = gql`
  query GetCharacterDetail($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      gender
      origin {
        name
      }
      location {
        name
      }
      image
    }
  }
`;
