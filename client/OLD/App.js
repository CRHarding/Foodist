// import React from 'react';
// import { ConnectedRouter } from 'react-router-redux';
// import { Route, Redirect } from 'react-router-dom';
// import { history } from '../store/configureStore';
// import { connect } from 'react-redux';
//
// import CommentList from '../components/Comments/CommentList';
// import CommentSingle from '../components/Comments/CommentSingle';
// import CommentAddForm from '../components/Comments/CommentAddForm';
// import CommentEditForm from '../components/Comments/CommentEditForm';
// import RecipeList from '../components/Recipes/RecipeList';
// import RecipeSingle from '../components/Recipes/RecipeSingle';
// import RecipeAddForm from '../components/Recipes/RecipeAddForm';
// import RecipeEditForm from '../components/Recipes/RecipeEditForm';
//
// import Header from './Header';
// import Footer from './Footer';
// import Home from './Home';
// import Signup from './Signup';
// import Login from './Login';
// import Favorites from './Favorites';
//
// const PrivateRoute = ({ component: Component, authenticated, ...props }) => {
//   return (
//     <Route
//       {...props}
//       render={props =>
//         authenticated === true ? (
//           <Component {...props} />
//         ) : (
//           <Redirect
//             to={{ pathname: '/login', state: { from: props.location } }}
//           />
//         )
//       }
//     />
//   );
// };
//
// const PublicRoute = ({ component: Component, authenticated, ...props }) => {
//   return (
//     <Route
//       {...props}
//       render={props =>
//         authenticated === false ? <Component {...props} /> : <Redirect to="/" />
//       }
//     />
//   );
// };
//
// class App extends React.Component {
//   render() {
//     return (
//       <ConnectedRouter history={history}>
//         <div>
//           <Header />
//
//           <div className="container">
//             <Route exact path="/" component={Home} />
//             <PublicRoute
//               authenticated={this.props.authenticated}
//               path="/signup"
//               component={Signup}
//             />
//             <PublicRoute
//               authenticated={this.props.authenticated}
//               path="/login"
//               component={Login}
//             />
//             <PrivateRoute
//               authenticated={this.props.authenticated}
//               path="/favorites"
//               component={Favorites}
//             />
//             <PublicRoute
//               authenticated={this.props.authenticated}
//               exact
//               path="/comments"
//               component={CommentList}
//             />
//             <PrivateRoute
//               exact
//               path="/comments/:id"
//               component={CommentSingle}
//             />
//             <PrivateRoute
//               authenticated={this.props.authenticated}
//               path="/comments/new"
//               component={CommentAddForm}
//             />
//             <PrivateRoute
//               authenticated={this.props.authenticated}
//               path="/comments/:id/edit"
//               component={CommentEditForm}
//             />
//             <PublicRoute
//               authenticated={this.props.authenticated}
//               exact
//               path="/recipes"
//               component={RecipeList}
//             />
//             <PrivateRoute
//               authenticated={this.props.authenticated}
//               exact
//               path="/recipes/:id"
//               component={RecipeSingle}
//             />
//             <PrivateRoute
//               authenticated={this.props.authenticated}
//               path="/recipes/new"
//               component={RecipeAddForm}
//             />
//             <PrivateRoute
//               authenticated={this.props.authenticated}
//               path="/recipes/:id/edit"
//               component={RecipeEditForm}
//             />
//           </div>
//           <Footer />
//         </div>
//       </ConnectedRouter>
//     );
//   }
// }
//
// const mapStateToProps = state => {
//   return { authenticated: state.auth.authenticated };
// };
//
// export default connect(mapStateToProps)(App);
