import React from 'react';
import VisibleCommentList from './VisibleCommentList';
import VisibleRecipeList from './VisibleRecipeList';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import SearchBar from './SearchBar';
import '../index.css';
import Header from './Header';
import Footer from './Footer';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <VisibleCommentList comments={this.props.comments} />
        <VisibleRecipeList
          recipes={this.props.recipes}
          onFavoriteSelect={selectedRecipe =>
            this.props.actions.favoriteRecipe({ selectedRecipe })
          }
          onFavoriteDeselect={selectedRecipe =>
            this.props.actions.unfavoriteRecipe({ selectedRecipe })
          }
          isAuthenticated={this.props.authenticated}
        />
        <Footer />
      </div>
    );
  }
}


export default App;
