class AddVoteUpAndVoteDownColumnsToVotesTable < ActiveRecord::Migration[5.1]
  def change
    add_column :votes, :up, :boolean
    add_column :votes, :down, :boolean
  end
end
