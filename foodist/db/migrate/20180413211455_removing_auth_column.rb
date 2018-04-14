class RemovingAuthColumn < ActiveRecord::Migration[5.1]
  def change
    remove_column :users, :auth
  end
end
