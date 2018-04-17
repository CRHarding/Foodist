class ChangingIngredientListAndInstructionListToArrays < ActiveRecord::Migration[5.1]
  def change
    change_table :recipes do |t|
      t.change :ingredient_list, "varchar[] USING (string_to_array(ingredient_list, ','))"
      t.change :instruction_list, "varchar[] USING (string_to_array(instruction_list, ','))"
    end
  end
end
