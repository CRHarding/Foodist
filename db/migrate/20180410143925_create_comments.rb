class CreateComments < ActiveRecord::Migration[5.1]
  def change
    create_table :comments do |t|
      t.integer :poster_id
      t.integer :recipe_id
      t.string :description
      t.integer :comment_votes
      t.integer :previous_comment
      t.integer :next_comment
      t.timestamps
    end
  end
end
