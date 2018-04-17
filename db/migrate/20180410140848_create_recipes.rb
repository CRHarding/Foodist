class CreateRecipes < ActiveRecord::Migration[5.1]
  def change
    create_table :recipes do |t|
      t.string :name
      t.string :ingredient_list
      t.string :instruction_list
      t.integer :user_id
      t.integer :votes
      t.timestamps
    end
  end
end
