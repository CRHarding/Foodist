class AddingTitleToComments < ActiveRecord::Migration[5.1]
  def change
    add_column :comments, :title, :string
  end
end
