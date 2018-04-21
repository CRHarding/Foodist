class AddCommentVotesTable < ActiveRecord::Migration[5.1]
  def change
    create_table :comment_votes do |t|
      t.integer :user_id
      t.integer :voter_id
      t.boolean :up
      t.boolean :down
      t.timestamps
    end
  end
end
