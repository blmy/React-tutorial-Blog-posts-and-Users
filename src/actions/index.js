import _ from "lodash";
import jsonPlaceholder from "../apis/jsonPlaceholder";

//redux-thunk's first argument is dispatch and second is getState.
export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  //when dispatch a function, redux-thunk will pick it up and invoke it.
  await dispatch(fetchPosts());

  //lodash's solution to getting the unique userId.
  //From multiple duplicate record to 1 single unique record.
  const userIds = _.uniq(_.map(getState().posts, "userId"));

  //Alternative to lodash solution.
  //If you do not want to include lodash libraries in your project
  //so as to reduce the bundle size.
  //const userIds = new Set(getState().posts.map(({ userId }) => userId));

  //With the single unique userid, we fetch only 1 single
  //user record instead of multiple repeated fetch on the
  //same user record.
  //Note* async await sntax does not work with forEach().
  userIds.forEach((id) => dispatch(fetchUser(id)));
};

export const fetchPosts = () => {
  return async (dispatch) => {
    const response = await jsonPlaceholder.get("/posts");

    dispatch({ type: "FETCH_POSTS", payload: response.data });
  };
};

export const fetchUser = (id) => async (dispatch) => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({ type: "FETCH_USER", payload: response.data });
};

//This solution to memoization is a ONE TIME fetch result.
//If there is a need to refetch the same user, we will not be
//able to do it again with this function.
//Example, updated user info and we need to refetch user.
// export const fetchUser = (id) => (dispatch) => {
//   _fetchUser(id, dispatch);
// };

// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);

//   dispatch({ type: "FETCH_USER", payload: response.data });
// });
