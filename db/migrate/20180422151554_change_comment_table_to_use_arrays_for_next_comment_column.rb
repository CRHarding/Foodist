class ChangeCommentTableToUseArraysForNextCommentColumn < ActiveRecord::Migration[5.1]
  def change
    add_column :comments, :next_comments, :integer, array: true, null: false, default: []
  end
end
