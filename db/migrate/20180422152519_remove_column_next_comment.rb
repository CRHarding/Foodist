class RemoveColumnNextComment < ActiveRecord::Migration[5.1]
  def change
    remove_column :comments, :next_comment
  end
end
