class AddingUserColumnsToRecipeAndCommentTables < ActiveRecord::Migration[5.1]
  def change
    add_column :recipes, :user_email, :string
    add_column :recipes, :user_name, :string
    add_column :comments, :poster_email, :string
    add_column :comments, :poster_name, :string
  end
end
