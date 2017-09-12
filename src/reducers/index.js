export default (state = [], action) => {
  switch (action.type) {
    case 'GET_CATEGORIES':
      return action.categories;
    case 'GET_ALL_POSTS':
      return Object.assign({}, state, action.posts);
    case 'GET_POSTS_BY_CATEGORY':
      return Object.assign({}, state, { finalPosts: action.categoryPosts });
    default:
      return state;
  }
};