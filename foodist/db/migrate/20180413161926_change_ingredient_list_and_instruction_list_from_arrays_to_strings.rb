class ChangeIngredientListAndInstructionListFromArraysToStrings < ActiveRecord::Migration[5.1]
  def change
    change_column :recipes, :ingredient_list, :string
    change_column :recipes, :instruction_list, :string
  end
end
