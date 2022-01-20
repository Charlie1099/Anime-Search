import { gql } from '@apollo/client';

export const GET_ME = gql`
    {
        me {
            _id
            username
            email
            showCount
            savedShows {
                showId
                title
                address
                image
            }
        }
    }
`;

// export const SHOWS = gql`
//     query ($id: Int, $page: Int, $perPage: Int, $search: String) {
//       Page (page: $page, perPage: $perPage) {
//         pageInfo {
//           total
//           currentPage
//           lastPage
//           hasNextPage
//           perPage
//         }
//         media (id: $id, search: $search) {
//           id
//           title {
//             romaji
//           }
//         }
//       }
//     }
//     `;